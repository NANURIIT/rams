package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA18BVO {
	
	@Getter
	@Setter
	public static class DocInfo {
		private String ibDealNo;		//IBDEAL번호
		private String raDocNo;			//문서번호
		private String riskInspctCcd;	//리스크심사구분코드
		private String lstCCaseCcd;		//부수안건구분코드
	}
	
	
}
