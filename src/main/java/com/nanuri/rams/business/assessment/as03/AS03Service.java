package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;

@Service
public interface AS03Service {

	/**
	 * deal info 가져오기
	 * 
	 * @param dealInfo
	 * @return
	 * @throws ParseException
	 */
	public List<RAA01BVO> getDealInfo(DealInfo dealDto) throws ParseException;

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

	// 협업유형코드
	public List<Map<String, Object>> getCoprtnTypCd();

	// 관련문서
	public List<Map<String, Object>> getDocInfo();

}
