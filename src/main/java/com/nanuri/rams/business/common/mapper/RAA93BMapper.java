package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA93BDTO;
import com.nanuri.rams.business.common.vo.RAA93BVO;

@Mapper
public interface RAA93BMapper {
    public List<RAA93BVO.MenuListVO> selectMenuList(String menuNm);    // 메뉴별권한관리 메뉴명 조회
}
