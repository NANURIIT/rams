package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonDTO {

    private String rgstDt;              /* 등록일자 */
    private String rgstTm;              /* 등록시간 */
    private String rgstPEno;            /* 등록자사번 */
    private Date hndlDyTm;              /* 처리일시 */
    private String hndlDprtCd;          /* 처리부점코드 */
    private String hndlPEno;            /* 처리자사번 */
}
