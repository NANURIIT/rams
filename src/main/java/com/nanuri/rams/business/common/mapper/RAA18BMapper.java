package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

@Mapper
public interface RAA18BMapper {
	
	public List<Map<String, Object>> getDocInfo(DocInfo docInfo);							// 관련문서

	public int deleteDocInfo(DocInfo docInfo);								// 관련문서정보 제거


}
