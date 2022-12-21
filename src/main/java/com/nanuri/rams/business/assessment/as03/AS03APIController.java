package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;

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
	public List<RAA01BVO> getDealInfo(DealInfo dealDto) throws ParseException {
		return as03Service.getDealInfo(dealDto);
	}
	
	// 리스크심사구분코드
	@GetMapping(value = "/getRiskInspctCcd")
	public List<Map<String, Object>> getRiskInspctCcd() {
		return as03Service.getRiskInspctCcd();
	}

	// 부수안건구분코드
	@GetMapping(value = "/getlstCCaseCcd")
	public List<Map<String, Object>> getlstCCaseCcd() {
		return as03Service.getlstCCaseCcd();
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

	// 투자상품상세분류코드
	@GetMapping(value = "/getInvstGdsDtlsDvdCd")
	public List<Map<String, Object>> getInvstGdsDtlsDvdCd() {
		return as03Service.getInvstGdsDtlsDvdCd();
	}
	
	// 부의기준통화
	@GetMapping(value = "/getInvstCrncyCd")
	public List<Map<String, Object>> getInvstCrncyCd() {
		return as03Service.getInvstCrncyCd();
	}
	
	// 협업유형코드
	@GetMapping(value = "/getCoprtnTypCd")
	public List<Map<String, Object>> getCoprtnTypCd() {
		return as03Service.getCoprtnTypCd();
	}
	
	// 관련문서
	@GetMapping(value = "/getDocInfo")
	public List<Map<String, Object>> getDocInfo() {
		return as03Service.getDocInfo();
	}
}
