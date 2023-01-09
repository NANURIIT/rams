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
	@Getter
	@Setter
	public static class checkDealInfo{
		private String start;				//	조회시작날짜 
		private String end;					//	조회종료날짜 
		private String dprtCd;				//	부서코드
		private String currency;			//	통화
		private String unit;				//	단위
		private String dealNm;				//	딜명
	}
	
}
