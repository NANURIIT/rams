package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberLevelCode {
	
	/** 운영자 */
	ADMIN(1, "운영자"),
	/** 경영관리 */
	ASSISTANT(2, "경영관리"), 
	/** 직원 */
	EMPLOYEE(3, "직원"), 
	/** 프리랜서 */
	FREELANCER(4, "프리랜서"), 
	/** 협력사 */
	PARTNERS(5, "협력사"), 
	/** 기타 */
	ETC(6, "기타");
	
	int level;
	String text;
}
