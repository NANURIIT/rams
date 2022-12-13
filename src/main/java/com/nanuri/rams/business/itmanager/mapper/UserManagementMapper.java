package com.nanuri.rams.business.itmanager.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;

@Mapper
public interface UserManagementMapper {
    
    public List<UserInfo> getEnoList();                     // 사용자 추가를 위한 사원번호 목록 조회
    public int getLastSq();
    public void insertUser(UserManageDTO userManageDTO);    // 사용자 추가
}