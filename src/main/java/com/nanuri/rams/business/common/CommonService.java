package com.nanuri.rams.business.common;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface CommonService {

	// RADEAL구분코드
	public List<Map<String, Object>> getRaDealCcd();

	// ---------------tab1 start------------------

	// 담당직원 - 로그인유저정보
	public Map<String, Object> getUserAuth();

	// 리스크심사구분코드
	public List<Map<String, Object>> getRiskInspctCcd();

	// 부수안건구분코드
	public List<Map<String, Object>> getlstCCaseCcd();

	// 심사부서구분코드
	public List<Map<String, Object>> getInspctDprtCcd();

	// 투자상품대분류코드
	public List<Map<String, Object>> getInvstGdsLdvdCd();

	// 투자상품중분류코드
	public List<Map<String, Object>> getInvstGdsMdvdCd();

	// 투자상품소분류코드
	public List<Map<String, Object>> getInvstGdsSdvdCd();

	// 투자상품상세분류코드
	public List<Map<String, Object>> getInvstGdsDtlsDvdCd();

	// 부의기준통화
	public List<Map<String, Object>> getInvstCrncyCd();

	// 투자국가
	public List<Map<String, Object>> getCntyCd();

	// 고위험사업
	public List<Map<String, Object>> getIndTypDvdCd();

	// 업무구분
	public List<Map<String, Object>> getCheckItemCd();

	// 투자국가
	public List<Map<String, Object>> getBsnsAreaCd();

	// 주요투자물건
	public List<Map<String, Object>> getInvstThingCcd();

	// 주요투자물건상세
	public List<Map<String, Object>> getInvstThingDtlsCcd();

	// 책임준공
	public List<Map<String, Object>> getRspsbCmplCcd();

	// 전결구분
	public List<Map<String, Object>> getRaRsltnCcd();

	// 협업유형코드
	public List<Map<String, Object>> getCoprtnTypCd();

	// ---------------tab3 start------------------

	// 기초자산종류
	public List<Map<String, Object>> getBscAstsKndCd();

	// ---------------tab4 start------------------

	// 법인형태
	public List<Map<String, Object>> getCncCmpnyClsfCd();

	// ---------------tab6 start------------------

	// 담보유형
	public List<Map<String, Object>> getMrtgKndCcd();

	// 담보상세
	public List<Map<String, Object>> getMrtgDtlsCcd();

	// 권리순위
	public List<Map<String, Object>> getRgtRnkCcd();

	// ---------------tab8 start------------------

	// 미이행시의무
	public List<Map<String, Object>> getDbtNpFrmOblgCcd();
}
