package com.nanuri.rams.business.examinfo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.examinfo.dto.DealDto;

@Mapper
public interface ExamInfoMapper {
	
	/* 심사 요청 페이지
	 * 
	 */
	
	public List<DealDto> getDealList(String DealNo, String def);					// deal list 가져오기

	public DealDto getDealDetails(String dealNo);									// deal 상세정보 가져오기

	public void registDealDetails(DealDto dealDto);									// deal 정보 등록
	
	public void updateDealDetails(DealDto dealDto);									// deal 정보 수정
	
	/* 안건조회 및 배정 페이지
	 * 
	 * */
	
	//TODO
	
	
	/* 배정안건조회 페이지
	 * 
	 * */
	
	//TODO
}