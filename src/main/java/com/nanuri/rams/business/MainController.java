package com.nanuri.rams.business;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MainController {


    @GetMapping(value = {"/"})
    public String home() {
        return "business/code";
    }
}
