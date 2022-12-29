package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA95BDTO;

@Mapper
public interface RAA95BMapper {
    
    public List<RAA95BDTO> selectAvailableMenu(Map<String, String> menuId);			// RAA95B 수정 조회 가능 여부 조회
	public int insertUseMenu(RAA95BDTO dtoList);									// RAA95B 수정 조회 가능 여부 저장
	public int deleteUseMenu(RAA95BDTO dto);										// RAA95B 수정 조회 가능 여부 삭제
	public int nextVal();
	public int updateUseMenu(RAA95BDTO dto);
}
