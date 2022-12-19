package com.nanuri.rams.business.itmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserListDto;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;
import com.nanuri.rams.business.itmanager.dto.AuthCodeDto;
import com.nanuri.rams.business.itmanager.dto.FindUserVo;

@Service
public interface UserManagementService {
    
    public List<UserInfo> getEnoList();                                     // 사용자 추가를 위한 사원번호 목록 조회
    public void insertUser(UserManageDTO userManageDTO);                    // 사용자 추가// 사용자 추가
    public List<UserListDto> getUserList(FindUserVo userVo);                // 사용자 목록 조회
    public void deleteUser(UserManageDTO userManageDTO);                    // 사용자 삭제(퇴사)
    public void updateUser(UserManageDTO userManageDTO);                    // 사용자 업데이트(권한회수)// 사용자 업데이트
    public List<AuthCodeDto> selectAuthCode();                                    // 사용자관리 화면의 권한구분
}
