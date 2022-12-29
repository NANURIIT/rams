package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AS03APIController {

	private final AS03Service as03Service;

	// ---------------search bar------------------

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

	// ---------------tab1 start------------------

	// 담당직원 - 로그인유저정보
	@GetMapping(value = "/getUserAuth")
	public Map<String, Object> getUserAuth() {
		return as03Service.getUserAuth();
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

	// 투자국가
	@GetMapping(value = "/getCntyCd")
	public List<Map<String, Object>> getCntyCd() {
		return as03Service.getCntyCd();
	}

	// 고위험사업
	@GetMapping(value = "/getIndTypDvdCd")
	public List<Map<String, Object>> getIndTypDvdCd() {
		return as03Service.getIndTypDvdCd();
	}

	// 업무구분
	@GetMapping(value = "/getCheckItemCd")
	public List<Map<String, Object>> getCheckItemCd() {
		return as03Service.getCheckItemCd();
	}

	// 투자국가
	@GetMapping(value = "/getBsnsAreaCd")
	public List<Map<String, Object>> getBsnsAreaCd() {
		return as03Service.getBsnsAreaCd();
	}

	// 주요투자물건
	@GetMapping(value = "/getInvstThingCcd")
	public List<Map<String, Object>> getInvstThingCcd() {
		return as03Service.getInvstThingCcd();
	}

	// 주요투자물건상세
	@GetMapping(value = "/getInvstThingDtlsCcd")
	public List<Map<String, Object>> getInvstThingDtlsCcd() {
		return as03Service.getInvstThingDtlsCcd();
	}

	// 책임준공
	@GetMapping(value = "/getRspsbCmplCcd")
	public List<Map<String, Object>> getRspsbCmplCcd() {
		return as03Service.getRspsbCmplCcd();
	}

	// 전결구분
	@GetMapping(value = "/getRaRsltnCcd")
	public List<Map<String, Object>> getRaRsltnCcd() {
		return as03Service.getRaRsltnCcd();
	}

	// 협업유형코드
	@GetMapping(value = "/getCoprtnTypCd")
	public List<Map<String, Object>> getCoprtnTypCd() {
		return as03Service.getCoprtnTypCd();
	}

	// 신규 deal 생성
	@PostMapping(value = "/registDealInfo")
	public int registDealInfo(RAA02BDTO paramData) throws ParseException {
		return as03Service.registDealInfo(paramData);
	}

	// ---------------tab2 start------------------

	// 관련문서
	@GetMapping(value = "/getDocInfo")
	public List<Map<String, Object>> getDocInfo(DocInfo docInfo) {
		return as03Service.getDocInfo(docInfo);
	}

	// 관련문서정보 제거
	@PostMapping(value = "/deleteDocInfo")
	public int deleteDocInfo(DocInfo docInfo) {
		return as03Service.deleteDocInfo(docInfo);
	}

	// ---------------tab3 start------------------

	// 기초자산종류
	@GetMapping(value = "/getBscAstsKndCd")
	public List<Map<String, Object>> getBscAstsKndCd() {
		return as03Service.getBscAstsKndCd();
	}

	// ---------------tab4 start------------------

	// 법인형태
	@GetMapping(value = "/getCncCmpnyClsfCd")
	public List<Map<String, Object>> getCncCmpnyClsfCd() {
		return as03Service.getCncCmpnyClsfCd();
	}

	// ---------------tab6 start------------------

	// 담보유형
	@GetMapping(value = "/getMrtgKndCcd")
	public List<Map<String, Object>> getMrtgKndCcd() {
		return as03Service.getMrtgKndCcd();
	}

	// 담보상세
	@GetMapping(value = "/getMrtgDtlsCcd")
	public List<Map<String, Object>> getMrtgDtlsCcd() {
		return as03Service.getMrtgDtlsCcd();
	}

	// 권리순위
	@GetMapping(value = "/getRgtRnkCcd")
	public List<Map<String, Object>> getRgtRnkCcd() {
		return as03Service.getRgtRnkCcd();
	}

	// ---------------tab8 start------------------

	// 미이행시의무
	@GetMapping(value = "/getDbtNpFrmOblgCcd")
	public List<Map<String, Object>> getDbtNpFrmOblgCcd() {
		return as03Service.getDbtNpFrmOblgCcd();
	}
}
