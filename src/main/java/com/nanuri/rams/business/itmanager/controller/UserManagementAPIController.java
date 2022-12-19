package com.nanuri.rams.business.itmanager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserListDto;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;
import com.nanuri.rams.business.itmanager.dto.AuthCodeDto;
import com.nanuri.rams.business.itmanager.dto.FindUserVo;
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
    // @GetMapping(value="/getEnoList")
    // public List<UserInfo> getEnoList() {
    //     return userManagementService.getEnoList();
    // }
    
    /* 사용자 권한 추가 */
    @PostMapping(value="/insertUser")
    public void insertUser(@RequestBody UserManageDTO userManageDTO) {
        userManagementService.insertUser(userManageDTO);
    };

    /* 사용자 목록조회 */
    @GetMapping(value="/getUserList")
    public List<UserListDto> getUserList(FindUserVo userVo ) {
        return userManagementService.getUserList(userVo);
    }
    
    /* 사용자 삭제(퇴사) */
    @PatchMapping(value = "/deleteUser")
	public void deleteUser(@RequestBody UserManageDTO userManageDTO) {
		userManagementService.deleteUser(userManageDTO);
	}

    /* 사용자관리화면 권한구분 */
    @GetMapping(value="/selectAuthCode")
    public List<AuthCodeDto> selectAuthCode() {
        return userManagementService.selectAuthCode();
    }
 
    
    
}
