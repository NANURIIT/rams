package com.nanuri.rams.business.examinfo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AssignmentInquiryContorller {

	@GetMapping(value = "/assignmentInquiry")
    public String assignmentInquiry() {
        return "business/assignmentInquiry";
    }
}






