package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA01BDto;
import com.nanuri.rams.business.common.vo.RAA01BVo.DealInfo;

@Service
public interface AS03Service {

	/**
	 * deal info 가져오기
	 * 
	 * @param dealInfo
	 * @return
	 * @throws ParseException 
	 */
	public List<RAA01BDto> getDealInfo(DealInfo dealDto) throws ParseException;

	// 심사부서구분코드
	public List<Map<String, Object>> getInspctDprtCcd();

	// 투자상품대분류코드
	public List<Map<String, Object>> getInvstGdsLdvdCd();

	// 투자상품중분류코드
	public List<Map<String, Object>> getInvstGdsMdvdCd();

	// 투자상품소분류코드
	public List<Map<String, Object>> getInvstGdsSdvdCd();

}
