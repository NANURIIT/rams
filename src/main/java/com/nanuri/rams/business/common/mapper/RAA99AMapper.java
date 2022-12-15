package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA99ADto;
import com.nanuri.rams.com.security.vo.EmpDetailsVO;

@Mapper
public interface RAA99AMapper {
	
	
	/**
	 * 로그인 정보 조회
	 * @param raa99aDto
	 * @return
	 */
	public RAA99ADto findByEno(String eno);
	
	/**
	 * 직원검색
	 * @param raa99aDto
	 * @return
	 */
	public List<RAA99ADto> findEmpList(RAA99ADto raa99aDto);

}
