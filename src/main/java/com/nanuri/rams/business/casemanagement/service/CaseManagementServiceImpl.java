package com.nanuri.rams.business.casemanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.casemanagement.dto.EmpDto;
import com.nanuri.rams.business.casemanagement.mapper.CaseManagementMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CaseManagementServiceImpl implements CaseManagementService {

    private final CaseManagementMapper caseManagementMapper;

	@Override
	// 직원검색
	public List<EmpDto> findEmpList(EmpDto empDto) {
		
		List<EmpDto> empList = caseManagementMapper.findEmpList(empDto);
		
		return empList;
	}

    
}
