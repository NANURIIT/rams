package com.nanuri.rams.business.examinfo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.examinfo.dto.DealDto;

@Service
public interface AssignmentInquiryService {
	
	public List<DealDto> getDealList(String DealNo, String def);					// deal list 가져오기

	public DealDto getDealDetails(String dealNo);									// deal 상세정보 가져오기

	public void registDealDetails(DealDto dealDto);									// deal 정보 등록
	
	public void updateDealDetails(DealDto dealDto);									// deal 정보 수정
}
