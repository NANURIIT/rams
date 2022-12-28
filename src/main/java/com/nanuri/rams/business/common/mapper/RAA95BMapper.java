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
	public RAA95BDTO selectMainMenuId(RAA95BDTO dto);								// 상위메뉴의 조회 여부를 수정하기 위해 데이터 유무 조회
	public int selectMaxSq();														// Primary key인 SQ의 충돌을 막기 위해 MAX(SQ) 값을 가져온다
	public void deleteMainMenu(RAA95BDTO dto);										// 조회 된 mainMenuId로 RAA95B의 해당 데이터 삭제

	public Optional<RAA95BDTO> selectAuthCodeMenu(RAA95BDTO dto);
	public int updateAuthCodeMenu(RAA95BDTO dto);
	public int insertAuthCodeMenu(RAA95BDTO dto);
	public int deleteAuthCodeMenu(RAA95BDTO dto);
}
