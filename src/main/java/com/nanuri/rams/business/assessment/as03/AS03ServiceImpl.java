package com.nanuri.rams.business.assessment.as03;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDto;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03ServiceImpl implements AS03Service {
	
	private final RAA02BMapper raa02bMapper;

	/**
	 * 딜목록 조회
	 * @param raa02bDto
	 * @return
	 */
	public List<RAA02BDto> getDealList(RAA02BDto raa02bDto) {

		List<RAA02BDto> dealList = raa02bMapper.getDealList(raa02bDto);

		return dealList;
	}

}
