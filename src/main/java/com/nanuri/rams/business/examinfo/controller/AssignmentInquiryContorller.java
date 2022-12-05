package com.nanuri.rams.business.examinfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AssignmentInquiryContorller {

	@GetMapping(value = {"/", "/assignmentInquiry"})
    public String assignmentInquiry() {
        return "business/assignmentInquiry";
    }
}






