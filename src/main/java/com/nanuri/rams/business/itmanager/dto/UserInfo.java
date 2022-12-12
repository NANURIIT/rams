package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfo {
    
    /* 사용자 추가를 위한 사원번호 목록 DTO */
    private String eno;                 /* 사원번호 */
    private String empNm;               /* 사원명 */
}
