package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA18BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.StringUtil;

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

	// 신규 deal 생성
	@Override
	public int registDealInfo(RAA02BDTO paramData) throws ParseException {

		/*
		 * 1. DTO 의 계산 가능한 정보를 계산하여 RAA02BDTO를 setting 한다.
		 */

		// IBDEAL번호

		// 심사진행상태코드(INSPCT_PRGRS_ST_CD)
		switch (paramData.getRaRsltnCcd()) {
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
			break;
		case "1":
			paramData.setInspctPrgrsStCd("100");
			break;
		}

		// 투자기간일수(INVST_PRD_DY_C)
		Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(paramData.getWrtDt());	// 기표일
		Date date2 = new SimpleDateFormat("yyyy-MM-dd").parse(paramData.getMtrtDt());	// 만기일

		long diffSec = (date2.getTime() - date1.getTime()) / 1000;						// 초 차이
		long diffDays = diffSec / (24 * 60 * 60); 										// 일자수 차이

		paramData.setInvstPrdDyC(String.valueOf(diffDays));								// 투자기간일수(INVST_PRD_DY_C)

		/*
		 * 2. RAA01BDTO를 setting 한다.
		 */
		
		RAA01BDTO raa01bDTO = new RAA01BDTO();

		// IB_DEAL_NO
		// IB_DEAL_SQ
		// DSC_DT
		// DSC_SQ
		// DSC_SQC
		raa01bDTO.setIbDealNm(paramData.getIbDealNo());									// IBDEAL명
		raa01bDTO.setIbDealPrgrsStCd(paramData.getInspctPrgrsStCd());					// IBDEAL상태코드
		// DSC_RSLT_CD
		raa01bDTO.setTlAmt(paramData.getCrncyAmt());									// 총금액
		raa01bDTO.setPtcpAmt(paramData.getPtcpAmt());									// 참여금액
		raa01bDTO.setTlErnAmt(paramData.getTlErnAmt());									// 총수익금액
		raa01bDTO.setWrtErnAmt(paramData.getWrtErnAmt());								// 기표수익금액
		raa01bDTO.setRcvblErnAmt(paramData.getRcvblErnAmt());							// 미수수익금액
		// ENTP_CD
		raa01bDTO.setEntpRnm(paramData.getCfmtEntpNm());								// 업체실명
		// CORP_RGST_NO
		// CRDT_GRD_CD
		raa01bDTO.setWrtDt(paramData.getWrtDt());										// 기표일자
		raa01bDTO.setMtrtDt(paramData.getMtrtDt());										// 만기일자
		raa01bDTO.setInvstNtnCd(paramData.getInvstNtnCd());								// 투자국가코드
		raa01bDTO.setInvstCrncyCd(paramData.getInvstCrncyCd());							// 투자통화코드
		raa01bDTO.setCrncyAmt(paramData.getCrncyAmt());									// 통화금액
		raa01bDTO.setInvstGdsLdvdCd(paramData.getInvstGdsLdvdCd());						// 투자상품대분류코드
		raa01bDTO.setInvstGdsMdvdCd(paramData.getInvstGdsMdvdCd());						// 투자상품중분류코드
		raa01bDTO.setInvstGdsSdvdCd(paramData.getInvstGdsSdvdCd());						// 투자상품소분류코드
		raa01bDTO.setInvstGdsDtlsDvdCd(paramData.getInvstGdsDtlsDvdCd());				// 투자상품상세분류코드
		// GDS_DVD_1_NM
		// GDS_DVD_2_NM
		// GDS_DVD_3_NM
		// GDS_DVD_4_NM
		raa01bDTO.setCoprtnTypCd(paramData.getCoprtnTypCd());							// 협업유형코드
		raa01bDTO.setHdqtCd(paramData.getHdqtCd());										// 본부코드
		raa01bDTO.setDprtCd(paramData.getDprtCd());										// 부점코드
		raa01bDTO.setChrgPEno(paramData.getChrgPEno());									// 담당자사번
		// WTHLD_TBL_NM
		// FNL_UPT_DY_TM
		// HNDL_DY_TM
		raa01bDTO.setDprtCd(facade.getDetails().getDprtCd());							// 처리부점코드
		raa01bDTO.setHndlPEno(facade.getDetails().getEno());							// 처리자사번
		
		/*
		 * 3. RAA02BDTO, RAA01BDTO를 insert 한다.
		 */
		
		
		return 0;
	}

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
