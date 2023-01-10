package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA03BDTO {

    private String ibDealNo;
    private String riskInspctCcd;
    private String lstCCaseCcd;
    private int itemSq;
    private String bscAstsKndCd;
    private String bscAstsCntnt;
    private int opnPrcValAmt;
    private String bscAstsIsngCorpNo;
    private String invstCrncyCd;
    private int crncyAmt;
    private int aplcExchR;
    private String rnmcno;
    private Date hndlDyTm;
    private String hndlDprtCd;
    private String hndlPEno;
}
