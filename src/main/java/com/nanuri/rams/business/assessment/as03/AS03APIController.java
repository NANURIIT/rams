package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

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
	 * 
	 * @param dealDto
	 * @return
	 * @throws ParseException
	 */
	@GetMapping(value = "/getDealInfo")
	public List<RAA01BDto> getDealInfo(DealInfo dealDto) throws ParseException {
		return as03Service.getDealInfo(dealDto);
	}

	// 심사부서구분코드
	@GetMapping(value = "/getInspctDprtCcd")
	public List<Map<String, Object>> getInspctDprtCcd() {
		return as03Service.getInspctDprtCcd();
	}
	
	// 투자상품대분류코드
	@GetMapping(value = "/getInvstGdsLdvdCd")
	public List<Map<String, Object>> getInvstGdsLdvdCd() {
		return as03Service.getInvstGdsLdvdCd();
	}
	
	// 투자상품중분류코드
	@GetMapping(value = "/getInvstGdsMdvdCd")
	public List<Map<String, Object>> getInvstGdsMdvdCd() {
		return as03Service.getInvstGdsMdvdCd();
	}
	
	// 투자상품소분류코드
	@GetMapping(value = "/getInvstGdsSdvdCd")
	public List<Map<String, Object>> getInvstGdsSdvdCd() {
		return as03Service.getInvstGdsSdvdCd();
	}

}
