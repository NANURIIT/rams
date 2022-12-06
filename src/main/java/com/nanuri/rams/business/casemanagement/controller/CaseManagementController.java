package com.nanuri.rams.business.casemanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CaseManagementController {

	// 안건 진행정보관리 페이지
	@GetMapping(value = { "/AS05010S" })
	public String AS05010S() {
		return "business/AS05010S";
	}
}
