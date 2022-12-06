package com.nanuri.rams.business.examinfo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.examinfo.dto.DealDto;
import com.nanuri.rams.business.examinfo.service.AS03210SService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
// 심사 요청 페이지 API Controller
public class AS03210SAPIController {

	private AS03210SService as03210sService;

	// deal list 가져오기
	@GetMapping(value = "/dealList")
	public List<DealDto> getDealList(String dealNo, String def) {
		return as03210sService.getDealList(dealNo, def);
	}

	// deal 상세정보 가져오기
	@GetMapping(value = "/dealDetails")
	public DealDto getDealDetails(String dealNo) {
		return as03210sService.getDealDetails(dealNo);
	}

	// deal 정보 등록
	@PostMapping(value = "/dealDetails")
	public void registDealDetails(DealDto dealDto) {
		as03210sService.registDealDetails(dealDto);
	}

	// deal 정보 수정
	@PatchMapping(value = "/dealDetails")
	public void updateDealDetails(DealDto dealDto) {
		as03210sService.updateDealDetails(dealDto);
	}

}
