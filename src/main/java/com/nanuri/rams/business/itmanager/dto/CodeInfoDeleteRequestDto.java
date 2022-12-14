package com.nanuri.rams.business.itmanager.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class CodeInfoDeleteRequestDto {
    private String cmnsCdGrp;
    private List<String> cdVlIds = new ArrayList<>();
}
