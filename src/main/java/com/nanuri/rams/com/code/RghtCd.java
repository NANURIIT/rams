package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RghtCd {
	
	AG11(1, "사업부담당자"),
	AG18(2, "사업부부서장"),
	AG21(3, "심사부담당자"),
	AG28(4, "심사부부서장"),
	AG31(5, "관리부담당자"),
	AG38(6, "관리부부서장"),
	AG49(7, "본부장"),
	AG51(8, "협의체간사"),
	AG58(9, "협의체위원"),
	AG59(10, "협의체위원장"),
	IT11(11, "IT관리자");
	
	int level;
	String text;
	
}
