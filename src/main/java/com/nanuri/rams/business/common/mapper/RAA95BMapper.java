package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.RAA95BVO;

@Mapper
public interface RAA95BMapper {
    
    /* 권한별 메뉴화면 사용권한 조회 */
    public List<RAA95BVO.MenuByAuthVO> selectMenuByAuth();
}
