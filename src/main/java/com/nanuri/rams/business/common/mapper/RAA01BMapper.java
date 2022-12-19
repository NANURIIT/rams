package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA01BDto;
import com.nanuri.rams.business.common.vo.RAA01BVo.DealInfo;

@Mapper
public interface RAA01BMapper {

	public List<RAA01BDto> getDealInfo(DealInfo dealInfo);
	
}