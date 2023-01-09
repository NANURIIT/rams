package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA18BDTO {

    private String ibDealNo;
    private String riskInspctCcd;
    private String lstCCaseCcd;
    private String raDocCcd;
    private int itemSq;
    private String raDocNo;
    private String raRmrk;
    private String raFnlDocF;
    private Date hndlDyTm;
    private String hndlDprtCd;
    private String hndlPEno;
}
