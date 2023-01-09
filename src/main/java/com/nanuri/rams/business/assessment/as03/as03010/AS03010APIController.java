package com.nanuri.rams.business.assessment.as03.as03010;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AS03010APIController {
	
	private final AS03010Service as03010Service;
	
	// 심사안건조회
	@GetMapping(value = "/checkDealSearch")
	public List<RAA01BDTO> checkDealSearch(checkDealInfo dealDto) throws ParseException{
		return as03010Service.checkDealSearch(dealDto);
	}

}
