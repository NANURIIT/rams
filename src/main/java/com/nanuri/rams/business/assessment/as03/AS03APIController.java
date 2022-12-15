package com.nanuri.rams.business.assessment.as03;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA02BDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AS03APIController {
	
	private final AS03Service as03Service;

	/**
	 * deal list 가져오기
	 * @param dealDto
	 * @return
	 */
	@GetMapping(value = "/getDealList")
	public List<RAA02BDto> getDealList(RAA02BDto dealDto) {
		return as03Service.getDealList(dealDto);
	}

}
