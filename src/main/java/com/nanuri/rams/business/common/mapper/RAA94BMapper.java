package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.vo.RAA94BVO;

@Mapper
public interface RAA94BMapper {
    
    public List<RAA94BDTO> selectRghtCd();                	// 사용자관리화면 권한구분
	public List<RAA94BVO.MenuByAuthVO> selectMenuByAuth();	// 권한별 메뉴화면 사용권한 조회

	public List<RAA94BDTO> selectAuthCode(String rghtCdNm);

	public int updateAuthCode(RAA94BDTO requestDto);

	public int insertAuthCode(RAA94BDTO requestDto);

	public int deleteAuthCode(List<String> rghtCd);

	public Optional<RAA94BDTO> getAuthCode(String rghtCd);
}
