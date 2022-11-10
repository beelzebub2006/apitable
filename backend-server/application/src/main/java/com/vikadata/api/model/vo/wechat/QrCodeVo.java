package com.vikadata.api.model.vo.wechat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vikadata.api.support.serializer.NullStringSerializer;
import com.vikadata.api.support.serializer.QrcodePreSerializer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>
 * Official account QR code vo
 * </p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@ApiModel("Official account QR code vo")
public class QrCodeVo {

    @ApiModelProperty(value = "Unique identification", example = "fa23r2thu", position = 1)
    @JsonSerialize(nullsUsing = NullStringSerializer.class)
    private String mark;

    @ApiModelProperty(value = "QR Code Picture", example = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQH47joAAA", position = 2)
    @JsonSerialize(using = QrcodePreSerializer.class)
    private String image;

    @ApiModelProperty(value = "The address of the QR code image after parsing, and the QR code image can be generated by yourself", example = "http://weixin.qq.com/q/kZgfwMTm72WWPkovabbI", position = 3)
    private String url;
}
