package com.nanuri.rams.business.assessment.as03.as03210;

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
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA02HMapper;
import com.nanuri.rams.business.common.mapper.RAA18BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03210ServiceImpl implements AS03210Service {

	private final RAA01BMapper raa01bMapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA02HMapper raa02hMapper;
	private final RAA91BMapper raa91bMapper;
	private final RAA18BMapper raa18bMapper;

	@Autowired
	private AuthenticationFacade facade;

	// ---------------search bar------------------

	/**
	 * deal info 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@Override
	public List<RAA01BVO> getDealInfo(DealInfo dealInfo) throws ParseException {

		String date = dealInfo.getDscDate();
		date = Utils.changeDateFormat(date, "yyyyMMdd");
		dealInfo.setDscDate(date);

		List<RAA01BVO> dealList = raa01bMapper.getDealInfo(dealInfo);

		return dealList;
	};

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@Override
	public List<RAA02BDTO> getDealList(DealInfo dealInfo) {
		return raa02bMapper.getDealList(dealInfo);
	}

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	@Override
	public RAA02BDTO getDealDetailInfo(String ibDealNo) {

		RAA02BDTO dealDeatail = raa02bMapper.copyDealInfO(ibDealNo);
		dealDeatail.setWrtDt(Utils.changeDateFormat(dealDeatail.getWrtDt(), "yyyy-MM-dd"));
		dealDeatail.setMtrtDt(Utils.changeDateFormat(dealDeatail.getMtrtDt(), "yyyy-MM-dd"));

		return dealDeatail;
	}

	// ---------------tab1 start------------------

	// 신규 deal 생성
	@Override
	public Map<String, Object> registDealInfo(RAA02BDTO paramData) throws ParseException {

		/*
		 * 1. DTO 의 계산 가능한 정보를 계산하여 RAA02BDTO를 setting 한다.
		 */

		Date dt = new Date();
		String yyyy = String.valueOf(dt.getYear() + 1900);
		String yyyymm = yyyy.concat(String.format("%02d", dt.getMonth() + 1));

		String wrtDt = paramData.getWrtDt();
		String mtrtDt = paramData.getMtrtDt();
		String ibDealNo = "";
		String raDealCcd = paramData.getRaDealCcd();
		String dprtCd = paramData.getDprtCd();

		// 최초등록자부점코드(FST_RGST_P_DPRT_CD)
		paramData.setFstRgstPDprtCd(facade.getDetails().getDprtCd());

		// 처리부점코드
		paramData.setHndlDprtCd(facade.getDetails().getDprtCd());

		// 처리자번호
		paramData.setHndlPEno(facade.getDetails().getEno());

		// RA기준년월(RA_STD_YR_MM)
		paramData.setRaStdYrMm(yyyymm.substring(2));

		// 투자기간일수(INVST_PRD_DY_C)

		SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat sf2 = new SimpleDateFormat("yyyyMMdd");

		Date df1 = sf1.parse(wrtDt); // 기표일
		Date df2 = sf1.parse(mtrtDt); // 만기일

		long diffSec = (df2.getTime() - df1.getTime()) / 1000; // 초 차이
		long diffDays = diffSec / (24 * 60 * 60); // 일자수 차이

		paramData.setInvstPrdDyC(String.valueOf(diffDays)); // 투자기간일수(INVST_PRD_DY_C)

		// WRT_DT (yyyy-mm-dd -> yyyymmdd)
		// MTRT_DT

		paramData.setWrtDt(Utils.changeDateFormat(wrtDt, "yyyyMMdd"));
		paramData.setMtrtDt(Utils.changeDateFormat(mtrtDt, "yyyyMMdd"));

		// RA_DEAL_SQ

		String raDealSq = raa02bMapper.getRaDealSq(raDealCcd, dprtCd);
		paramData.setRaDealSq(raDealSq);

		// IB_DEAL_NO
		// ibDealNo(12) = raDealCcd(1) + dprtCd(3) + yymm(4) + raDealSq(4)

		switch (raDealCcd) {
		case "1":
			ibDealNo = "D";
			break;
		case "2":
			ibDealNo = "E";
			break;
		default:
			ibDealNo = "W";
			break;
		}

		ibDealNo = ibDealNo + dprtCd + yyyymm.substring(2) + raDealSq;
		paramData.setIbDealNo(ibDealNo);

		/*
		 * 2. RAA01BDTO를 setting 한다.
		 */

		RAA01BDTO raa01bDTO = makeRAA01BDTO(paramData);

		/*
		 * 3. RAA02BDTO, RAA01BDTO를 insert 한다.
		 */

		raa02bMapper.insertDealInfo(paramData);
		raa01bMapper.insertDealInfo(raa01bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);

		return dealInfoMap;
	}

	private RAA01BDTO makeRAA01BDTO(RAA02BDTO paramData) {

		RAA01BDTO raa01bDTO = new RAA01BDTO();

		raa01bDTO.setIbDealNo(paramData.getIbDealNo()); // IBDEAL번호
		// IB_DEAL_SQ
		// DSC_DT
		// DSC_SQ
		// DSC_SQC
		raa01bDTO.setIbDealNm(paramData.getIbDealNm()); // IBDEAL명
		raa01bDTO.setIbDealPrgrsStCd(paramData.getInspctPrgrsStCd()); // IBDEAL상태코드
		// DSC_RSLT_CD
		raa01bDTO.setTlAmt(paramData.getCrncyAmt()); // 총금액
		raa01bDTO.setPtcpAmt(paramData.getPtcpAmt()); // 참여금액
		raa01bDTO.setTlErnAmt(paramData.getTlErnAmt()); // 총수익금액
		raa01bDTO.setWrtErnAmt(paramData.getWrtErnAmt()); // 기표수익금액
		raa01bDTO.setRcvblErnAmt(paramData.getRcvblErnAmt()); // 미수수익금액
		// ENTP_CD
		raa01bDTO.setEntpRnm(paramData.getCfmtEntpNm()); // 업체실명
		// CORP_RGST_NO
		// CRDT_GRD_CD
		raa01bDTO.setWrtDt(paramData.getWrtDt()); // 기표일자
		raa01bDTO.setMtrtDt(paramData.getMtrtDt()); // 만기일자
		raa01bDTO.setInvstNtnCd(paramData.getInvstNtnCd()); // 투자국가코드
		raa01bDTO.setInvstCrncyCd(paramData.getInvstCrncyCd()); // 투자통화코드
		raa01bDTO.setCrncyAmt(paramData.getCrncyAmt()); // 통화금액
		raa01bDTO.setInvstGdsLdvdCd(paramData.getInvstGdsLdvdCd()); // 투자상품대분류코드
		raa01bDTO.setInvstGdsMdvdCd(paramData.getInvstGdsMdvdCd()); // 투자상품중분류코드
		raa01bDTO.setInvstGdsSdvdCd(paramData.getInvstGdsSdvdCd()); // 투자상품소분류코드
		raa01bDTO.setInvstGdsDtlsDvdCd(paramData.getInvstGdsDtlsDvdCd()); // 투자상품상세분류코드
		// GDS_DVD_1_NM
		// GDS_DVD_2_NM
		// GDS_DVD_3_NM
		// GDS_DVD_4_NM
		raa01bDTO.setCoprtnTypCd(paramData.getCoprtnTypCd()); // 협업유형코드
		raa01bDTO.setHdqtCd(paramData.getHdqtCd()); // 본부코드
		raa01bDTO.setDprtCd(paramData.getDprtCd()); // 부점코드
		raa01bDTO.setChrgPEno(paramData.getChrgPEno()); // 담당자사번
		// WTHLD_TBL_NM
		// FNL_UPT_DY_TM
		// HNDL_DY_TM
		raa01bDTO.setDprtCd(facade.getDetails().getDprtCd()); // 처리부점코드
		raa01bDTO.setHndlPEno(facade.getDetails().getEno()); // 처리자사번

		return raa01bDTO;
	}

	// 히스토리 데이터 취득
	@Override
	public int registHistoy(Map<String, Object> dealInfoMap) {

		String ibDealNo = dealInfoMap.get("ibDealNo").toString();

		// 1. RAA02HDTO를 set 하여 insert 한다.
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo);

		return raa02hMapper.insertDealInfo(raa02bDTO);
	}

	// deal 정보 갱신
	@Override
	public Map<String, Object> updateDealInfo(RAA02BDTO paramData) throws ParseException {

		String ibDealNo = paramData.getIbDealNo();

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo);

		raa02bDTO.setRiskInspctCcd(paramData.getRiskInspctCcd()); // 리스크심사구분코드
		raa02bDTO.setLstCCaseCcd(paramData.getLstCCaseCcd()); // 부수안건
		raa02bDTO.setIbDealNm(paramData.getIbDealNm()); // 안건명
		raa02bDTO.setIbDealSnmNm(paramData.getIbDealSnmNm()); // 약어명
		raa02bDTO.setRaRsltnCcd(paramData.getRaRsltnCcd()); // 전결구분
		raa02bDTO.setRiskRcgNo(paramData.getRiskRcgNo()); // 리스크승인번호

		raa02bDTO.setInspctDprtCcd(paramData.getInspctDprtCcd()); // 심사부서구분
		raa02bDTO.setInvstGdsLdvdCd(paramData.getInvstGdsLdvdCd()); // 투자상품대분류
		raa02bDTO.setInvstGdsMdvdCd(paramData.getInvstGdsMdvdCd()); // 투자상품중분류
		raa02bDTO.setInvstGdsSdvdCd(paramData.getInvstGdsSdvdCd()); // 투자상품소분류
		raa02bDTO.setInvstGdsDtlsDvdCd(paramData.getInvstGdsDtlsDvdCd()); // 투자상품상세분류

		raa02bDTO.setInvstCrncyCd(paramData.getInvstCrncyCd()); // 부의기준통화
		raa02bDTO.setCrncyAmt(paramData.getCrncyAmt()); // 부의금액
		raa02bDTO.setInvstNtnCd(paramData.getInvstNtnCd()); // 투자국가
		raa02bDTO.setAplcExchR(paramData.getAplcExchR()); // 적용환율
		raa02bDTO.setPtcpAmt(paramData.getPtcpAmt()); // 부의금액(원)

		raa02bDTO.setIndTypDvdCd(paramData.getIndTypDvdCd()); // 고위험사업
		raa02bDTO.setCheckItemCd(paramData.getCheckItemCd()); // 업무구분
		raa02bDTO.setRaBsnsZoneCd(paramData.getRaBsnsZoneCd()); // 사업지역
		raa02bDTO.setInvstThingCcd(paramData.getInvstThingCcd()); // 주요투자물건
		raa02bDTO.setInvstThingDtlsCcd(paramData.getInvstThingDtlsCcd()); // 투자물건상세

		String wrtDt = paramData.getWrtDt();
		String mtrtDt = paramData.getMtrtDt();

		SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
		// SimpleDateFormat sf2 = new SimpleDateFormat("yyyyMMdd");

		Date df1 = sf1.parse(wrtDt); // 기표일
		Date df2 = sf1.parse(mtrtDt); // 만기일

		long diffSec = (df2.getTime() - df1.getTime()) / 1000; // 초 차이
		long diffDays = diffSec / (24 * 60 * 60); // 일자수 차이

		raa02bDTO.setInvstPrdDyC(String.valueOf(diffDays)); // 투자기간일수(INVST_PRD_DY_C)
		raa02bDTO.setInvstPrdMmC(paramData.getInvstPrdMmC()); // 투자기간개월수(INVST_PRD_MM_C)
		raa02bDTO.setWrtDt(Utils.changeDateFormat(wrtDt, "yyyyMMdd")); // WRT_DT (yyyy-mm-dd -> yyyymmdd)
		raa02bDTO.setMtrtDt(Utils.changeDateFormat(mtrtDt, "yyyyMMdd")); // MTRT_DT

		raa02bDTO.setTlErnAmt(paramData.getTlErnAmt()); // 전체수익
		raa02bDTO.setRcvblErnAmt(paramData.getRcvblErnAmt()); // 수수료수익
		raa02bDTO.setWrtErnAmt(paramData.getWrtErnAmt()); // 투자수익

		raa02bDTO.setMrtgOfrF(paramData.getMrtgOfrF()); // 담보
		raa02bDTO.setEnsrF(paramData.getEnsrF()); // 보증
		raa02bDTO.setRspsbCmplCcd(paramData.getRspsbCmplCcd()); // 책임준공

		raa02bDTO.setBsnsDprtCmmtRmrk1(paramData.getBsnsDprtCmmtRmrk1()); // 사업부의견
		raa02bDTO.setInspctDprtCmmtRmrk2(paramData.getInspctDprtCmmtRmrk2()); // 심사부의견

		raa02bDTO.setCoprtnTypCd(paramData.getCoprtnTypCd()); // 협업유형
		raa02bDTO.setCfmtEntpNm(paramData.getCfmtEntpNm()); // 업체명

		raa02bDTO.setHdqtCd(paramData.getHdqtCd()); // 담당본부코드
		raa02bDTO.setDprtCd(paramData.getDprtCd()); // 담당부서코드
		raa02bDTO.setChrgPEno(paramData.getChrgPEno()); // 담당직원번호

		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd()); // 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno()); // 처리자번호

		/*
		 * 2. RAA01BDTO를 setting 한다.
		 */

		RAA01BDTO raa01bDTO = makeRAA01BDTO(raa02bDTO);

		/*
		 * 3. RAA02BDTO, RAA01BDTO를 update 한다.
		 */

		raa02bMapper.updateDealInfo(raa02bDTO);
		raa01bMapper.updateDealInfo(raa01bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", paramData.getIbDealNo());

		return dealInfoMap;
	}

	// deal 심사요청
	@Override
	public Map<String, Object> assesmentRequest(String ibDealNo) {

		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo);

		raa02bDTO.setInspctPrgrsStCd("110"); // 심사진행상태코드
		raa02bDTO.setHndlDprtCd(facade.getDetails().getDprtCd()); // 처리부점코드
		raa02bDTO.setHndlPEno(facade.getDetails().getEno()); // 처리자번

		raa02bMapper.updateDealInfo(raa02bDTO);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);

		return dealInfoMap;
	}

	// ---------------tab2 start------------------

	// 관련문서
	@Override
	public List<Map<String, Object>> getDocInfo(DocInfo docInfo) {
		return raa18bMapper.getDocInfo(docInfo);
	};

	// 관련문서정보 제거
	@Override
	public void deleteDocInfo(DocInfo docInfo) {
		raa18bMapper.deleteDocInfo(docInfo);
	};

}
