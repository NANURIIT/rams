package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA94BDTO;

import lombok.Getter;
import lombok.Setter;

public class RAA94BVO {
    
    @Getter
    @Setter
    public static class MenuByAuthVO extends RAA94BDTO {
        private int sq;								/* 일련번호 */
	    private String menuId;						/* 메뉴ID */
        private String mdfyRghtCcd;					/* 수정권한구분코드(1:조회, 2:수정가능) */

		private String hndlDt;
		private String hndlTm;
    }
}
