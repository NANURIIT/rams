package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RAA91BMapper {
	
	public List<Map<String, Object>> getSelectBox(String cmnsCdGrp);				// 셀렉트박스 코드, 밸류 취득
	
}
