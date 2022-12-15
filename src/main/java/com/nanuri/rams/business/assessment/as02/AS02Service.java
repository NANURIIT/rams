package com.nanuri.rams.business.assessment.as02;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA99ADto;

@Service
public interface AS02Service {
	
	public List<RAA99ADto> findEmpList(RAA99ADto raa99aDto);				// 직원검색

}
