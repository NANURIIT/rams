package com.nanuri.rams.business.itmanager.dto;

import com.nanuri.rams.com.dto.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeInfoDto extends CommonDTO {
    
    /* 공통코드정보 */
    
    private String cmnsCdGrp;               /* 공통코드그룹 */
    private String cdVlId;                  /* 코드값ID */
    private String cdVlNm;                  /* 코드값명 */
    private String rsltCdVl;                /* 결과코드값 */
    private Integer cdSq;                   /* 코드일련번호 */
    private String useF;                    /* 사용여부 */
}
