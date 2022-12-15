package com.nanuri.rams.business.assessment.as03;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA02BDto;

@Service
public interface AS03Service {
	
	/**
	 * deal list 가져오기
	 * @param dealDto
	 * @return
	 */
	public List<RAA02BDto> getDealList(RAA02BDto dealDto); 
	
}
