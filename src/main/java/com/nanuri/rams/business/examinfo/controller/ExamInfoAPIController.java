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

	
	private final ExamInfoService examInfoService;

	/* 심사 요청 페이지
	 * 
	 */
	
	// deal list 가져오기
	@GetMapping(value = "/getDealList")
	public List<DealDto> getDealList(DealDto dealDto) {
		return examInfoService.getDealList(dealDto);
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
