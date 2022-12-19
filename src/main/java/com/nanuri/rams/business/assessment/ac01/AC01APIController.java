package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.util.List;

import com.nanuri.rams.business.itmanager.dto.*;
import org.springframework.web.bind.annotation.*;

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

}
