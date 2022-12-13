package com.nanuri.rams.business.itmanager.service;

import java.text.ParseException;
import java.util.List;

import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoSaveRequestDto;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;

@Service
public interface CodeManagementService {

	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException;				// 그룹코드정보 리스트 가져오기

	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException;
	public boolean deleteCodeInfo(List<String> cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto);		// 코드정보 가져오기

	public boolean registGroupCodeInfo(List<GroupCodeInfoSaveRequestDto> requestDtos);					// 그룹코드정보 등록하기

	public void registCodeInfo(CodeInfoDto codeInfoDto);								// 코드정보 등록하기



	public List<CommonCodeInfoDto> getCommonCodeName();											// 조회할 코드구분(코드이름) 가져오기
}
