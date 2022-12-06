package com.nanuri.rams.business.examinfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
// 안건조회 및 배정 페이지 Controller
public class AS03010SController {

	@GetMapping(value = { "/AS03010S" })
	public String AS03010S() {
		return "business/AS03010S";
	}
}
