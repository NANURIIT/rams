package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Max;

@Getter
@Setter
@ToString
public class CodeInfoSaveRequestDto {

    private String cmnsCdGrp;
    private String oldCdVlId;
    @Max(value = 20, message = "코드Id는 20자리 이하여야 합니다.")
    private String cdVlId;
    private String cdVlNm;
    private Integer cdSq;
    private String useF;
    private String rgstPEno;
    private String hndlPEno;
}
