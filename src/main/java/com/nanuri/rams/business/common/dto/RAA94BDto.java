package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RAA94BDto {

    private String rghtCd;          /* 권한코드 */
    private String rghtCdNm;        /* 권한코드명 */
    private String rghtCdExpl;      /* 권한코드설명 */
    private String rghtCcd;         /* 권한코드구분코드 */
    private String aplcF;           /* 적용여부 */
    private String rgstDt;          /* 등록일자 */
    private String rgstPEno;        /* 등록자사번 */
    private String dltF;            /* 삭제여부 */
    private String dltDt;           /* 삭제일자 */
    private String dltTm;           /* 삭제시간 */
    private String dltPEno;         /* 삭제자사번 */
    private String hndlDyTm;        /* 처리일시 */
    private String hndlDprtCd;      /* 처리부점코드 */
    private String hndlPEno;        /* 처리자사번 */

    private String oldRghtCd;       /* 변경전 권한코드 */
}
