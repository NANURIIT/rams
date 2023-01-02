package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RghtCd {
	
	AG11(1, "사업부부서원"),
	AG18(2, "사업부부서장"),
	AG21(3, "심사부심사역"),
	AG28(4, "심사부부서장"),
	AG31(5, "관리부담당자"),
	AG38(6, "관리부부서장"),
	AG39(7, "리스크본부 본부장"),
	AG41(8, "협의체간사"),
	AG48(9, "협의체위원"),
	AG49(10, "협의체위원장"),
	AG51(11, "리스크관리부 부서원"),
	AG58(12, "리스크관리부 부서장"),
	AG61(13, "WM사업부 부서원"),
	AG68(14, "WM사업부 부서장"),
	AG69(15, "WN사업부 본부장"),
	AG70(16, "감사부"),
	IT11(99, "IT관리자");
	
	int level;
	String text;
	
}
