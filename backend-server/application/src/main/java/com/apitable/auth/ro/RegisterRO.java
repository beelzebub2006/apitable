/*
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

<<<<<<<< HEAD:backend-server/application/src/main/java/com/apitable/widget/vo/WidgetStoreListExtraInfo.java
package com.apitable.widget.vo;
========
package com.apitable.auth.ro;
>>>>>>>> remote/develop:backend-server/application/src/main/java/com/apitable/auth/ro/RegisterRO.java

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
<<<<<<<< HEAD:backend-server/application/src/main/java/com/apitable/widget/vo/WidgetStoreListExtraInfo.java
 * <p>
 * Widget Store List Extended Information View
 * </p>
 */
@Data
@ApiModel("Widget Store List Extended Information View")
public class WidgetStoreListExtraInfo {

    @ApiModelProperty(value = "Widget official website address", position = 1)
    private String website;
========
 * Login Request Parameters.
 *
 * @author Chambers
 */
@Data
@Schema(description = "Authorization Sign Up Request Parameters")
public class RegisterRO {

    @Schema(description = "Username(email/telephone...)",
        example = "xxxx@apitable.com", required = true)
    private String username;
>>>>>>>> remote/develop:backend-server/application/src/main/java/com/apitable/auth/ro/RegisterRO.java

    @Schema(description = "Credential(password/verify code...)",
        example = "qwer1234 || 261527", required = true)
    private String credential;
}
