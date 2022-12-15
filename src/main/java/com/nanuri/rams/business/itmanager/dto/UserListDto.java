package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto extends UserManageDTO{

    private String usrC;        /* 사용자구분 */
    private String pstn;        /* 직책 */
}
