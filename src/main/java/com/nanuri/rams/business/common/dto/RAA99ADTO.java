package com.nanuri.rams.business.common.dto;

import com.nanuri.rams.com.code.RghtCd;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RAA99ADTO {
	private String eno;							// 사원번호
	private String empNm;						// 직원명
	private String dprtCd;						// 부점코드
	private String dprtNm;						// 부점명
	private String hdqtCd;						// 본부코드
	private String hdqtNm;						// 본부명
	private String pstn;						// 직책
	private String pwd;							// 비밀번호
	/* 계정 잠금 여부 */
	private Boolean isLocked = false;
	/* 권한코드 */
	private RghtCd rghtCd;
}
