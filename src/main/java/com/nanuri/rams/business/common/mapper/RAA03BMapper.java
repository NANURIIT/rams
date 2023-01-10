package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA03BDTO;
import com.nanuri.rams.business.common.vo.RAA03BVO;

@Mapper
public interface RAA03BMapper {
	
	public List<RAA03BVO> getAssetInfo(RAA03BVO docInfo);							// 기초자산정보 취득

	public int updateAssetInfo(RAA03BDTO raa03bDTO);								// 기초자산정보 갱신

	public int registAssetInfo(RAA03BDTO raa03bDTO);								// 기초자산정보 생성

}
