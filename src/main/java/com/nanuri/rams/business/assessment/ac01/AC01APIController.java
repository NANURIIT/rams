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

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA95BDTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO;
import com.nanuri.rams.business.common.vo.RAA94BVO;
import com.nanuri.rams.business.common.vo.RAA95BVO;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDeleteRequestDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoSaveRequestDto;
import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoSaveRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;




@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01APIController {

	private final AC01Service AC01Service;

	// 그룹코드정보 리스트 가져오기
	@GetMapping(value = "/groupCodeInfoList")
	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
		return AC01Service.getGroupCodeInfoList(cmnsCdGrp);
	}

	@GetMapping(value = "/groupCodeInfo")
	public List<CodeInfoDto> getGroupCodeInfo(String cmnsCdGrp) throws ParseException {
		return AC01Service.getCodeInfoList(cmnsCdGrp);
	}

	@PatchMapping(value = "/deleteGroupCodeInfo")
	public boolean deleteGroupCodeInfo(@RequestBody List<String> cmnsCdGrp) {
		return AC01Service.deleteGroupCodeInfo(cmnsCdGrp);
	}

	@PatchMapping(value = "/deleteCodeInfo")
	public boolean deleteCodeInfo(@RequestBody CodeInfoDeleteRequestDto requestDto) {
		//log.debug("requestDto : {}", requestDto);
		return AC01Service.deleteCodeInfo(requestDto);
	}

	@GetMapping(value = "/commonCodeInfo")
	public List<CommonCodeInfoDto> getCommonCodeInfo() {
		return AC01Service.getCommonCodeName();
	}

	// 코드정보 가져오기
	@GetMapping(value = "/codeInfoList")
	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
		return AC01Service.getCodeInfoList(groupCodeInfoDto);
	}

	// 그룹코드정보 등록하기
	@PostMapping(value = "/registGroupCodeInfo")
	public boolean registGroupCodeInfo(@RequestBody List<GroupCodeInfoSaveRequestDto> requestDtos) {
		//log.debug("requestDtos : {}", requestDtos);
		return AC01Service.registGroupCodeInfo(requestDtos);
	}

	// 코드정보 등록하기
	@PostMapping(value = "/registCodeInfo")
	public boolean registCodeInfo(@RequestBody List<CodeInfoSaveRequestDto> requestDtos) {
		//log.debug("requestDtos : {}", requestDtos);
		return AC01Service.registCodeInfo(requestDtos);
	}

	//============ Start AC01110S( 사용자 관리 ) ============//
	
	/* 사용자 권한 추가 */
    @PostMapping(value="/insertUser")
    public void insertUser(@RequestBody RAA92BDTO userManageDTO) {
        AC01Service.insertUser(userManageDTO);
    };

    /* 사용자 목록조회 */
    @GetMapping(value="/getUserList")
    public List<RAA92BVO.selectVO> getUserList(RAA92BVO.selectVO userVo ) {
        return AC01Service.getUserList(userVo);
    }
    
    /* 사용자 삭제(퇴사) */
    @PatchMapping(value = "/deleteUser")
	public void deleteUser(@RequestBody RAA92BDTO userManageDTO) {
		AC01Service.deleteUser(userManageDTO);
	}

    /* 사용자관리화면 권한구분 */
    @GetMapping(value="/selectAuthCode")
    public List<RAA94BDTO> selectAuthCode() {
        return AC01Service.selectAuthCode();
    }

	//============ End AC01110S( 사용자 관리 ) ============//

	//============ Start AC01310S( 메뉴별권한관리 관리 ) ============//

	/* 메뉴명 조회 */
	@GetMapping(value="/findMenu")
	public List<RAA93BVO.MenuListVO> getMethodName(String menuNm) {
		return AC01Service.getMenuList(menuNm);
	}
	
	/* 권한별 메뉴화면 사용권한 조회 */
	@GetMapping(value="/menuByAuth")
	public List<RAA94BVO.MenuByAuthVO> menuByAuth() {
		return AC01Service.getMenuByAuth();
	}

	/* RAA95B 수정 조회 가능 여부 조회 */
	@GetMapping(value="/checkAvailableMenu")
	public List<RAA95BDTO> getAvailableMenu(@RequestParam Map<String, String> menuId) {
		return AC01Service.getAvailableMenu(menuId);
	}

	/* RAA95B 조회, 수정 가능 여부 저장 */
	@PatchMapping(value="/saveUseMenu")
	public boolean registUseMenu(@RequestBody ArrayList<RAA95BVO.selectUseMenuVO> dtoList) {
		return AC01Service.registUseMenu(dtoList);
	}
	
	
	

	//============ End AC01310S( 메뉴별권한관리 관리 ) ============//

}
