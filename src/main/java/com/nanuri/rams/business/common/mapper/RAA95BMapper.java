package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA95BDTO;
import com.nanuri.rams.business.common.vo.RAA95BVO;

@Mapper
public interface RAA95BMapper {
    
    public List<RAA95BDTO> selectAvailableMenu(Map<String, String> menuId);				// RAA95B 수정 조회 가능 여부 조회
	public int insertUseMenu(RAA95BDTO dtoList);									// RAA95B 수정 조회 가능 여부 저장
	public int deleteUseMenu(RAA95BDTO dto);									// RAA95B 수정 조회 가능 여부 삭제
	public List<RAA95BVO.selectUseMenuVO> selectUseMenu(RAA95BDTO dto);
	public RAA95BDTO selectMainMenuId(RAA95BDTO dto);
	public int selectMaxSq();
}
