import { Api, StatusCode, Strings, t } from '@vikadata/core';
import { Button, Message } from '@vikadata/components';
import { AddOutlined } from '@vikadata/icons';
import { Avatar, AvatarSize, AvatarType, SearchEmpty, SearchInput } from 'pc/components/common';
import { Modal } from 'pc/components/common/modal/modal/modal';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { RoleContext } from '../context';
import { IRoleItem } from '../interface';
import { expandEditRoleModal } from './edit_role_modal';
import { RoleItem } from './role_item';

import styles from './style.module.less';

export const addRole = (roleName: string, cb: () => void) => {
  if (!roleName) {
    return;
  }
  Api.createRole(roleName).then(res => {
    const { data } = res;
    if (!data.success) {
      Message.error({ content: data.message });
      return;
    }
    cb();
    Message.success({ content: t(Strings.add_role_success_message) });
  });
};

export const Left: React.FC<{
  roleList: IRoleItem[];
  refreshRoleList: () => void;
  activeRoleId?: string;
  setActiveRoleId: (roleId: string) => void;
}> = props => {
  const { roleList, refreshRoleList, activeRoleId, setActiveRoleId } = props;
  const { manageable, setActiveRoleName, refreshMemberList } = useContext(RoleContext);
  const [search, setSearch] = useState<string>('');

  const searchResultList = useMemo(() => {
    if (!search) {
      return [];
    }
    return roleList.filter(v => v.roleName.includes(search));
  }, [roleList, search]);

  useEffect(() => {
    const role = roleList.find(v => v.roleId === activeRoleId);
    if (!role) {
      // delete role trigger refresh role list
      setActiveRoleId(roleList[0]?.roleId);
      return;
    }
    setActiveRoleName && setActiveRoleName(role.roleName);
  }, [roleList, activeRoleId, setActiveRoleName, setActiveRoleId]);

  const editRole = (role: IRoleItem, roleName: string) => {
    const { roleId } = role;
    if (!roleName) {
      return;
    }
    Api.updateOrgRole(roleId, roleName).then(res => {
      const { data } = res;
      if (!data.success) {
        Message.error({ content: data.message });
        return;
      }
      refreshRoleList();
      Message.success({ content: t(Strings.rename_role_success_message) });
    });
  };

  const deleteRole = (role: IRoleItem) => {
    const { roleId } = role;
    Api.deleteOrgRole(roleId).then(res => {
      const { data } = res;
      // has member error code check
      if (!data.success && data.code === StatusCode.DELETE_ROLE_EXIST_MEMBER) {
        Modal.confirm({
          type: 'warning',
          title: t(Strings.delete_role_warning_title),
          content: t(Strings.delete_role_warning_content),
          onOk: () => activeRoleId && refreshMemberList && refreshMemberList(activeRoleId),
        });
        return;
      }
      if (!data.success) {
        Message.error({ content: data.message });
        return;
      }
      refreshRoleList();
      Message.success({ content: t(Strings.delete_role_success_message) });
    });
  };

  const roleNameArray = roleList.map(v => v.roleName);

  return (
    <div className={styles.leftWrap}>
      <SearchInput size='small' keyword={search} change={setSearch}/>
      {search ? (
        <RoleListSearchContent activeRoleId={activeRoleId} list={searchResultList} onClick={setActiveRoleId} />
      ) : (
        <>
          {manageable && (
            <Button
              className={styles.addButton}
              prefixIcon={<AddOutlined />}
              color="primary"
              size="small"
              block
              onClick={() => {
                expandEditRoleModal({
                  value: '',
                  title: t(Strings.add_role_title),
                  onChange: (roleName: string) => addRole(roleName, refreshRoleList),
                  existed: roleNameArray,
                });
              }}
            >
              {t(Strings.add_role_btn)}
            </Button>
          )}
          <div className={styles.leftList}>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              {roleList.map(roleItem => (
                <RoleItem
                  key={roleItem.roleId}
                  role={roleItem}
                  onEdit={editRole}
                  onDelete={deleteRole}
                  onClick={setActiveRoleId}
                  selected={activeRoleId === roleItem.roleId}
                  roleNameArray={roleNameArray}
                />
              ))}
            </Scrollbars>
          </div>
        </>
      )}
    </div>
  );
};

const RoleListSearchContent: React.FC<{
  list: IRoleItem[];
  activeRoleId?: string;
  onClick?: (roleId: string) => void;
}> = props => {
  const { activeRoleId, list, onClick } = props;
  if (list.length === 0) {
    return <SearchEmpty />;
  }
  return (
    <div className={styles.roleListSearchWrap}>
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        {list.map(role => (
          <RoleItem
            role={role}
            onClick={onClick}
            icon={<Avatar id={role.roleId} title={role.roleName} size={AvatarSize.Size32} type={AvatarType.Team} />}
            selected={activeRoleId === role.roleId}
          />
        ))}
      </Scrollbars>
    </div>
  );
};
