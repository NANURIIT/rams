package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA18BDTO;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

@Mapper
public interface RAA18BMapper {
	
	public List<DocInfo> getDocInfo(DocInfo docInfo);							// 관련문서정보 취득

	public int deleteDocInfo(DocInfo docInfo);									// 관련문서정보 제거

	public int registDocInfo(RAA18BDTO raa18bDTO);								// 관련문서정보 생성

	public int updateDocInfo(RAA18BDTO raa18bDTO);								// 관련문서정보 갱신


}
