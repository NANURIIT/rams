package com.nanuri.rams.business.assessment.as03.as03210;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA03BVO;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

@Service
public interface AS03210Service {

	// ---------------search bar------------------

	/**
	 * deal info 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	public List<RAA01BVO> getDealInfo(DealInfo dealDto) throws ParseException;

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	public List<RAA02BDTO> getDealList(DealInfo dealDto);

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	public RAA02BDTO getDealDetailInfo(String ibDealNo);

	// deal 심사요청
	public Map<String, Object> assesmentRequest(String ibDealNo);

	// deal 심사요청취소
	public Map<String, Object> assesmentRequestCancel(String ibDealNo);

	// ---------------tab1 start------------------

	// 신규 deal 생성
	public Map<String, Object> registDealInfo(RAA02BDTO paramData) throws ParseException;

	// 히스토리 데이터 취득
	public int registHistoy(Map<String, Object> dealInfoMap);

	// deal 정보 갱신
	public Map<String, Object> updateDealInfo(RAA02BDTO paramData) throws ParseException;

	// ---------------tab2 start------------------

	// 관련문서
	public List<DocInfo> getDocInfo(DocInfo docInfo);

	// 관련문서정보 제거
	public int deleteDocInfo(DocInfo docInfo);

	// 관련문서정보 생성
	public int registDocInfo(DocInfo docInfo);
	
	// ---------------tab3 start------------------

	// 기초자산정보 취득
	public List<RAA03BVO> getAssetInfo(RAA03BVO assetInfo);

	// 기초자산정보 생성
	public int registAssetInfo(RAA03BVO assetInfo);

}
