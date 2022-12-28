package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.com.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA18BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;

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

	@Autowired
	private AuthenticationFacade facade;

	// ---------------search bar------------------

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

	// ---------------tab1 start------------------

	// 담당직원 - 로그인유저정보
	@Override
	public Map<String, Object> getUserAuth() {
		Map<String, Object> user = new HashMap<String, Object>();

		user.put("eno", facade.getDetails().getEno());
		user.put("empNm", facade.getDetails().getEmpNm());
		user.put("dprtCd", facade.getDetails().getDprtCd());
		user.put("dprtNm", facade.getDetails().getDprtNm());
		user.put("HdqtCd", facade.getDetails().getHdqtCd());
		user.put("HdqtNm", facade.getDetails().getHdqtNm());

		return user;
	}

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

	// 투자국가
	@Override
	public List<Map<String, Object>> getCntyCd() {
		return raa91bMapper.getCntyCd();
	};

	// 고위험사업
	@Override
	public List<Map<String, Object>> getIndTypDvdCd() {
		return raa91bMapper.getIndTypDvdCd();
	};

	// 업무구분
	@Override
	public List<Map<String, Object>> getCheckItemCd() {
		return raa91bMapper.getCheckItemCd();
	};

	// 사업지역
	@Override
	public List<Map<String, Object>> getBsnsAreaCd() {
		return raa91bMapper.getBsnsAreaCd();
	};

	// 주요투자물건
	@Override
	public List<Map<String, Object>> getInvstThingCcd() {
		return raa91bMapper.getInvstThingCcd();
	};

	// 주요투자물건상세
	@Override
	public List<Map<String, Object>> getInvstThingDtlsCcd() {
		return raa91bMapper.getInvstThingDtlsCcd();
	};

	// 책임준공
	@Override
	public List<Map<String, Object>> getRspsbCmplCcd() {
		return raa91bMapper.getRspsbCmplCcd();
	};

	// 전결구분
	@Override
	public List<Map<String, Object>> getRaRsltnCcd() {
		return raa91bMapper.getRaRsltnCcd();
	};

	// 협업유형코드
	@Override
	public List<Map<String, Object>> getCoprtnTypCd() {
		return raa91bMapper.getCoprtnTypCd();
	};

	// ---------------tab2 start------------------

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

	// ---------------tab3 start------------------

	// 기초자산종류
	@Override
	public List<Map<String, Object>> getBscAstsKndCd() {
		return raa91bMapper.getBscAstsKndCd();
	};

	// ---------------tab4 start------------------

	// 법인형태
	@Override
	public List<Map<String, Object>> getCncCmpnyClsfCd() {
		return raa91bMapper.getCncCmpnyClsfCd();
	};

	// ---------------tab6 start------------------

	// 담보유형
	@Override
	public List<Map<String, Object>> getMrtgKndCcd() {
		return raa91bMapper.getMrtgKndCcd();
	};

	// 담보상세
	@Override
	public List<Map<String, Object>> getMrtgDtlsCcd() {
		return raa91bMapper.getMrtgDtlsCcd();
	};

	// 권리순위
	@Override
	public List<Map<String, Object>> getRgtRnkCcd() {
		return raa91bMapper.getRgtRnkCcd();
	};

	// ---------------tab8 start------------------

	// 미이행시의무
	@Override
	public List<Map<String, Object>> getDbtNpFrmOblgCcd() {
		return raa91bMapper.getDbtNpFrmOblgCcd();
	}

}
