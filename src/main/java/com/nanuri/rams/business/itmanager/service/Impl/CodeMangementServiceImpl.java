package com.nanuri.rams.business.itmanager.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;
import com.nanuri.rams.business.itmanager.mapper.CodeManagementMapper;
import com.nanuri.rams.business.itmanager.service.CodeManagementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CodeMangementServiceImpl implements CodeManagementService {

    private final CodeManagementMapper codeManagementMapper;

    @Override
    public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
        return null;
    }

    @Override
    public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdNm) {   // TODO 코드구분 값을 파라미터로 넣어야 하나 데이터가 없어 임시로 지정

        List<GroupCodeInfoDto> list = new ArrayList<>();
        List<GroupCodeInfoDto> groupCodeInfoDto = codeManagementMapper.getGroupCodeInfoList(cmnsCdNm);
        for(GroupCodeInfoDto dto : groupCodeInfoDto){
            list.add(dto);
        }
        
        return list;
    }

    @Override
    public void registCodeInfo(CodeInfoDto codeInfoDto) {
        
    }

    @Override
    public void registGroupCodeInfo(GroupCodeInfoDto groupCodeInfoDto) {
        
    }


    // 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
    @Override
    public List<String> getCommonCodeName() {
        List<String> codeNameList = new ArrayList<>();
        codeNameList = codeManagementMapper.getCommonCodeName();
        return codeNameList;
    }
    
}
