package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;

@Mapper
public interface RAA01BMapper {

	public List<RAA01BVO> getDealInfo(DealInfo dealInfo);

	// 신규 deal 생성
	public void insertDealInfo(RAA01BDTO paramData);

	// deal 정보 갱신
	public void updateDealInfo(RAA01BDTO raa01bDTO);
	
	// 심사안건조회
	List<RAA01BDTO> checkDealSearch(checkDealInfo dealInfo);
}
