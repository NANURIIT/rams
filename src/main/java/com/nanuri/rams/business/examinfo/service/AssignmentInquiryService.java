package com.nanuri.rams.business.examinfo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.examinfo.dto.DealDto;

@Service
public interface AssignmentInquiryService {
	public List<DealDto> findDealList(String DealNo, String def);

	public DealDto findDealDetails(String dealNo);

	public void registDealDetails(DealDto dealDto);
	
	public void updateDealDetails(DealDto dealDto);
}
