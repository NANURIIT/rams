package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA93BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA93BVO {
    
    @Getter
    @Setter
    public static class MenuListVO extends RAA93BDTO {
        private int rowNum;
        private String menuName;
        private String lv1Id;
        private String lv1Nm;
        private String lv2Id;
        private String lv2Nm;
        private String lv3Id;
        private String lv3Nm;
    }
}
