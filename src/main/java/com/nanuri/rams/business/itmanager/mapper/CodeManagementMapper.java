package com.nanuri.rams.business.itmanager.mapper;

import java.util.List;
import java.util.Optional;

import com.nanuri.rams.business.itmanager.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CodeManagementMapper {

	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp); 								// 그룹코드정보 리스트 가져오기

	public Optional<GroupCodeInfoDto> getGroupCodeInfo(String cmnsCdGrp);

	public int deleteGroupCodeInfo(List<String> cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto); 						// 코드정보 가져오기

	public int registGroupCodeInfo(GroupCodeInfoSaveRequestDto requestDto); 							// 그룹코드정보 등록하기

	public int insertGroupCodeInfo(GroupCodeInfoSaveRequestDto requestDto);

	public int registCodeInfo(CodeInfoSaveRequestDto requestDto); 										// 코드정보 등록하기

	public int insertCodeInfo(CodeInfoSaveRequestDto requestDto);

	public Optional<CodeInfoDto> getCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp,
											 @Param(value = "cdVlId") String cdVlId);

	public int deleteCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp,
							  @Param(value = "cdVlIds") List<String> cdVlIds);

	public List<CommonCodeInfoDto> getCommonCodeName();

	public int selectTotalCount(); 																		// 조회할 코드구분(코드이름) 가져오기
}
