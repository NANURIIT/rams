package com.nanuri.rams.business.common.dto;


import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA95BDTO {
    
    /* 권한별 메뉴화면 사용권한 */
    private String rghtCd;						/* 권한코드 */
    private int sq;								/* 일련번호 */
	private String menuId;						/* 메뉴ID */
    private String mdfyRghtCcd;					/* 수정권한구분코드(1:조회, 2:수정가능) */
    private Date hndlDyTm;						/* 처리일시 */
    private String hndlDprtCd;					/* 처리부점코드 */
    private String hndlPEno;					/* 처리자사번 */

	private String rowNum;
}
