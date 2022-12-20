package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;
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

	/* 사용자 권한 추가 */
    @PostMapping(value="/insertUser")
    public void insertUser(@RequestBody RAA92BDTO userManageDTO) {
        AC01Service.insertUser(userManageDTO);
    };

    /* 사용자 목록조회 */
    @GetMapping(value="/getUserList")
    public List<RAA92BVO> getUserList(RAA92BVO userVo ) {
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

}
