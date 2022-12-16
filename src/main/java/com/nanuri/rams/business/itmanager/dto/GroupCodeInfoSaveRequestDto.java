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

    @Max(value = 4, message = "그룹코드는 4자리 이하여야 합니다.")
    private String cmnsCdGrp;
    private String cmnsCdNm;
    private Integer cdLngth;
    private String useF;
}
