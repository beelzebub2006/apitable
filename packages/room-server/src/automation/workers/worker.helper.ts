/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

<<<<<<<< HEAD:packages/room-server/src/unit/services/unit.tag.service.ts
import { Injectable } from '@nestjs/common';
import { UnitTagRepository } from '../repositories/unit.tag.repository';
========
import { EventRealTypeEnums, EventSourceTypeEnums, IEventInstance, IEventListenerOptions, IOPEvent } from '@apitable/core';
>>>>>>>> remote/develop:packages/room-server/src/automation/events/helpers/listener.helper.ts

/**
 * whether the robot event should to handle
 * @param event         robot trigger event
 * @param beforeApply
 * @param options
 */
export function isHandleEvent(event: IEventInstance<IOPEvent>, beforeApply: boolean, options: IEventListenerOptions): boolean {
  if (options?.realType !== EventRealTypeEnums.ALL && options?.realType !== event.realType) {
    return false;
  }
  if (options?.sourceType !== EventSourceTypeEnums.ALL && options?.sourceType !== event.sourceType) {
    return false;
  }
  return Boolean(options.beforeApply) === beforeApply;
}

export enum EventTypeEnums {
  FormSubmitted = 'form_submitted',
  RecordCreated = 'record_created',
  RecordMatchesConditions = 'record_matches_conditions',
}
