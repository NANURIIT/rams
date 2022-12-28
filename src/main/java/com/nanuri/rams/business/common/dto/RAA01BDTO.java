package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 심사안건일별상세 table(RAA01BDTO) DTO */
public class RAA01BDTO {

	private String ibDealNo;								// IBDEAL번호
	private String ibDealSq;								// IBDEAL일련번호
	private String dscDt;									// DSC일자
	private String dscSq;									// DSC일련번호
	private String dscSqc;									// DSC회차
	private String ibDealNm;								// IBDEAL명
	private String ibDealPrgrsStCd;							// IBDEAL상태코드
	private String dscRsltCd;								// DSC결과코드
	private String tlAmt;									// 총금액
	private String ptcpAmt;									// 참여금액
	private String tlErnAmt;								// 총수익금액
	private String wrtErnAmt;								// 기표수익금액
	private String rcvblErnAmt;								// 미수수익금액
	private String entpCd;									// 업체코드
	private String entpRnm;									// 업체실명
	private String corpRgstNo;								// 법인등록번호
	private String crdtGrdCd;								// 신용등급코드
	private String wrtDt;									// 기표일자
	private String mtrtDt;									// 만기일자
	private String invstNtnCd;								// 투자국가코드
	private String invstCrncyCd;							// 투자통화코드
	private String crncyAmt;								// 통화금액
	private String invstGdsLdvdCd;							// 투자상품대분류코드
	private String invstGdsMdvdCd;							// 투자상품중분류코드
	private String invstGdsSdvdCd;							// 투자상품소분류코드
	private String invstGdsDtlsDvdCd;						// 투자상품상세분류코드
	private String gdsDvd1Nm;								// 상품분류1명
	private String gdsDvd2Nm;								// 상품분류2명
	private String gdsDvd3Nm;								// 상품분류3명
	private String gdsDvd4Nm;								// 상품분류4명
	private String coprtnTypCd;								// 협업유형코드
	private String hdqtCd;									// 본부코드
	private String dprtCd;									// 부점코드
	private String chrgPEno;								// 담당자사번
	private String wthldTblNm;								// 원천테이블명
	private String fnlUptDyTm;								// 최종변경일시
	private String hndlDyTm;								// 처리일시
	private String hndlDprtCd;								// 처리부점코드
	private String hndlPEno;								// 처리자사번

}
