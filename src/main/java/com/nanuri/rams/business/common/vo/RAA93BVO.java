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
        private String lv2Id;
        private String lv3Id;
    }
    
    @Getter
    @Setter
    public static class MainMenuVo extends RAA93BDTO {
    	private String oldMenuId;						/* 변경전 메뉴ID*/
    	private String empNm;
    }
    
    private int srtNo;
    private String menuId;
    private String rghtCd;
    private String menuLv;
    private String dltF;
    private String mdfyRghtCcd;
    private String hndlDyTm;
    private String hndlPEno;
    
    
}
