package com.nanuri.rams.business.assessment.as03.as03210;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
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
public class AS03210APIController {

	private final AS03210Service as03210Service;

	// ---------------search bar------------------

	/**
	 * deal info 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@GetMapping(value = "/getDealInfo")
	public List<RAA01BVO> getDealInfo(DealInfo dealDto) throws ParseException {
		return as03210Service.getDealInfo(dealDto);
	}

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@GetMapping(value = "/getDealList")
	public List<RAA02BDTO> getDealList(DealInfo dealDto) throws ParseException {
		return as03210Service.getDealList(dealDto);
	}

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	@GetMapping(value = "/getDealDetailInfo")
	public RAA02BDTO getDealDetailInfo(String ibDealNo) {
		return as03210Service.getDealDetailInfo(ibDealNo);
	}

	// deal 심사요청
	@Transactional
	@PostMapping(value = "/assesmentRequest")
	public int assesmentRequest(String ibDealNo) {

		Map<String, Object> dealInfoMap = as03210Service.assesmentRequest(ibDealNo);

		return as03210Service.registHistoy(dealInfoMap);
	}
	
	// deal 심사요청취소
	@Transactional
	@PostMapping(value = "/assesmentRequestCancel")
	public int assesmentRequestCancel(String ibDealNo) {

		Map<String, Object> dealInfoMap = as03210Service.assesmentRequestCancel(ibDealNo);

		return as03210Service.registHistoy(dealInfoMap);
	}

	// ---------------tab1 start------------------

	// 신규 deal 생성
	@Transactional
	@PostMapping(value = "/registDealInfo")
	public int registDealInfo(RAA02BDTO paramData) throws ParseException {

		Map<String, Object> dealInfoMap = as03210Service.registDealInfo(paramData);

		return as03210Service.registHistoy(dealInfoMap);
	}

	// deal 정보 갱신
	@Transactional
	@PostMapping(value = "/updateDealInfo")
	public int updateDealInfo(RAA02BDTO paramData) throws ParseException {

		Map<String, Object> dealInfoMap = as03210Service.updateDealInfo(paramData);

		return as03210Service.registHistoy(dealInfoMap);
	}

	// ---------------tab2 start------------------

	// 관련문서
	@GetMapping(value = "/getDocInfo")
	public List<DocInfo> getDocInfo(DocInfo docInfo) {
		return as03210Service.getDocInfo(docInfo);
	}

	// 관련문서정보 제거
	@PostMapping(value = "/deleteDocInfo")
	public void deleteDocInfo(DocInfo docInfo) {
		as03210Service.deleteDocInfo(docInfo);
	}

}
