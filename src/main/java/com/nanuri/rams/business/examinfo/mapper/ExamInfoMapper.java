package com.nanuri.rams.business.examinfo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.examinfo.dto.DealDto;

@Mapper
public interface ExamInfoMapper {
	
	/* 심사 요청 페이지
	 * 
	 */
	
	public List<DealDto> getDealList(DealDto dealDto);								// deal list 가져오기
	
	/* 안건조회 및 배정 페이지
	 * 
	 * */
	
	//TODO
	
	
	/* 배정안건조회 페이지
	 * 
	 * */
	
	//TODO
}
