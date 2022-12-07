package com.nanuri.rams.business.examconsultative.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class examConsultativeController {
    
    @GetMapping(value = {"/AS04010S"})
    public String referConsultative() {
        return "business/AS04010S";
    }
    @GetMapping(value = {"/AS04110S"})
    public String preAdvance() {
        return "business/AS04110S";
    }
    @GetMapping(value = {"/AS04210S"})
    public String resultConsultative() {
        return "business/AS04210S";
    }
    @GetMapping(value = {"/AS04310S"})
    public String MeetingMaterial() {
        return "business/AS04310S";
    }
}
