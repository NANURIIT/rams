package com.nanuri.rams.business.itmanager.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.itmanager.dto.AuthCodeDto;
import com.nanuri.rams.business.itmanager.dto.FindUserVo;
import com.nanuri.rams.business.itmanager.dto.UserInfo;
import com.nanuri.rams.business.itmanager.dto.UserListDto;
import com.nanuri.rams.business.itmanager.dto.UserManageDTO;

@Mapper
public interface UserManagementMapper {
    
    public List<UserInfo> getEnoList();                             // 사용자 추가를 위한 사원번호 목록 조회
    public int getLastSq();                                         // AutoIncrement 적용이 되어 있지 않아 쿼리 숫자를 셀렉해 옴
    public void insertUser(UserManageDTO userManageDTO);            // 사용자 추가
    public List<UserListDto> selectUser(FindUserVo userVo);         // 사용자 목록 조회
    public void deleteUser(UserManageDTO userManageDTO);            // 사용자 삭제(퇴사)
    public void updateUser(UserManageDTO userManageDTO);            // 사용자 업데이트(권한회수)
    public List<AuthCodeDto> selectRghtCd();                                // 사용자관리화면 권한구분
}
