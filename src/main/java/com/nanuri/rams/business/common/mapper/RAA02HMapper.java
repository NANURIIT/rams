package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA02HDTO;

@Mapper
public interface RAA02HMapper {

	// deal 정보 insert
	int insertDealInfo(RAA02HDTO paramData);

}
