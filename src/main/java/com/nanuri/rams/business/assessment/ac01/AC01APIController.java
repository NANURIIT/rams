package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.util.List;

import com.nanuri.rams.business.common.dto.RAA94BDto;
import com.nanuri.rams.business.common.vo.RAA93BVo;
import com.nanuri.rams.business.itmanager.dto.*;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01APIController {

    private final AC01Service ac01Service;

    //============ start AC01010S(공통코드관리) ============//
    // 그룹코드정보 리스트 가져오기
    @GetMapping(value = "/groupCodeInfoList")
    public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
        return ac01Service.getGroupCodeInfoList(cmnsCdGrp);
    }

    @GetMapping(value = "/groupCodeInfo")
    public List<CodeInfoDto> getGroupCodeInfo(String cmnsCdGrp) throws ParseException {
        return ac01Service.getCodeInfoList(cmnsCdGrp);
    }

    @PatchMapping(value = "/deleteGroupCodeInfo")
    public boolean deleteGroupCodeInfo(@RequestBody List<String> cmnsCdGrp) {
        return ac01Service.deleteGroupCodeInfo(cmnsCdGrp);
    }

    @PatchMapping(value = "/deleteCodeInfo")
    public boolean deleteCodeInfo(@RequestBody CodeInfoDeleteRequestDto requestDto) {
        //log.debug("requestDto : {}", requestDto);
        return ac01Service.deleteCodeInfo(requestDto);
    }

    @GetMapping(value = "/commonCodeInfo")
    public List<CommonCodeInfoDto> getCommonCodeInfo() {
        return ac01Service.getCommonCodeName();
    }

    // 코드정보 가져오기
    @GetMapping(value = "/codeInfoList")
    public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
        return ac01Service.getCodeInfoList(groupCodeInfoDto);
    }

    // 그룹코드정보 등록하기
    @PostMapping(value = "/registGroupCodeInfo")
    public boolean registGroupCodeInfo(@RequestBody List<GroupCodeInfoSaveRequestDto> requestDtos) {
        //log.debug("requestDtos : {}", requestDtos);
        return ac01Service.registGroupCodeInfo(requestDtos);
    }

    // 코드정보 등록하기
    @PostMapping(value = "/registCodeInfo")
    public boolean registCodeInfo(@RequestBody List<CodeInfoSaveRequestDto> requestDtos) {
        //log.debug("requestDtos : {}", requestDtos);
        return ac01Service.registCodeInfo(requestDtos);
    }
    //============ end AC01010S(공통코드관리) ============//

    //============ start AC01210S(권한별 메뉴관리) ============//
    @GetMapping(value = "/getAuthCode")
    public List<RAA94BDto> getAuthCode(String rghtCdNm) throws ParseException {
        return ac01Service.getAuthCode(rghtCdNm);
    }

    @GetMapping(value = "/getAuthCodeMenu")
    public List<RAA93BVo> getAuthCodeMenu(String rghtCd) {
        return ac01Service.getAuthCodeMenu(rghtCd);
    }

    @PostMapping(value = "/registerAuthCode")
    public boolean registerAuthCode(@RequestBody List<RAA94BDto> requestDtos) {
        return ac01Service.registerAuthCode(requestDtos);
    }

    @PatchMapping(value = "/deleteAuthCode")
    public boolean deleteAuthCode(@RequestBody List<String> rghtCd) {
		return ac01Service.deleteAuthCode(rghtCd);
    }

    @PostMapping(value = "/registerAuthCodeMenu")
    public boolean registerAuthCodeMenu(@RequestBody List<RAA93BVo> requestDtos) {
        return ac01Service.registerAuthCodeMenu(requestDtos);
    }
    //============ end AC01210S(권한별 메뉴관리) ============//
}
