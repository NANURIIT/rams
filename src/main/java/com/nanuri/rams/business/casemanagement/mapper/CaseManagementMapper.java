package com.nanuri.rams.business.casemanagement.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.casemanagement.dto.EmpDto;

@Mapper
public interface CaseManagementMapper {

	public List<EmpDto> findEmpList(EmpDto empDto);				// 직원검색
	
}
