package com.nanuri.rams.business.examinfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
// 심사 요청 페이지 Controller
public class ExamReqController {

	@GetMapping(value = { "/", "/examReq" })
	public String assignmentInquiry() {
		return "business/examReq";
	}
}
