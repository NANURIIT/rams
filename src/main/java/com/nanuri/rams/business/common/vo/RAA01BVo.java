package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA01BVo {
	
	@Getter
	@Setter
	public static class DealInfo {
		private String dealNo;				//	IBDEAL번호
	    private String dealNm;				//	IBDEA명
	    private String dscDate;				//	DSC일자
	}
	
	
}
