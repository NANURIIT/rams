package com.nanuri.rams.business.itmanager.mapper;

import java.util.List;
import java.util.Optional;

import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoSaveRequestDto;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;

@Mapper
public interface CodeManagementMapper {
	
	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp);				// 그룹코드정보 리스트 가져오기
	public Optional<GroupCodeInfoDto> getGroupCodeInfo(String cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto);		// 코드정보 가져오기

	public int registGroupCodeInfo(GroupCodeInfoSaveRequestDto requestDto);					// 그룹코드정보 등록하기

	public void registCodeInfo(CodeInfoDto codeInfoDto);								// 코드정보 등록하기

	public List<CommonCodeInfoDto> getCommonCodeName();

	public int selectTotalCount();											// 조회할 코드구분(코드이름) 가져오기
}
