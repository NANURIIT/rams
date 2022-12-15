package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA02BDto;

@Mapper
public interface RAA02BMapper {
	
	public List<RAA02BDto> getDealList(RAA02BDto raa02bDto);
	
}
