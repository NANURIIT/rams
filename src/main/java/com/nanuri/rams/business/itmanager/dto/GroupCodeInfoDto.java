package com.nanuri.rams.business.itmanager.dto;

import com.nanuri.rams.com.dto.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupCodeInfoDto extends CommonDTO{
    
    /* 공통코드그룹정보 */
    
    private String cmnsCdGrp;               /* 공통코드그룹 */
    private String cmnsCdNm;                /* 공통코드명 */
    private String cmnsCdClsf;              /* 공통코드구분 */
    private Integer cdLngth;                /* 코드길이 */
    private String trnsfrmAftCdGrp;         /* 변환후코드그룹 */
    private String cmnsCdGrpExpl;           /* 공통코드그룹설명 */
    private String useF;                    /* 사용여부 */
}
