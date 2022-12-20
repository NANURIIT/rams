package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto extends RAA92BDTO{

    private String usrC;        /* 사용자구분 */
    private String pstn;        /* 직책 */
    private String rghtCdNm;    /* 권한명 */
}
