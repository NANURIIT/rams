package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CodeInfoSaveRequestDto {

    private String cmnsCdGrp;
    private String oldCdVlId;
    private String cdVlId;
    private String cdVlNm;
    private String useF;
}
