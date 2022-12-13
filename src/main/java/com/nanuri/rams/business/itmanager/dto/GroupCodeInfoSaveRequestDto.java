package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class GroupCodeInfoSaveRequestDto {

    private String oldCmnsCdGrp;

    @NotBlank(message = "그룹코드를 입력해주세요.")
    private String cmnsCdGrp;

    @NotBlank(message = "그룹 명을 입력해주세요.")
    private String cmnsCdNm;

    @NotBlank(message = "코드길이를 입력해주세요.")
    private Integer cdLngth;
    private String useF;
}
