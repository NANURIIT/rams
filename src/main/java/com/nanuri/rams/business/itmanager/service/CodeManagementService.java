package com.nanuri.rams.business.itmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;

@Service
public interface CodeManagementService {

	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdNm);				// 그룹코드정보 리스트 가져오기

	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto);		// 코드정보 가져오기

	public void registGroupCodeInfo(GroupCodeInfoDto groupCodeInfoDto);					// 그룹코드정보 등록하기

	public void registCodeInfo(CodeInfoDto codeInfoDto);								// 코드정보 등록하기



	public List<String> getCommonCodeName();											// 조회할 코드구분(코드이름) 가져오기
}
