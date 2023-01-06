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
		return commonService.getSelectBox("R001");
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
		return commonService.getSelectBox("R013");
	}

	// 부수안건구분코드
	@GetMapping(value = "/getlstCCaseCcd")
	public List<Map<String, Object>> getlstCCaseCcd() {
		return commonService.getSelectBox("L001");
	}

	// 심사부서구분코드
	@GetMapping(value = "/getInspctDprtCcd")
	public List<Map<String, Object>> getInspctDprtCcd() {
		return commonService.getSelectBox("I003");
	}

	// 투자상품대분류코드
	@GetMapping(value = "/getInvstGdsLdvdCd")
	public List<Map<String, Object>> getInvstGdsLdvdCd() {
		return commonService.getSelectBox("I012");
	}

	// 투자상품중분류코드
	@GetMapping(value = "/getInvstGdsMdvdCd")
	public List<Map<String, Object>> getInvstGdsMdvdCd() {
		return commonService.getSelectBox("I015");
	}

	// 투자상품소분류코드
	@GetMapping(value = "/getInvstGdsSdvdCd")
	public List<Map<String, Object>> getInvstGdsSdvdCd() {
		return commonService.getSelectBox("I014");
	}

	// 투자상품상세분류코드
	@GetMapping(value = "/getInvstGdsDtlsDvdCd")
	public List<Map<String, Object>> getInvstGdsDtlsDvdCd() {
		return commonService.getSelectBox("I013");
	}

	// 부의기준통화
	@GetMapping(value = "/getInvstCrncyCd")
	public List<Map<String, Object>> getInvstCrncyCd() {
		return commonService.getSelectBox("I016");
	}

	// 투자국가
	@GetMapping(value = "/getCntyCd")
	public List<Map<String, Object>> getCntyCd() {
		return commonService.getSelectBox("U003");
	}

	// 고위험사업
	@GetMapping(value = "/getIndTypDvdCd")
	public List<Map<String, Object>> getIndTypDvdCd() {
		return commonService.getSelectBox("I008");
	}

	// 업무구분
	@GetMapping(value = "/getCheckItemCd")
	public List<Map<String, Object>> getCheckItemCd() {
		return commonService.getSelectBox("C004");
	}

	// 투자국가
	@GetMapping(value = "/getBsnsAreaCd")
	public List<Map<String, Object>> getBsnsAreaCd() {
		return commonService.getSelectBox("U004");
	}

	// 주요투자물건
	@GetMapping(value = "/getInvstThingCcd")
	public List<Map<String, Object>> getInvstThingCcd() {
		return commonService.getSelectBox("I010");
	}

	// 주요투자물건상세
	@GetMapping(value = "/getInvstThingDtlsCcd")
	public List<Map<String, Object>> getInvstThingDtlsCcd() {
		return commonService.getSelectBox("I011");
	}

	// 책임준공
	@GetMapping(value = "/getRspsbCmplCcd")
	public List<Map<String, Object>> getRspsbCmplCcd() {
		return commonService.getSelectBox("R014");
	}

	// 전결구분
	@GetMapping(value = "/getRaRsltnCcd")
	public List<Map<String, Object>> getRaRsltnCcd() {
		return commonService.getSelectBox("R002");
	}

	// 협업유형코드
	@GetMapping(value = "/getCoprtnTypCd")
	public List<Map<String, Object>> getCoprtnTypCd() {
		return commonService.getSelectBox("C005");
	}

	// ---------------tab3 start------------------

	// 기초자산종류
	@GetMapping(value = "/getBscAstsKndCd")
	public List<Map<String, Object>> getBscAstsKndCd() {
		return commonService.getSelectBox("B002");
	}

	// ---------------tab4 start------------------

	// 법인형태
	@GetMapping(value = "/getCncCmpnyClsfCd")
	public List<Map<String, Object>> getCncCmpnyClsfCd() {
		return commonService.getSelectBox("C002");
	}

	// ---------------tab6 start------------------

	// 담보유형
	@GetMapping(value = "/getMrtgKndCcd")
	public List<Map<String, Object>> getMrtgKndCcd() {
		return commonService.getSelectBox("M002");
	}

	// 담보상세
	@GetMapping(value = "/getMrtgDtlsCcd")
	public List<Map<String, Object>> getMrtgDtlsCcd() {
		return commonService.getSelectBox("M001");
	}

	// 권리순위
	@GetMapping(value = "/getRgtRnkCcd")
	public List<Map<String, Object>> getRgtRnkCcd() {
		return commonService.getSelectBox("R008");
	}

	// ---------------tab8 start------------------

	// 미이행시의무
	@GetMapping(value = "/getDbtNpFrmOblgCcd")
	public List<Map<String, Object>> getDbtNpFrmOblgCcd() {
		return commonService.getSelectBox("D001");
	}
}
