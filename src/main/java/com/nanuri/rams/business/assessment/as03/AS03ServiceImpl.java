package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctc.wstx.util.StringUtil;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA18BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03ServiceImpl implements AS03Service {

	private final RAA01BMapper raa01bMapper;
	private final RAA91BMapper raa91bMapper;
	private final RAA18BMapper raa18bMapper;

	/**
	 * 딜목록 조회
	 * 
	 * @param raa02bDto
	 * @return
	 * @throws ParseException
	 */
	@Override
	public List<RAA01BVO> getDealInfo(DealInfo dealInfo) throws ParseException {

		SimpleDateFormat newFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

		String date = dealInfo.getDscDate();
		if (!StringUtil.isAllWhitespace(date)) {
			Date formatDate = dateFormat.parse(date);
			dealInfo.setDscDate(newFormat.format(formatDate));
		}

		List<RAA01BVO> dealList = raa01bMapper.getDealInfo(dealInfo);

		return dealList;
	};

	// 리스크심사구분코드
	@Override
	public List<Map<String, Object>> getRiskInspctCcd() {
		return raa91bMapper.getRiskInspctCcd();
	};

	// 부수안건구분코드
	@Override
	public List<Map<String, Object>> getlstCCaseCcd() {
		return raa91bMapper.getlstCCaseCcd();
	};

	// 심사부서구분코드
	@Override
	public List<Map<String, Object>> getInspctDprtCcd() {
		return raa91bMapper.getInspctDprtCcd();
	};

	// 투자상품대분류코드
	@Override
	public List<Map<String, Object>> getInvstGdsLdvdCd() {
		return raa91bMapper.getInvstGdsLdvdCd();
	};

	// 투자상품중분류코드
	@Override
	public List<Map<String, Object>> getInvstGdsMdvdCd() {
		return raa91bMapper.getInvstGdsMdvdCd();
	};

	// 투자상품소분류코드
	@Override
	public List<Map<String, Object>> getInvstGdsSdvdCd() {
		return raa91bMapper.getInvstGdsSdvdCd();
	};

	// 투자상품상세분류코드
	@Override
	public List<Map<String, Object>> getInvstGdsDtlsDvdCd() {
		return raa91bMapper.getInvstGdsDtlsDvdCd();
	};
	
	// 부의기준통화
	@Override
	public List<Map<String, Object>> getInvstCrncyCd() {
		return raa91bMapper.getInvstCrncyCd();
	};
	
	// 협업유형코드
	@Override
	public List<Map<String, Object>> getCoprtnTypCd() {
		return raa91bMapper.getCoprtnTypCd();
	};

	// 관련문서
	@Override
	public List<Map<String, Object>> getDocInfo(DocInfo docInfo) {
		return raa18bMapper.getDocInfo(docInfo);
	};
	
	// 관련문서정보 제거
	@Override
	public int deleteDocInfo(DocInfo docInfo) {
		return raa18bMapper.deleteDocInfo(docInfo);
	};
	
	// 기초자산종류
	@Override
	public List<Map<String, Object>> getBscAstsKndCd() {
		return raa91bMapper.getBscAstsKndCd();
	};

}
