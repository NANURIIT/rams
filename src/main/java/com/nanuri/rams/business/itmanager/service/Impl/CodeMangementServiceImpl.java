package com.nanuri.rams.business.itmanager.service.Impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nanuri.rams.business.itmanager.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.itmanager.mapper.CodeManagementMapper;
import com.nanuri.rams.business.itmanager.service.CodeManagementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CodeMangementServiceImpl implements CodeManagementService {

	private final CodeManagementMapper codeManagementMapper;

	@Override
	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
		return null;
	}

	@Override
	// TODO 코드구분 값을 파라미터로 넣어야 하나 데이터가 없어 임시로 지정
	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<GroupCodeInfoDto> groupCodeInfoList = codeManagementMapper.getGroupCodeInfoList(cmnsCdGrp);
		for (GroupCodeInfoDto groupCodeInfo : groupCodeInfoList) {
			Date formatDate = dateFormat.parse(groupCodeInfo.getRgstDt());
			groupCodeInfo.setRgstDt(newFormat.format(formatDate));
		}
		return groupCodeInfoList;
	}

	@Override
	public boolean registGroupCodeInfo(List<GroupCodeInfoSaveRequestDto> requestDtos) {
		int count = 0;
		for (GroupCodeInfoSaveRequestDto requestDto : requestDtos) {
			if (codeManagementMapper.getGroupCodeInfo(requestDto.getCmnsCdGrp()).isPresent()) {
				throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getCmnsCdGrp());
			}

			if (codeManagementMapper.getGroupCodeInfo(requestDto.getOldCmnsCdGrp()).isEmpty()) {
				count += codeManagementMapper.insertGroupCodeInfo(requestDto);
			} else {
				count += codeManagementMapper.registGroupCodeInfo(requestDto);
			}
		}
		return count > 0;
	}

	@Override
	public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {
		int count = codeManagementMapper.deleteGroupCodeInfo(cmnsCdGrp);
		return count > 0;
	}

	@Override
	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<CodeInfoDto> codeInfoList = codeManagementMapper.getCodeInfoList(cmnsCdGrp);
		for (CodeInfoDto codeInfo : codeInfoList) {
			Date formatDate = dateFormat.parse(codeInfo.getRgstDt());
			codeInfo.setRgstDt(newFormat.format(formatDate));
		}

		return codeInfoList;
	}

	@Override
	public boolean registCodeInfo(List<CodeInfoSaveRequestDto> requestDtos) {
		int count = 0;
		for (CodeInfoSaveRequestDto requestDto : requestDtos) {
			if (codeManagementMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlId()).isPresent()) {
				throw new IllegalArgumentException("해당 코드가 존재합니다." + requestDto.getCmnsCdGrp() + " : " + requestDto.getCdVlId());
			}

			if (codeManagementMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getOldCdVlId()).isEmpty()) {
				// 신규등록
				count += codeManagementMapper.insertCodeInfo(requestDto);
			} else {
				// 수정
				count += codeManagementMapper.registCodeInfo(requestDto);
			}
		}
		return count > 0;
	}

	@Override
	public boolean deleteCodeInfo(CodeInfoDeleteRequestDto requestDto) {
		return codeManagementMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlIds()) > 0;
	}

	// 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
	@Override
	public List<CommonCodeInfoDto> getCommonCodeName() {
		return codeManagementMapper.getCommonCodeName();
	}

}
