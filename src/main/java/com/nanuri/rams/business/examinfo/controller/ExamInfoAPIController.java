package com.nanuri.rams.business.examinfo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.examinfo.dto.DealDto;
import com.nanuri.rams.business.examinfo.service.ExamInfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController

public class ExamInfoAPIController {

	
	private ExamInfoService examInfoService;

	/* 심사 요청 페이지
	 * 
	 */
	
	// deal list 가져오기
	@GetMapping(value = "/dealList")
	public List<DealDto> getDealList(String dealNo, String def) {
		return examInfoService.getDealList(dealNo, def);
	}

	// deal 상세정보 가져오기
	@GetMapping(value = "/dealDetails")
	public DealDto getDealDetails(String dealNo) {
		return examInfoService.getDealDetails(dealNo);
	}

	// deal 정보 등록
	@PostMapping(value = "/dealDetails")
	public void registDealDetails(DealDto dealDto) {
		examInfoService.registDealDetails(dealDto);
	}

	// deal 정보 수정
	@PatchMapping(value = "/dealDetails")
	public void updateDealDetails(DealDto dealDto) {
		examInfoService.updateDealDetails(dealDto);
	}
	
	/* 안건조회 및 배정 페이지
	 * 
	 * */
	
	//TODO
	
	
	/* 배정안건조회 페이지
	 * 
	 * */
	
	//TODO

}
