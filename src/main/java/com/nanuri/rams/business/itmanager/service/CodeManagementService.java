package com.nanuri.rams.business.itmanager.service;

import java.text.ParseException;
import java.util.List;

import com.nanuri.rams.business.itmanager.dto.*;
import org.springframework.stereotype.Service;

@Service
public interface CodeManagementService {

	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException;			// 그룹코드정보 리스트 가져오기

	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException;

	public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto); 						// 코드정보 가져오기

	public boolean registGroupCodeInfo(List<GroupCodeInfoSaveRequestDto> requestDtos); 					// 그룹코드정보 등록하기

	public boolean registCodeInfo(List<CodeInfoSaveRequestDto> requestDtos); 							// 코드정보 등록하기

	public boolean deleteCodeInfo(CodeInfoDeleteRequestDto requestDto);

	public List<CommonCodeInfoDto> getCommonCodeName(); 												// 조회할 코드구분(코드이름) 가져오기
}
