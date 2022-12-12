package com.nanuri.rams.business.itmanager.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;
import com.nanuri.rams.business.itmanager.mapper.UserManagementMapper;
import com.nanuri.rams.business.itmanager.service.UserManagementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class UserManagementServiceImpl implements UserManagementService {
    
    private final UserManagementMapper userManagementMapper;

    /* 사용자 추가를 위한 사번 목록 조회 */
    @Override
    public List<UserInfo> getEnoList() {
        return userManagementMapper.getEnoList();
    }

    /* 사용자 추가 */
    @Override
    public void insertUser(UserManageDTO userManageDTO) {
        String sq =  String.valueOf(userManagementMapper.getLastSq()+1);
        userManageDTO.setSq(sq);
        userManagementMapper.insertUser(userManageDTO);
    }
    
}
