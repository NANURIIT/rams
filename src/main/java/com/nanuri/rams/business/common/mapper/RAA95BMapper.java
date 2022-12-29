package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA95BDTO;

@Mapper
public interface RAA95BMapper {
    
    public List<RAA95BDTO> selectAvailableMenu(Map<String, String> menuId);			// RAA95B 수정 조회 가능 여부 조회
	public int insertUseMenu(RAA95BDTO dtoList);									// RAA95B 수정 조회 가능 여부 저장
	public int deleteUseMenu(RAA95BDTO dto);										// RAA95B 수정 조회 가능 여부 삭제
	public int nextVal();															// SQ값 구하기
	public boolean isExist(RAA95BDTO dto);											// 업데이트 시 SQ에 해당 권한코드 데이터가 있는지 유무
	// public int updateUseMenu(RAA95BDTO dto);

	public Optional<RAA95BDTO> selectAuthCodeMenu(RAA95BDTO dto);
	public int updateAuthCodeMenu(RAA95BDTO dto);
	public int insertAuthCodeMenu(RAA95BDTO dto);
	public int deleteAuthCodeMenu(RAA95BDTO dto);
}
