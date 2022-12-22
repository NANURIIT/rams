package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.nanuri.rams.business.common.dto.RAA94BDto;
import com.nanuri.rams.business.common.mapper.RAA93BMapper;
import com.nanuri.rams.business.common.mapper.RAA94BMapper;
import com.nanuri.rams.business.common.vo.RAA93BVo;
import com.nanuri.rams.business.itmanager.dto.*;
import com.nanuri.rams.business.common.mapper.RAA90BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static org.springframework.util.StringUtils.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01ServiceImpl implements AC01Service {

	private final AuthenticationFacade facade;
	private final RAA90BMapper raa90BMapper;
	private final RAA94BMapper raa94BMapper;
	private final RAA93BMapper raa93BMapper;

	//============ start AC01010S(공통코드관리) ============//
	@Override
	public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
		return null;
	}

	@Override
	// TODO 코드구분 값을 파라미터로 넣어야 하나 데이터가 없어 임시로 지정
	public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<GroupCodeInfoDto> groupCodeInfoList = raa90BMapper.getGroupCodeInfoList(cmnsCdGrp);
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
			if (raa90BMapper.getGroupCodeInfo(requestDto.getCmnsCdGrp()).isPresent()) {
				throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getCmnsCdGrp());
			}

			if (raa90BMapper.getGroupCodeInfo(requestDto.getOldCmnsCdGrp()).isEmpty()) {
				count += raa90BMapper.insertGroupCodeInfo(requestDto);
			} else {
				count += raa90BMapper.registGroupCodeInfo(requestDto);
			}
		}
		return count > 0;
	}

	@Override
	public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {
		int count = raa90BMapper.deleteGroupCodeInfo(cmnsCdGrp);
		return count > 0;
	}

	@Override
	public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<CodeInfoDto> codeInfoList = raa90BMapper.getCodeInfoList(cmnsCdGrp);
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
			if (raa90BMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlId()).isPresent()) {
				throw new IllegalArgumentException("해당 코드가 존재합니다." + requestDto.getCmnsCdGrp() + " : " + requestDto.getCdVlId());
			}

			if (raa90BMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getOldCdVlId()).isEmpty()) {
				// 신규등록
				count += raa90BMapper.insertCodeInfo(requestDto);
			} else {
				// 수정
				count += raa90BMapper.registCodeInfo(requestDto);
			}
		}
		return count > 0;
	}

	@Override
	public boolean deleteCodeInfo(CodeInfoDeleteRequestDto requestDto) {
		return raa90BMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlIds()) > 0;
	}

	// 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
	@Override
	public List<CommonCodeInfoDto> getCommonCodeName() {
		return raa90BMapper.getCommonCodeName();
	}

	//============ end AC01010S(공통코드관리) ============//

	//============ start AC01210S(권한별 메뉴관리) ============//

	@Override
	public List<RAA94BDto> getAuthCode(String rghtCdNm) throws ParseException {
		List<RAA94BDto> authCodes = raa94BMapper.selectAuthCode(rghtCdNm);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (RAA94BDto authCode : authCodes) {
			if (!hasText(authCode.getRgstPEno())) {
				authCode.setRgstPEno("-");
			}
			if (!hasText(authCode.getHndlDyTm())) {
				authCode.setHndlDyTm("-");
			}
			if (!hasText(authCode.getHndlPEno())) {
				authCode.setHndlPEno("-");
			}
			Date formatDate = dateFormat.parse(authCode.getRgstDt());
			authCode.setRgstDt(newFormat.format(formatDate));
		}
		return authCodes;
	}

	@Override
	public List<RAA93BVo> getAuthCodeMenu(String rghtCd) {
		List<RAA93BVo> authCodeMenus = raa93BMapper.selectAuthCodeMenu(rghtCd);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (RAA93BVo authCodeMenu : authCodeMenus) {
			if (!hasText(authCodeMenu.getHndlPEno())) {
				authCodeMenu.setHndlPEno("-");
			}
			if (!hasText(authCodeMenu.getHndlDyTm())) {
				authCodeMenu.setHndlDyTm("-");
			}
			if (!hasText(authCodeMenu.getHndlPEno())) {
				authCodeMenu.setHndlPEno("-");
			}
		}
		return authCodeMenus;
	}

	@Override
	public boolean registerAuthCode(List<RAA94BDto> requestDtos) {
		int count = 0;
		for (RAA94BDto requestDto : requestDtos) {
			requestDto.setHndlPEno(facade.getDetails().getEno());
			count += raa94BMapper.updateAuthCode(requestDto);
		}
		return count > 0;
	}

	@Override
	public boolean deleteAuthCode(List<String> rghtCd) {
		int count = 0;
		count += raa94BMapper.deleteAuthCode(rghtCd);
		return count > 0;
	}

	@Override
	public boolean registerAuthCodeMenu(List<RAA93BVo> requestDtos) {
		int count = 0;
		for (RAA93BVo requestDto : requestDtos) {
			requestDto.setHndlPEno(facade.getDetails().getEno());
			count += raa93BMapper.updateAuthCodeMenu(requestDto);
		}
		return count > 0;
	}

	//============ end AC01210S(권한별 메뉴관리) ============//
}
