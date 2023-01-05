package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA93BDTO {
    
    /* 메뉴화면 등록정보 */
    private String menuId;								/* 메뉴ID */
    private String menuNm;								/* 메뉴명 */
    private String shrtNm;								/* 단축명 */
    private String hgRnkMenuId;							/* 상위메뉴ID */
    private String scrnAplcTypecd;						/* 화면적용형태코드 */
    private int srtNo;									/* 정렬번호 */
    private int menuLv;									/* 메뉴레벨 */
    private String urlDvdCd;							/* URL분류코드 */
    private String urlNm;								/* URL명 */
    private String urlPrmtrCntnt;						/* URL매개변수내용 */
    private String usrRghtClsfCd;						/* 사용자권한구분코드 */
    private String aplcF;								/* 적용여부 */
    private String aplcDt;								/* 적용일자 */
    private String dltF;								/* 삭제여부 */
    private String dltDt;								/* 삭제일자 */
    private String dltTm;								/* 삭제시간 */
    private String dltPEno;								/* 삭제자사번 */
    private Date hndlDyTm;								/* 처리일시 */
    private String hndlDprtCd;							/* 처리부점코드 */
    private String hndlPEno;							/* 처리자사번 */
    
    private String OldMenuId;						/* 변경전 메누ID*/
}
