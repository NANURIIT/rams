package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA95BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class RAA95BVO {
    
	@Getter
	@Setter
	public static class selectUseMenuVO extends RAA95BDTO {
		private String lv1Id;
		private String lv2Id;
		private String lv3Id;

		private int nextVal;
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
