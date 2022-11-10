package com.vikadata.api.model.vo.datasheet;

import cn.hutool.json.JSONObject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Data Table Meta Result Value
 */
@ApiModel("Data Table Meta Result Value")
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class DatasheetMetaVo {

    @ApiModelProperty(value = "Field Map and View Map Data", position = 3)
    private JSONObject meta;
}
