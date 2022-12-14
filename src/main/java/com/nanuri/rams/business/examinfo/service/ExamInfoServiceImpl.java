package com.nanuri.rams.business.examinfo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.examinfo.dto.DealDto;
import com.nanuri.rams.business.examinfo.mapper.ExamInfoMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ExamInfoServiceImpl implements ExamInfoService {

	private final ExamInfoMapper examInfoMapper;

	/*
	 * 심사 요청 페이지
	 * 
	 */

	public List<DealDto> getDealList(DealDto dealDto) {

		List<DealDto> dealList = examInfoMapper.getDealList(dealDto);

		return dealList;
	}

	/*
	 * 안건조회 및 배정 페이지
	 * 
	 */

	// TODO

	/*
	 * 배정안건조회 페이지
	 * 
	 */

	// TODO
}
