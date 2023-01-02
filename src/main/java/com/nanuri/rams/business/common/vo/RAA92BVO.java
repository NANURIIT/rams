package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA92BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA92BVO {

    @Getter
    @Setter
    public static class selectVO extends RAA92BDTO {
        private String dltY;					/* 삭제여부 */
        private String sq;						/* 일련번호 */
		private String usrC;					/* 사용자구분 */
    	private String pstn;					/* 직책 */
    	private String rghtCdNm;				/* 권한명 */
    };

}
