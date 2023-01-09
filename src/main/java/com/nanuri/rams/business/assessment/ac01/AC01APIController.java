package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA90BDTO;
import com.nanuri.rams.business.common.dto.RAA91BDTO;
import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA93BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA95BDTO;
import com.nanuri.rams.business.common.vo.RAA90BVO;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.RAA93BVO.SubMenuVo;
import com.nanuri.rams.business.common.vo.RAA95BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01APIController {

	private final AC01Service ac01Service;

	// ============ start AC01010S(공통코드관리) ============//
	// 그룹코드정보 리스트 가져오기
	@GetMapping(value = "/groupCodeInfoList")
	public List<RAA90BDTO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
		return ac01Service.getGroupCodeInfoList(cmnsCdGrp);
	}

	@GetMapping(value = "/groupCodeInfo")
	public List<RAA91BDTO> getGroupCodeInfo(String cmnsCdGrp) throws ParseException {
		return ac01Service.getCodeInfoList(cmnsCdGrp);
	}

	@PatchMapping(value = "/deleteGroupCodeInfo")
	public boolean deleteGroupCodeInfo(@RequestBody List<String> cmnsCdGrp) {
		return ac01Service.deleteGroupCodeInfo(cmnsCdGrp);
	}

	@PatchMapping(value = "/deleteCodeInfo")
	public boolean deleteCodeInfo(@RequestBody RAA90BVO.CodeInfoDeleteRequestVO requestDto) {
		// log.debug("requestDto : {}", requestDto);
		return ac01Service.deleteCodeInfo(requestDto);
	}

	@GetMapping(value = "/commonCodeInfo")
	public List<RAA90BVO.CommonCodeInfoVO> getCommonCodeInfo() {
		return ac01Service.getCommonCodeName();
	}

	// 코드정보 가져오기
	@GetMapping(value = "/codeInfoList")
	public List<RAA91BDTO> getCodeInfoList(RAA90BDTO groupCodeInfoDto) {
		return ac01Service.getCodeInfoList(groupCodeInfoDto);
	}

	// 그룹코드정보 등록하기
	@PostMapping(value = "/registGroupCodeInfo")
	public boolean registGroupCodeInfo(@RequestBody List<RAA90BVO.GroupCodeInfoSaveRequestVO> requestDtos) {
		return ac01Service.registGroupCodeInfo(requestDtos);
	}

	// 코드정보 등록하기
	@PostMapping(value = "/registCodeInfo")
	public boolean registCodeInfo(@RequestBody List<RAA90BVO.CodeInfoSaveRequestVO> requestDtos) {
		return ac01Service.registCodeInfo(requestDtos);
	}
	// ============ end AC01010S(공통코드관리) ============//

	// ============ Start AC01110S( 사용자 관리 ) ============//

	/* 사용자 권한 추가 */
	@PostMapping(value = "/insertUser")
	public void insertUser(@RequestBody RAA92BDTO userManageDTO) {
		ac01Service.insertUser(userManageDTO);
	};

	/* 사용자 목록조회 */
	@GetMapping(value = "/getUserList")
	public List<RAA92BVO.selectVO> getUserList(RAA92BVO.selectVO userVo) {
		return ac01Service.getUserList(userVo);
	}

	/* 사용자 삭제(퇴사) */
	@PatchMapping(value = "/deleteUser")
	public void deleteUser(@RequestBody RAA92BDTO userManageDTO) {
		ac01Service.deleteUser(userManageDTO);
	}

	/* 사용자관리화면 권한구분 */
	@GetMapping(value = "/selectAuthCode")
	public List<RAA94BDTO> selectAuthCode() {
		return ac01Service.selectAuthCode();
	}

	// ============ End AC01110S( 사용자 관리 ) ============//

	// ============ start AC01210S(권한별 메뉴관리) ============//
	@GetMapping(value = "/getAuthCode")
	public List<RAA94BDTO> getAuthCode(String rghtCdNm) throws ParseException {
		return ac01Service.getAuthCode(rghtCdNm);
	}

	@GetMapping(value = "/getAuthCodeMenu")
	public List<RAA93BVO> getAuthCodeMenu(String rghtCd) {
		return ac01Service.getAuthCodeMenu(rghtCd);
	}

	@PostMapping(value = "/registerAuthCode")
	public boolean registerAuthCode(@RequestBody List<RAA94BDTO> requestDtos) {
		return ac01Service.registerAuthCode(requestDtos);
	}

	@PatchMapping(value = "/deleteAuthCode")
	public boolean deleteAuthCode(@RequestBody List<String> rghtCd) {
		return ac01Service.deleteAuthCode(rghtCd);
	}

	@PostMapping(value = "/registerAuthCodeMenu")
	public boolean registerAuthCodeMenu(@RequestBody List<RAA95BVO.menuUpdateRequestVO> voList) {
		return ac01Service.registerAuthCodeMenu(voList);
	}
	// ============ end AC01210S(권한별 메뉴관리) ============//

	// ============ Start AC01310S( 메뉴별권한관리 관리 ) ============//

	/* 메뉴명 조회 */
	@GetMapping(value = "/findMenu")
	public List<RAA93BVO.MenuListVO> getMethodName(String menuNm) {
		return ac01Service.getMenuList(menuNm);
	}

	/* 권한별 메뉴화면 사용권한 조회 */
	@GetMapping(value="/menuByAuth")
	public List<RAA94BDTO> menuByAuth() {
		return ac01Service.getMenuByAuth();
	}

	/* RAA95B 수정 조회 가능 여부 조회 */
	@GetMapping(value="/checkAvailableMenu")
	public List<RAA95BDTO> getAvailableMenu(@RequestParam Map<String, String> menuId) {
		return ac01Service.getAvailableMenu(menuId);
	}

	/* RAA95B 조회, 수정 가능 여부 저장 */
	@PatchMapping(value="/saveUseMenu")
	public boolean registUseMenu(@RequestBody ArrayList<RAA95BVO.selectUseMenuVO> dtoList) {
		return ac01Service.registUseMenu(dtoList);
	}

	//============ End AC01310S( 메뉴별권한관리 관리 ) ============//

	// =========== Start AC01410S( 메뉴관리) ============//
	// 그룹코드정보 리스트 가져오기
	@GetMapping(value = "/mainMenuList")
	public List<MainMenuVo> selectMainMenuList(@RequestParam String menuNm){ 
		return ac01Service.selectMainMenuList(menuNm);
	}
	
	@GetMapping(value = "/mainMenuInfo")
	public List<RAA93BDTO> selectSubMenuList(@RequestParam String menuId){ 
		return ac01Service.selectSubMenuList(menuId);
	}
	
	@PatchMapping(value = "/deleteMainMenuInfo")
	public boolean deleteMainMenuInfo(@RequestBody List<String> menuId) {
		return ac01Service.deleteMainMenuInfo(menuId);
	}
	
	@PatchMapping(value = "/deleteSubMenuInfo")
	public boolean deleteSubMenuInfo(@RequestBody List<String> menuId) {
		return ac01Service.deleteSubMenuInfo(menuId);
	}
	
	// 상위메뉴 정보 등록하기
	@PostMapping(value = "/registMainMenuInfo")
	public boolean registMainMenuInfo(@RequestBody List<MainMenuVo> requestDtos) {
		return ac01Service.registMainMenuInfo(requestDtos);
	}
	
	@PostMapping(value = "/registSubMenuInfo")
	public boolean registSubMenuInfo(@RequestBody List<SubMenuVo> requestDtos) {
		return ac01Service.registSubMenuInfo(requestDtos);
	}
	
	
	// ============ End AC01410S( 메뉴관리 ) ============//
	
	
	
	
	
	
}
