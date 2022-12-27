package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA95BDTO;

import lombok.Getter;
import lombok.Setter;

public class RAA95BVO {
    
	@Getter
	@Setter
	public static class selectUseMenuVO extends RAA95BDTO {
		private String lv1Id;
		private String lv2Id;
		private String lv3Id;
	}
}
