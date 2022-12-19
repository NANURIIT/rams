package com.nanuri.rams.business.itmanager.service.Impl;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.itmanager.dto.AuthCodeDto;
import com.nanuri.rams.business.itmanager.dto.FindUserVo;
import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserListDto;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;
import com.nanuri.rams.business.itmanager.mapper.UserManagementMapper;
import com.nanuri.rams.business.itmanager.service.UserManagementService;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class UserManagementServiceImpl implements UserManagementService {

    private final UserManagementMapper userManagementMapper;
    private final AuthenticationFacade facade;

    /* 사용자 추가를 위한 사번 목록 조회 */
    @Override
    public List<UserInfo> getEnoList() {
        return userManagementMapper.getEnoList();
    }

    /* 사용자 추가 */
    @Override
    public void insertUser(UserManageDTO userManageDTO) {
        String sq = String.valueOf(userManagementMapper.getLastSq() + 1);
        // System.out.println("        SQ : " + userManageDTO.getSq());
        System.out.println(userManageDTO.getSq());
        if (userManageDTO.getSq().equals("0")) {
            userManageDTO.setSq(sq);
        }else if ((userManageDTO.getSq() != null) || (userManageDTO.getSq() != "")){
            userManageDTO.setSq(sq);
        } else {
            userManageDTO.setSq(userManageDTO.getSq());
        }
        String eno = facade.getDetails().getEno();
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");
        String rgstDt = today.format(date);
        String rgstTm = now.format(time);
        userManageDTO.setRgstPEno(eno);
        userManageDTO.setHndlPEno(eno);
        userManageDTO.setAplcStrtDt(userManageDTO.getAplcStrtDt().replace("-", ""));
        userManageDTO.setAplcEndDt(userManageDTO.getAplcEndDt().replace("-", ""));
        userManageDTO.setRgstDt(rgstDt);
        userManageDTO.setRgstTm(rgstTm);
        userManagementMapper.insertUser(userManageDTO);
    }

    /* 사용자 목록 */
    @Override
    public List<UserListDto> getUserList(FindUserVo userVo) {
        return userManagementMapper.selectUser(userVo);
    }

    /* 사용자 삭제(퇴사) */
    @Override
    public void deleteUser(UserManageDTO userManageDTO) {
        String eno = facade.getDetails().getEno();
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");
        String dltDt = today.format(date);
        String dltTm = now.format(time);
        userManageDTO.setDltPEno(eno);
        userManageDTO.setDltDt(dltDt);
        userManageDTO.setDltTm(dltTm);
        
        userManagementMapper.deleteUser(userManageDTO);
    }

    // /* 사용자 업데이트(권한회수) */
    // @Override
    // public void updateUser(UserManageDTO userManageDTO) {
    //     String eno = facade.getDetails().getEno();
    //     userManageDTO.setHndlPEno(eno);
    //     userManageDTO.setAplcStrtDt(userManageDTO.getAplcStrtDt().replace("-", ""));
    //     userManageDTO.setAplcEndDt(userManageDTO.getAplcEndDt().replace("-", ""));
    //     userManagementMapper.insertUser(userManageDTO);
    // }

    /* 사용자관리화면 권한구분 */
    @Override
    public List<AuthCodeDto> selectAuthCode() {
        return userManagementMapper.selectRghtCd();
    }

}
