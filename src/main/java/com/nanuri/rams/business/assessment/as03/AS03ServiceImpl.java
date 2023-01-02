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

import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA02HDTO;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA02HMapper;
import com.nanuri.rams.business.common.mapper.RAA18BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.StringUtil;
import com.nanuri.rams.com.utils.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03ServiceImpl implements AS03Service {

	private final RAA01BMapper raa01bMapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA02HMapper raa02hMapper;
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

		String date = dealInfo.getDscDate();
		date = Utils.changeDateFormat(date,"yyyyMMdd");
		dealInfo.setDscDate(date);

		List<RAA01BVO> dealList = raa01bMapper.getDealInfo(dealInfo);

		return dealList;
	};
	
	// RADEAL구분코드
	@Override
	public List<Map<String, Object>> getRaDealCcd() {
		return raa91bMapper.getRaDealCcd();
	}

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
	public Map<String, Object> registDealInfo(RAA02BDTO paramData) throws ParseException {

		/*
		 * 1. DTO 의 계산 가능한 정보를 계산하여 RAA02BDTO를 setting 한다.
		 */

		Date dt = new Date();
		String yyyy = String.valueOf(dt.getYear() + 1900);
		String yyyymm = yyyy.concat(String.valueOf(dt.getMonth() + 1));

		String wrtDt = paramData.getWrtDt();
		String mtrtDt = paramData.getMtrtDt();
		String ibDealNo = "";
		String raDealCcd = paramData.getRaDealCcd();
		String dprtCd = paramData.getDprtCd();

		// 최초등록자부점코드(FST_RGST_P_DPRT_CD)
		paramData.setFstRgstPDprtCd(facade.getDetails().getDprtCd());

		// RA기준년월(RA_STD_YR_MM)

		paramData.setRaStdYrMm(yyyymm.substring(2));

		// 투자기간일수(INVST_PRD_DY_C)

		SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sf2 = new SimpleDateFormat("yyyyMMdd");

		Date df1 = sf1.parse(wrtDt);	// 기표일
		Date df2 = sf1.parse(mtrtDt);	// 만기일

		long diffSec = (df2.getTime() - df1.getTime()) / 1000;							// 초 차이
		long diffDays = diffSec / (24 * 60 * 60); 										// 일자수 차이

		paramData.setInvstPrdDyC(String.valueOf(diffDays));								// 투자기간일수(INVST_PRD_DY_C)

		// WRT_DT (yyyy-mm-dd -> yyyymmdd)
		// MTRT_DT
		
		paramData.setWrtDt(sf2.format(df1));
		paramData.setMtrtDt(sf2.format(df2));
		
		// RA_DEAL_SQ
		
		String raDealSq = raa02bMapper.getRaDealSq(raDealCcd, dprtCd);
		paramData.setRaDealSq(raDealSq);
		
		// IB_DEAL_NO
		// ibDealNo(12) = ibDealNo(1) + dprtCd(3) + yymm(4) + raDealSq(4)
		
		switch (raDealCcd) {
		case "1": ibDealNo = "D";
			break;
		case "2": ibDealNo = "E";
			break;
		default: ibDealNo = "W";
			break;
		}
		
		ibDealNo = ibDealNo + dprtCd + yyyymm.substring(2) + raDealSq;
		paramData.setIbDealNo(ibDealNo);

		/*
		 * 2. RAA01BDTO를 setting 한다.
		 */
		
		RAA01BDTO raa01bDTO = new RAA01BDTO();

		raa01bDTO.setIbDealNo(paramData.getIbDealNo());									// IBDEAL번호
		// IB_DEAL_SQ
		// DSC_DT
		// DSC_SQ
		// DSC_SQC
		raa01bDTO.setIbDealNm(paramData.getIbDealNm());									// IBDEAL명
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
		//raa01bDTO.setWrtDt(paramData.getWrtDt());										// 기표일자
		//raa01bDTO.setMtrtDt(paramData.getMtrtDt());										// 만기일자
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

		raa02bMapper.insertDealInfo(paramData);
		raa01bMapper.insertDealInfo(raa01bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);

		return dealInfoMap;
	}

	// 히스토리 데이터 취득
	@Override
	public void registHistoy(Map<String, Object> dealInfoMap) {

		String ibDealNo = dealInfoMap.get("ibDealNo").toString();

		// 1. RAA02HDTO를 set 하여 insert 한다.
		RAA02HDTO raa02hDTO = raa02bMapper.copyDealInfO(ibDealNo);

		raa02hMapper.insertDealInfo(raa02hDTO);

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
