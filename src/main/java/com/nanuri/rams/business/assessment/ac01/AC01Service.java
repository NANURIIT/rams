package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA90BDTO;
import com.nanuri.rams.business.common.dto.RAA91BDTO;
import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA93BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA95BDTO;
import com.nanuri.rams.business.common.vo.RAA90BVO;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO;
import com.nanuri.rams.business.common.vo.RAA95BVO;

@Service
public interface AC01Service {
	
	//============ start AC01010S(공통코드관리) ============//

	public List<RAA90BDTO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException;			// 그룹코드정보 리스트 가져오기

	public List<RAA91BDTO> getCodeInfoList(String cmnsCdGrp) throws ParseException;

	public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp);

	public List<RAA91BDTO> getCodeInfoList(RAA90BDTO groupCodeInfoDto); 						// 코드정보 가져오기

	public boolean registGroupCodeInfo(List<RAA90BVO.GroupCodeInfoSaveRequestVO> requestDtos); 					// 그룹코드정보 등록하기

	public boolean registCodeInfo(List<RAA90BVO.CodeInfoSaveRequestVO> vo); 							// 코드정보 등록하기

	public boolean deleteCodeInfo(RAA90BVO.CodeInfoDeleteRequestVO requestDto);

	public List<RAA90BVO.CommonCodeInfoVO> getCommonCodeName(); 												// 조회할 코드구분(코드이름) 가져오기
	
	//============ end AC01010S(공통코드관리) ============//
	
	

	/* 사용자관리 */
	public void insertUser(RAA92BDTO userManageDTO);                    								// 사용자 추가// 사용자 추가
    public List<RAA92BVO.selectVO> getUserList(RAA92BVO.selectVO userVo);            					// 사용자 목록 조회
    public void deleteUser(RAA92BDTO userManageDTO);                    								// 사용자 삭제(퇴사)
    
    public List<RAA94BDTO> selectAuthCode();                            							  	// 사용자관리 화면의 권한구분

	/* 메뉴별권한관리 */
	public List<RAA93BVO.MenuListVO> getMenuList(String menuNm);										// 메뉴별권한관리 메뉴명 조회
	public List<RAA94BDTO> getMenuByAuth();													// 권한별 메뉴화면 사용권한 조회
	public List<RAA95BDTO> getAvailableMenu(Map<String, String> menuId);								// RAA95B 수정 조회 가능 여부 조회
	public boolean registUseMenu(ArrayList<RAA95BVO.selectUseMenuVO> dtoList);													// RAA95B 수정 조회 가능 여부 저장
	
	//============ start AC01210S(권한별 메뉴관리) ============//
	
	public List<RAA94BDTO> getAuthCode(String rghtCdNm) throws ParseException;
	
	public List<RAA93BVO> getAuthCodeMenu(String rgCdNm);
	
	public boolean registerAuthCode(List<RAA94BDTO> requestDtos);
	
	public boolean deleteAuthCode(List<String> rghtCd);
	
	public boolean registerAuthCodeMenu(List<RAA95BVO.menuUpdateRequestVO> voList);
	
	//============ end AC01210S(권한별 메뉴관리) ============//
	
	// =========== Start AC01410S( 메뉴관리) ============//

	public List<RAA93BDTO> selectHighMenuList(String menuNm);

	// ============ End AC01410S( 메뉴관리 ) ============//
}


