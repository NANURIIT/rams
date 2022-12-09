package com.nanuri.rams.business.itmanager.controller;

import java.text.ParseException;
import java.util.List;

import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;
import com.nanuri.rams.business.itmanager.service.CodeManagementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class CodeManagementAPIController {

	private final CodeManagementService codeManagementService;

	// 그룹코드정보 리스트 가져오기
	@GetMapping(value = "/groupCodeInfoList")
	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
		return codeManagementService.getGroupCodeInfoList(cmnsCdGrp);
	}

	@GetMapping(value = "/groupCodeInfo")
	public List<CodeInfoDto> getGroupCodeInfo(String cmnsCdGrp) throws ParseException {
		return codeManagementService.getCodeInfoList(cmnsCdGrp);
	}

	@GetMapping(value = "/commonCodeInfo")
	public List<CommonCodeInfoDto> getCommonCodeInfo() {
		return codeManagementService.getCommonCodeName();
	}

	// 코드정보 가져오기
	@GetMapping(value = "/codeInfoList")
	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
		return codeManagementService.getCodeInfoList(groupCodeInfoDto);
	}

	// 그룹코드정보 등록하기
	@PostMapping(value = "/registGroupCodeInfo")
	public void registGroupCodeInfo(GroupCodeInfoDto groupCodeInfoDto) {
		codeManagementService.registGroupCodeInfo(groupCodeInfoDto);
	}

	// 코드정보 등록하기
	@PostMapping(value = "/registCodeInfo")
	public void registCodeInfo(CodeInfoDto codeInfoDto) {
		codeManagementService.registCodeInfo(codeInfoDto);
	}

}
