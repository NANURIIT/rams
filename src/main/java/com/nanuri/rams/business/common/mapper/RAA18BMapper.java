package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RAA18BMapper {
	
	public List<Map<String, Object>> getDocInfo();							// 관련문서


}
