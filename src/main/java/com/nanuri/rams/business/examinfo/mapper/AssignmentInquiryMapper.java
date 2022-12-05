package com.nanuri.rams.business.examinfo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.examinfo.dto.DealDto;

@Mapper
public interface AssignmentInquiryMapper {
	public List<DealDto> findDealList(String DealNo, String def);

	public DealDto findDealDetails(String dealNo);

	public void registDealDetails(DealDto dealDto);
	
	public void updateDealDetails(DealDto dealDto);
}
