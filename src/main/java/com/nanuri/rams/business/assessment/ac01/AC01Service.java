package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDeleteRequestDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoSaveRequestDto;
import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.FindUserVo;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoSaveRequestDto;

@Service
public interface AC01Service {

	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException;			// 그룹코드정보 리스트 가져오기

	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException;

	public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp);

	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto); 						// 코드정보 가져오기

	public boolean registGroupCodeInfo(List<GroupCodeInfoSaveRequestDto> requestDtos); 					// 그룹코드정보 등록하기

	public boolean registCodeInfo(List<CodeInfoSaveRequestDto> requestDtos); 							// 코드정보 등록하기

	public boolean deleteCodeInfo(CodeInfoDeleteRequestDto requestDto);

	public List<CommonCodeInfoDto> getCommonCodeName(); 												// 조회할 코드구분(코드이름) 가져오기

	public void insertUser(RAA92BDTO userManageDTO);                    								// 사용자 추가// 사용자 추가
    public List<RAA92BVO> getUserList(RAA92BVO userVo);            							    // 사용자 목록 조회
    public void deleteUser(RAA92BDTO userManageDTO);                    								// 사용자 삭제(퇴사)
    public List<RAA94BDTO> selectAuthCode();                            							  	// 사용자관리 화면의 권한구분
}
