package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA02BVO {
	
	@Getter
	@Setter
	public static class AssignInfo{
		
		
		private String start;					//	검색 시작 날짜
		private String end;						//	검색 끝 날짜
		
		private String fstRgstDt;				//	배정일 
		private String ibDealNo;				//	IBDEAL 번호
		private String riskInspctCcd;			//	신규/재부의
		private String lstccaseCcd;				//	부수안건
		private String ibDealNm;				//	안건명
		private String ownpEno;					//	심사역
		private String hdqtCd;					//	본부
		private String dprtNm;					//	부서
		private String chrgpEno;				//	직원
		private String coprtnTypCd;				//	협업 유형
		private String inspctPrgrsStCd;			//	진행상태
	}
	
	
}
