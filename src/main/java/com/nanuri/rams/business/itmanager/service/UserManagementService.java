package com.nanuri.rams.business.itmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserListDto;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;

@Service
public interface UserManagementService {
    
    public List<UserInfo> getEnoList();                     // 사용자 추가를 위한 사원번호 목록 조회
    public void insertUser(UserManageDTO userManageDTO);    // 사용자 추가
    public List<UserListDto> getUserList(String empNm);
    public void deleteUser(UserManageDTO userManageDTO);
    public void updateUser(UserManageDTO userManageDTO);    // 사용자 업데이트

}
