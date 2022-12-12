package com.nanuri.rams.business.casemanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// 사원정보 DTO
public class EmpDto {

    private String eno;					//	사원번호
    private String empNm;				//	직원명
    private String dprtCd;				//	부점코드
    private String dprtNm;				//	부점명
    private String hdqtCd;				//	본부코드
    private String hdqtNm;				//	본부명
}
