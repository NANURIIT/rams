package com.nanuri.rams.business.examconsultative.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class examConsultativeController {
    
    @GetMapping(value = {"/AS04010S"})
    public String resultConsultative() {
        return "business/AS04010S";
    }
}
