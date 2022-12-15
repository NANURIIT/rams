package com.nanuri.rams.business.assessment.as02;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA99ADto;
import com.nanuri.rams.business.common.mapper.RAA99AMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS02ServiceImpl implements AS02Service {
	
	private final RAA99AMapper raa99bMapper;

	/**
	 * 직원검색
	 */
	@Override
	public List<RAA99ADto> findEmpList(RAA99ADto raa99aDto) {
		
		List<RAA99ADto> raa90aList = raa99bMapper.findEmpList(raa99aDto);
		
		return raa90aList;
	}

}
