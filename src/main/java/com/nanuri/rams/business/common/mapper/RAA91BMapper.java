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

	

	
	
}
