package com.nanuri.rams.business.casemanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.casemanagement.dto.EmpDto;
import com.nanuri.rams.business.casemanagement.service.CaseManagementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class CaseManagementAPIController {
	
	private final CaseManagementService caseManagementService;
	
	// 직원검색
	@GetMapping(value = "/findEmpList")
	public List<EmpDto> findEmpList (EmpDto empDto) {
		
		return caseManagementService.findEmpList(empDto);
	}
	
	
	
	
}
