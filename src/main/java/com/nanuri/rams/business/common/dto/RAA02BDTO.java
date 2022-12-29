package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 심사안건평가관리 table(RAA02BDTO) DTO */
public class RAA02BDTO {

	private String ibDealNo;									// IBDEAL번호
	private String riskInspctCcd;								// 리스크심사구분코드
	private String lstCCaseCcd;									// 부수안건구분코드
	private String raDealCcd;									// RADEAL구분코드
	private String fstRgstPDprtCd;								// 최초등록자부점코드
	private String raStdYrMm;									// RA기준년월
	private String raDealSq;									// RADEAL일련번호
	private String riskRcgNo;									// 리스크승인번호
	private String ibDealNm;									// IBDEAL명
	private String ownPEno;										// 소유자사번
	private String fstRgstDt;									// 최초등록일자
	private String uptPEno;										// 변경자사번
	private String uptRsnCntnt;									// 변경사유내용
	private String reRgstDt;									// 재등록일자
	private String hdqtCd;										// 본부코드
	private String dprtCd;										// 부점코드
	private String chrgPEno;									// 담당자사번
	private String coprtnTypCd;									// 협업유형코드
	private String ptcpAmt;										// 참여금액
	private String invstNtnCd;									// 투자국가코드
	private String invstCrncyCd;								// 투자통화코드
	private String crncyAmt;									// 통화금액
	private String invstPrdDyC;									// 투자기간일수
	private String pyExptDt;									// 지급예정일자
	private String ccExptDt;									// 해지예정일자
	private String tlErnAmt;									// 총수익금액
	private String wrtErnAmt;									// 기표수익금액
	private String rcvblErnAmt;									// 미수수익금액
	private String invstGdsLdvdCd;								// 투자상품대분류코드
	private String invstGdsMdvdCd;								// 투자상품중분류코드
	private String invstGdsSdvdCd;								// 투자상품소분류코드
	private String invstGdsDtlsDvdCd;							// 투자상품상세분류코드
	private String mngDrctgAppF;								// 관리지표해당여부
	private String indTypDvdCd;									// 업종분류코드
	private String checkItemCd;									// 점검항목코드
	private String mrtgOfrF;									// 담보제공여부
	private String ensrF;										// 보증여부
	private String rspsbCmplCcd;								// 책임준공구분코드
	private String riskInspctRsltnCcd;							// 리스크심사결의구분코드
	private String fstCnfrncF;									// 최초협의여부
	private String rprStrtDt;									// 보고시작일자
	private String ofclDocAcptDt;								// 공문접수일자
	private String aplcExptDt;									// 적용예정일자
	private String inspctPrgrsStCd;								// 심사진행상태코드
	private String nhndlRsnCntnt;								// 미처리사유내용
	private String agrDt;										// 약정일자
	private String agrAmt;										// 약정금액
	private String rqsDocNo;									// 요청문서번호
	private String wrtDt;										// 기표일자
	private String mtrtDt;										// 만기일자
	private String cshNtrAstsWrtAmt;							// 현금성자산기표금액
	private String endDt;										// 종료일자
	private String optnlEndCcd;									// 임의종료구분코드
	private String endBssCntnt;									// 종료기본내용
	private String inspctCnclHndlCcd;							// 심사취소처리구분코드
	private String ibDealSnmNm;									// IBDEAL약어명
	private String uptaInspctPrgrsStCd;							// 변경후심사진행상태코드
	private String fncGdsDvdCd;									// 금융상품분류코드
	private String raBsnsZoneCd;								// RA사업지역코드
	private String invstThingCcd;								// 투자물건구분코드
	private String invstThingDtlsCcd;							// 투자물건상세구분코드
	private String uptDt;										// 변경일자
	private String bsnsDprtCmmtRmrk1;							// 사업부서의견비고1
	private String inspctDprtCmmtRmrk2;							// 심사부서의견비고2
	private String rsltnCnfrncCcd;								// 결의협의회구분코드
	private String cfmtDbt;										// 준거채무
	private String wmGdsEtc;									// WM상품기타
	private String raRsltnCcd;									// RA결의구분코드
	private String mainInvstTrgtNm;								// 주요투자대상명
	private String raFndRskGrdCd;								// RA펀드위험등급코드
	private String mktgFeeR;									// 판매수수료율
	private String tlRcpsR;										// 종보수율
	private String trustRcpsR;									// 신탁보수율
	private String dlDprtCd1;									// 거래부점코드1
	private String dlDprtCd2;									// 거래부점코드2
	private String dlDprtCd3;									// 거래부점코드3
	private String astsValAmt;									// 자산평가금액
	private String minMrtgRt;									// 최저담보비율
	private String stdDyMrtgRt;									// 기준일담보비율
	private String etcFncCndt;									// 기타금융조건
	private String aplcExchR;									// 적용환율
	private String raEtcFeeR;									// RA기타수수료율
	private String raLsrtFeeR;									// RA실권수수료율
	private String raUdwrtFeeR;									// RA인수수수료율
	private String udwrtFncIsngDt;								// 인수금융발행일자
	private String udwrtFncSbmsDt;								// 인수금융제출일자
	private String udwrtFncSbsDt;								// 인수금융청약일자
	private String trsnsInvstF;									// 대체투자여부
	private String bsnsSttsCcd;									// 사업단계구분코드
	private String bscAstsInptExptF;							// 기초자산입력예정여부
	private String insGrdInptExptF;								// 내부등급입력예정여부
	private String cfmtEntpNm;									// 준거기업명
	private String advtcnqGdsF;									// 고난도상품여부
	private String jnGlfct;										// 가입자격
	private String mnJnAmt;										// 최소가입금액
	private String wmOtcmRcpsR;									// WM성과보수
	private String acMrtgRt;									// 계좌담보비율
	private String inspctDprtCcd;								// 심사부서구분코드
	private String cncCmpnyInptExptF;							// 연결회사입력예정여부
	private String hndlDyTm;									// 처리일시
	private String hndlDprtCd;									// 처리부점코드
	private String hndlPEno;									// 처리자번

}
