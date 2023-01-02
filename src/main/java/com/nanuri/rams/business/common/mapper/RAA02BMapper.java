package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA02HDTO;

@Mapper
public interface RAA02BMapper {

	// raDealSq 취득
	String getRaDealSq(@Param("raDealCcd") String raDealCcd, @Param("dprtCd") String dprtCd);
	
	// 신규 deal 생성
	int insertDealInfo(RAA02BDTO paramData);
	
	// 히스토리 데이터 취득
	RAA02HDTO copyDealInfO(@Param("ibDealNo") String ibDealNo);

	

}
