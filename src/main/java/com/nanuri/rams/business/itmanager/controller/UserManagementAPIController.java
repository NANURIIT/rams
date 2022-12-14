package com.nanuri.rams.business.itmanager.controller;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserListDto;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;
import com.nanuri.rams.business.itmanager.service.UserManagementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;



@Slf4j
@RequiredArgsConstructor
@RestController
public class UserManagementAPIController {

    private final UserManagementService userManagementService;
    
    /* 사원번호 목록조회(사용자 추가 - 기존 등록 된  사용자 번호에 사용자를 추가하는 형식) */
    @GetMapping(value="/getEnoList")
    public List<UserInfo> getEnoList() {
        return userManagementService.getEnoList();
    }
    
    @PostMapping(value="/insertUser")
    public void insertUser(@RequestBody UserManageDTO userManageDTO) {
        userManagementService.insertUser(userManageDTO);
    };

    @GetMapping(value="/getUserList")
    public List<UserListDto> getUserList() {
        return userManagementService.getUserList();
    }
    
}
