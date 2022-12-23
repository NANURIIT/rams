package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RAA91BMapper {
	
	public List<Map<String, Object>> getRiskInspctCcd();							// 리스크심사구분코드
	
	public List<Map<String, Object>> getlstCCaseCcd();								// 부수안건구분코드
	
	public List<Map<String, Object>> getInspctDprtCcd();							// 심사부서구분코드

	public List<Map<String, Object>> getInvstGdsLdvdCd();							// 투자상품대분류코드

	public List<Map<String, Object>> getInvstGdsMdvdCd();							// 투자상품중분류코드

	public List<Map<String, Object>> getInvstGdsSdvdCd();							// 투자상품소분류코드

	public List<Map<String, Object>> getInvstGdsDtlsDvdCd();						// 투자상품상세분류코드

	public List<Map<String, Object>> getInvstCrncyCd();								// 부의기준통화
	
	public List<Map<String, Object>> getIndTypDvdCd();								// 고위험사업
	
	public List<Map<String, Object>> getCheckItemCd();								// 업무구분
	
	public List<Map<String, Object>> getInvstThingCcd();							// 주요투자물건
	
	public List<Map<String, Object>> getInvstThingDtlsCcd();						// 주요투자물건상세
	
	public List<Map<String, Object>> getRspsbCmplCcd();								// 책임준공
	
	public List<Map<String, Object>> getRaRsltnCcd();								// 전결구분

	public List<Map<String, Object>> getCoprtnTypCd();								// 협업유형코드

	public List<Map<String, Object>> getBscAstsKndCd();								// 기초자산종류

	public List<Map<String, Object>> getCncCmpnyClsfCd();							// 법인형태

	public List<Map<String, Object>> getMrtgKndCcd();								// 담보유형

	public List<Map<String, Object>> getMrtgDtlsCcd();								// 담보상세

	public List<Map<String, Object>> getRgtRnkCcd();								// 권리순위

	public List<Map<String, Object>> getDbtNpFrmOblgCcd();							// 미이행시의무
	
	
}
