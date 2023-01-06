package com.nanuri.rams.business.common;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
@RestController
public class CommonController {

	private final CommonService commonService;

	// RADEAL구분코드
	@GetMapping(value = "/getRaDealCcd")
	public List<Map<String, Object>> getRaDealCcd() {
		return commonService.getRaDealCcd();
	}

	// ---------------tab1 start------------------

	// 담당직원 - 로그인유저정보
	@GetMapping(value = "/getUserAuth")
	public Map<String, Object> getUserAuth() {
		return commonService.getUserAuth();
	}

	// 리스크심사구분코드
	@GetMapping(value = "/getRiskInspctCcd")
	public List<Map<String, Object>> getRiskInspctCcd() {
		return commonService.getRiskInspctCcd();
	}

	// 부수안건구분코드
	@GetMapping(value = "/getlstCCaseCcd")
	public List<Map<String, Object>> getlstCCaseCcd() {
		return commonService.getlstCCaseCcd();
	}

	// 심사부서구분코드
	@GetMapping(value = "/getInspctDprtCcd")
	public List<Map<String, Object>> getInspctDprtCcd() {
		return commonService.getInspctDprtCcd();
	}

	// 투자상품대분류코드
	@GetMapping(value = "/getInvstGdsLdvdCd")
	public List<Map<String, Object>> getInvstGdsLdvdCd() {
		return commonService.getInvstGdsLdvdCd();
	}

	// 투자상품중분류코드
	@GetMapping(value = "/getInvstGdsMdvdCd")
	public List<Map<String, Object>> getInvstGdsMdvdCd() {
		return commonService.getInvstGdsMdvdCd();
	}

	// 투자상품소분류코드
	@GetMapping(value = "/getInvstGdsSdvdCd")
	public List<Map<String, Object>> getInvstGdsSdvdCd() {
		return commonService.getInvstGdsSdvdCd();
	}

	// 투자상품상세분류코드
	@GetMapping(value = "/getInvstGdsDtlsDvdCd")
	public List<Map<String, Object>> getInvstGdsDtlsDvdCd() {
		return commonService.getInvstGdsDtlsDvdCd();
	}

	// 부의기준통화
	@GetMapping(value = "/getInvstCrncyCd")
	public List<Map<String, Object>> getInvstCrncyCd() {
		return commonService.getInvstCrncyCd();
	}

	// 투자국가
	@GetMapping(value = "/getCntyCd")
	public List<Map<String, Object>> getCntyCd() {
		return commonService.getCntyCd();
	}

	// 고위험사업
	@GetMapping(value = "/getIndTypDvdCd")
	public List<Map<String, Object>> getIndTypDvdCd() {
		return commonService.getIndTypDvdCd();
	}

	// 업무구분
	@GetMapping(value = "/getCheckItemCd")
	public List<Map<String, Object>> getCheckItemCd() {
		return commonService.getCheckItemCd();
	}

	// 투자국가
	@GetMapping(value = "/getBsnsAreaCd")
	public List<Map<String, Object>> getBsnsAreaCd() {
		return commonService.getBsnsAreaCd();
	}

	// 주요투자물건
	@GetMapping(value = "/getInvstThingCcd")
	public List<Map<String, Object>> getInvstThingCcd() {
		return commonService.getInvstThingCcd();
	}

	// 주요투자물건상세
	@GetMapping(value = "/getInvstThingDtlsCcd")
	public List<Map<String, Object>> getInvstThingDtlsCcd() {
		return commonService.getInvstThingDtlsCcd();
	}

	// 책임준공
	@GetMapping(value = "/getRspsbCmplCcd")
	public List<Map<String, Object>> getRspsbCmplCcd() {
		return commonService.getRspsbCmplCcd();
	}

	// 전결구분
	@GetMapping(value = "/getRaRsltnCcd")
	public List<Map<String, Object>> getRaRsltnCcd() {
		return commonService.getRaRsltnCcd();
	}

	// 협업유형코드
	@GetMapping(value = "/getCoprtnTypCd")
	public List<Map<String, Object>> getCoprtnTypCd() {
		return commonService.getCoprtnTypCd();
	}

	// ---------------tab3 start------------------

	// 기초자산종류
	@GetMapping(value = "/getBscAstsKndCd")
	public List<Map<String, Object>> getBscAstsKndCd() {
		return commonService.getBscAstsKndCd();
	}

	// ---------------tab4 start------------------

	// 법인형태
	@GetMapping(value = "/getCncCmpnyClsfCd")
	public List<Map<String, Object>> getCncCmpnyClsfCd() {
		return commonService.getCncCmpnyClsfCd();
	}

	// ---------------tab6 start------------------

	// 담보유형
	@GetMapping(value = "/getMrtgKndCcd")
	public List<Map<String, Object>> getMrtgKndCcd() {
		return commonService.getMrtgKndCcd();
	}

	// 담보상세
	@GetMapping(value = "/getMrtgDtlsCcd")
	public List<Map<String, Object>> getMrtgDtlsCcd() {
		return commonService.getMrtgDtlsCcd();
	}

	// 권리순위
	@GetMapping(value = "/getRgtRnkCcd")
	public List<Map<String, Object>> getRgtRnkCcd() {
		return commonService.getRgtRnkCcd();
	}

	// ---------------tab8 start------------------

	// 미이행시의무
	@GetMapping(value = "/getDbtNpFrmOblgCcd")
	public List<Map<String, Object>> getDbtNpFrmOblgCcd() {
		return commonService.getDbtNpFrmOblgCcd();
	}
}
