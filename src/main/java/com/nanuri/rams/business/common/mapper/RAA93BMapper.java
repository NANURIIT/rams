package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.vo.RAA93BVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RAA93BMapper {

    public List<RAA93BVo> selectAuthCodeMenu(String rghtCd);
}
