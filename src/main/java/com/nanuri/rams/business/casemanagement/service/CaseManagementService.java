package com.nanuri.rams.business.casemanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.casemanagement.dto.EmpDto;

@Service
public interface CaseManagementService {
	
	public List<EmpDto> findEmpList(EmpDto empDto);				// 직원검색
	
}