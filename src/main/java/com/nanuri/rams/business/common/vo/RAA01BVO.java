package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA01BVO {
	
	@Getter
	@Setter
	public static class DealInfo {
		private String ibDealNo;			//	IBDEAL번호
	    private String ibDealNm;			//	IBDEA명
	    private String dscDate;				//	DSC일자
	    private String raDealCcd;			//	RADEAL구분코드
	}
	
	
}
