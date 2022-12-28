package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA95BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class RAA95BVO {
    
    @Getter
    @Setter
    public static class MenuByAuthVO extends RAA94BDTO {
		private int sq;								/* 일련번호 */
	    private String menuId;						/* 메뉴ID */
        private String mdfyRghtCcd;					/* 수정권한구분코드(1:조회, 2:수정가능) */
		
		private String hndlDt;
		private String hndlTm;
    }

	@Getter
	@Setter
	public static class selectUseMenuVO extends RAA95BDTO {
		private String lv1Id;
		private String lv2Id;
		private String lv3Id;
	}

	@Getter
	@Setter
	@ToString
	public static class menuUpdateRequestVO {
		private String rghtCd;
		private String menuId;
		private Boolean isUsed = false;
		private Boolean isModified = false;
	}
}
