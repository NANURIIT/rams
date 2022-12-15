package com.nanuri.rams.business.assessment.as02;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA99ADto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AS02APIController {
	
	private final AS02Service as02Service;
	
	// 직원검색
	@GetMapping(value = "/findEmpList")
	public List<RAA99ADto> findEmpList (RAA99ADto raa99bDto) {
		
		return as02Service.findEmpList(raa99bDto);
	}

}
