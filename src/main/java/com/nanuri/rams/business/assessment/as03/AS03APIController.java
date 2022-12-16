package com.nanuri.rams.business.assessment.as03;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA01BDto;
import com.nanuri.rams.business.common.vo.RAA01BVo.DealInfo;

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
	@GetMapping(value = "/getDealInfo")
	public List<RAA01BDto> getDealInfo(DealInfo dealDto) {
		return as03Service.getDealInfo(dealDto);
	}

}
