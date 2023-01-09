package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AssignInfo;

@Mapper
public interface RAA02BMapper {

	// raDealSq 취득
	String getRaDealSq(@Param("raDealCcd") String raDealCcd, @Param("dprtCd") String dprtCd);

	// 신규 deal 생성
	int insertDealInfo(RAA02BDTO paramData);

	// deal 정보 갱신
	void updateDealInfo(RAA02BDTO paramData);

	// 히스토리 데이터 취득
	RAA02BDTO copyDealInfO(@Param("ibDealNo") String ibDealNo);

	// Deal List 정보 취득
	List<RAA02BDTO> getDealList(DealInfo dealInfo);

	// deal 심사요청
	Map<String, Object> assesmentRequest(RAA02BDTO raa02bDTO);

	// 배정안건조회
	List<AssignInfo> assignmentSearch(AssignInfo assignInfo);

}
