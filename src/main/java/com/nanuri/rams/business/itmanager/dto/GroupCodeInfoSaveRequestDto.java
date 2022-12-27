package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class GroupCodeInfoSaveRequestDto {

    private String oldCmnsCdGrp;
    private String cmnsCdGrp;
    private String cmnsCdNm;
    private String cmnsCdGrpExpl;
    private Integer cdLngth;
    private String useF;
}
