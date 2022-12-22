package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA92BDTO extends CommonDTO{

	private String eno;								/* 사번 */
	private String sq;								/* 일련번호 */
	private String empNm;							/* 사원명 */
	private String rghtCd;							/* 권한코드 */
	private String dprtCd;							/* 부점코드 */
	private String rgstRsn;							/* 등록사유 */
	private String aplcStrtDt;						/* 적용시작일자 */
	private String aplcEndDt;						/* 적용종료일자 */
	private String dltF;							/* 삭제여부 */
	private String dltDt;							/* 삭제일자 */
	private String dltTm;							/* 삭제자시간 */
	private String dltPEno;							/* 삭제자사번 */
}
