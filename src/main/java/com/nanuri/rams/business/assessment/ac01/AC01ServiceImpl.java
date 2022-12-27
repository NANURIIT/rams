package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.mapper.RAA90BMapper;
import com.nanuri.rams.business.common.mapper.RAA92BMapper;
import com.nanuri.rams.business.common.mapper.RAA93BMapper;
import com.nanuri.rams.business.common.mapper.RAA94BMapper;
import com.nanuri.rams.business.common.mapper.RAA95BMapper;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO;
import com.nanuri.rams.business.common.vo.RAA95BVO;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDeleteRequestDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoSaveRequestDto;
import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoSaveRequestDto;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01ServiceImpl implements AC01Service {

    private final RAA90BMapper raa90BMapper;
    private final RAA92BMapper raa92BMapper;
    private final RAA93BMapper raa93BMapper;
    private final RAA94BMapper raa94BMapper;
    private final RAA95BMapper raa95BMapper;
    private final AuthenticationFacade facade;
    
	//============ start AC01010S(공통코드관리) ============//

    @Override
    public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
        return null;
    }

    @Override
    // TODO 코드구분 값을 파라미터로 넣어야 하나 데이터가 없어 임시로 지정
    public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<GroupCodeInfoDto> groupCodeInfoList = raa90BMapper.getGroupCodeInfoList(cmnsCdGrp);
        for (GroupCodeInfoDto groupCodeInfo : groupCodeInfoList) {
            Date formatDate = dateFormat.parse(groupCodeInfo.getRgstDt());
            groupCodeInfo.setRgstDt(newFormat.format(formatDate));
        }
        return groupCodeInfoList;
    }

    @Override
    public boolean registGroupCodeInfo(List<GroupCodeInfoSaveRequestDto> requestDtos) {
        int count = 0;
        for (GroupCodeInfoSaveRequestDto requestDto : requestDtos) {
            if (raa90BMapper.getGroupCodeInfo(requestDto.getCmnsCdGrp()).isPresent()) {
                throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getCmnsCdGrp());
            }

            if (raa90BMapper.getGroupCodeInfo(requestDto.getOldCmnsCdGrp()).isEmpty()) {
                count += raa90BMapper.insertGroupCodeInfo(requestDto);
            } else {
                count += raa90BMapper.registGroupCodeInfo(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {
        int count = raa90BMapper.deleteGroupCodeInfo(cmnsCdGrp);
        return count > 0;
    }

    @Override
    public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<CodeInfoDto> codeInfoList = raa90BMapper.getCodeInfoList(cmnsCdGrp);
        for (CodeInfoDto codeInfo : codeInfoList) {
            Date formatDate = dateFormat.parse(codeInfo.getRgstDt());
            codeInfo.setRgstDt(newFormat.format(formatDate));
            if (StringUtil.isAllWhitespace(codeInfo.getRgstPEno())) {
                codeInfo.setRgstPEno("-");
            }

            if (StringUtil.isAllWhitespace(codeInfo.getHndlPEno())) {
                codeInfo.setHndlPEno("-");
            }
        }

        return codeInfoList;
    }

    @Override
    public boolean registCodeInfo(List<CodeInfoSaveRequestDto> requestDtos) {
        int count = 0;
        for (CodeInfoSaveRequestDto requestDto : requestDtos) {
            if (raa90BMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlId()).isPresent()) {
                throw new IllegalArgumentException("해당 코드가 존재합니다." + requestDto.getCmnsCdGrp() + " : " + requestDto.getCdVlId());
            }

            if (raa90BMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getOldCdVlId()).isEmpty()) {
                // 신규등록
                Integer seq = raa90BMapper.getMaxSeq(requestDto.getCmnsCdGrp()) == null ?
                        1 : raa90BMapper.getMaxSeq(requestDto.getCmnsCdGrp()) + 1;
                requestDto.setCdSq(seq);
                requestDto.setRgstPEno(facade.getDetails().getEno());
                count += raa90BMapper.insertCodeInfo(requestDto);
            } else {
                // 수정
                requestDto.setHndlPEno(facade.getDetails().getEno());
                count += raa90BMapper.registCodeInfo(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteCodeInfo(CodeInfoDeleteRequestDto requestDto) {
        return raa90BMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlIds()) > 0;
    }

    // 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
    @Override
    public List<CommonCodeInfoDto> getCommonCodeName() {
        return raa90BMapper.getCommonCodeName();
    }
    
	//============ end AC01010S(공통코드관리) ============//

    //============ Start AC01110S( 사용자 관리 ) ============//
    /* 사용자 추가 */
    @Override
    public void insertUser(RAA92BDTO dto) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");

        String rgstDt = today.format(date);
        String rgstTm = now.format(time);
        // String sq = String.valueOf(RAA92BMapper.getLastSq() + 1);
        // String sq = "(SELECT NEXTVAL(RAA92B_SQ))";
        // String insertSq = Optional.ofNullable(dto.getSq()).orElse(sq);
        String insertSq = Optional.ofNullable(dto.getSq()).orElse("");
        String eno = facade.getDetails().getEno();
        String dprtCd = facade.getDetails().getDprtCd();

        dto.setSq(insertSq);
        dto.setDprtCd(dprtCd);
        dto.setRgstPEno(eno);
        dto.setRgstDt(rgstDt);
        dto.setRgstTm(rgstTm);
        dto.setAplcStrtDt(dto.getAplcStrtDt().replace("-", ""));
        dto.setAplcEndDt(dto.getAplcEndDt().replace("-", ""));
        dto.setHndlPEno(eno);
        dto.setHndlDprtCd(dprtCd);

        raa92BMapper.insertUser(dto);
    }

    /* 사용자 목록 */
    @Override
    public List<RAA92BVO.selectVO> getUserList(RAA92BVO.selectVO vo) {
        return raa92BMapper.selectUser(vo);
    }

    /* 사용자 삭제(퇴사) */
    @Override
    public void deleteUser(RAA92BDTO dto) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");

        String dltDt = today.format(date);
        String dltTm = now.format(time);
        String eno = facade.getDetails().getEno();
        String hndlDprtCd = facade.getDetails().getDprtCd();

        dto.setDltPEno(eno);
        dto.setDltDt(dltDt);
        dto.setDltTm(dltTm);
        dto.setHndlPEno(eno);
        dto.setHndlDprtCd(hndlDprtCd);

        raa92BMapper.deleteUser(dto);
    }

    /* 사용자관리화면 권한구분 */
    @Override
    public List<RAA94BDTO> selectAuthCode() {
        return raa94BMapper.selectRghtCd();
    }

    //============ End AC01110S( 사용자 관리 ) ============//
    //============ Start AC01310S( 메뉴별권한 관리 ) ============//	

    /* 메뉴명 조회 */
    @Override
    public List<RAA93BVO.MenuListVO> getMenuList(String menuNm) {

        List<RAA93BVO.MenuListVO> menuList = raa93BMapper.selectMenuList(menuNm);

        String name = "";
        String lvName = "";
        int rowNum = 0;

        for (RAA93BVO.MenuListVO menu : menuList) {
            name = "";
            lvName = "";
            if (menu.getLv2Nm() != null && menu.getLv2Nm() != "") {
                rowNum++;
                name = menu.getLv1Nm() + " > " + menu.getLv2Nm();
                lvName = menu.getLv2Id();
            }
            if (menu.getLv3Nm() != null && menu.getLv3Nm() != "") {
                rowNum++;
                name = menu.getLv1Nm() + " > " + menu.getLv2Nm() + " > " + menu.getLv3Nm();
                lvName = menu.getLv3Id();
            }
            menu.setMenuId(lvName);
            menu.setMenuName(name);
            menu.setRowNum(rowNum);
        }

        return menuList;
    }

    /* 권한별 메뉴화면 사용권한 조회 */
    @Override
    public List<RAA95BVO.MenuByAuthVO> getMenuByAuth() {
        List<RAA95BVO.MenuByAuthVO> menuAuthList = raa95BMapper.selectMenuByAuth();
        SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeformat = new SimpleDateFormat("hh:mm:ss");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
        for (RAA95BVO.MenuByAuthVO menu : menuAuthList) {
			String dateTime = Optional.ofNullable(menu.getHndlDyTm()).orElse("");
			if (dateTime!=""){
				menu.setHndlDt(dateTime.split(" ")[0]);
				menu.setHndlTm(dateTime.split(" ")[1]);
			} else {
				menu.setHndlDt(dateTime);
				menu.setHndlTm(dateTime);
			}
			String hndlPEno = Optional.ofNullable(menu.getHndlPEno()).orElse("");
			menu.setHndlPEno(hndlPEno);
        }

        return menuAuthList;
    }

    //============ End AC01310S( 메뉴별권한 관리 ) ============//	
    
	//============ start AC01210S(권한별 메뉴관리) ============//

  	@Override
  	public List<RAA94BDTO> getAuthCode(String rghtCdNm) throws ParseException {
  		List<RAA94BDTO> authCodes = raa94BMapper.selectAuthCode(rghtCdNm);
  		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
  		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
  		for (RAA94BDTO authCode : authCodes) {
  			if (StringUtil.isAllWhitespace(authCode.getRgstPEno())) {
  				authCode.setRgstPEno("-");
  			}
  			if (StringUtil.isAllWhitespace(authCode.getHndlDyTm())) {
  				authCode.setHndlDyTm("-");
  			}
  			if (StringUtil.isAllWhitespace(authCode.getHndlPEno())) {
  				authCode.setHndlPEno("-");
  			}
  			Date formatDate = dateFormat.parse(authCode.getRgstDt());
  			authCode.setRgstDt(newFormat.format(formatDate));
  		}
  		return authCodes;
  	}

  	@Override
  	public List<RAA93BVO> getAuthCodeMenu(String rghtCd) {
  		List<RAA93BVO> authCodeMenus = raa93BMapper.selectAuthCodeMenu(rghtCd);
  		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
  		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
  		for (RAA93BVO authCodeMenu : authCodeMenus) {
  			if (StringUtil.isAllWhitespace(authCodeMenu.getHndlPEno())) {
  				authCodeMenu.setHndlPEno("-");
  			}
  			if (StringUtil.isAllWhitespace(authCodeMenu.getHndlDyTm())) {
  				authCodeMenu.setHndlDyTm("-");
  			}
  			if (StringUtil.isAllWhitespace(authCodeMenu.getHndlPEno())) {
  				authCodeMenu.setHndlPEno("-");
  			}
  		}
  		return authCodeMenus;
  	}

  	@Override
  	public boolean registerAuthCode(List<RAA94BDTO> requestDtos) {
  		int count = 0;
  		for (RAA94BDTO requestDto : requestDtos) {
  			if (raa94BMapper.getAuthCode(requestDto.getRghtCd()).isPresent()) {
  				throw new IllegalArgumentException("해당 권한코드가 존재합니다 : " + requestDto.getRghtCd());
  			}

  			if (raa94BMapper.getAuthCode(requestDto.getOldRghtCd()).isPresent()) {
  				requestDto.setHndlPEno(facade.getDetails().getEno());
  				count += raa94BMapper.updateAuthCode(requestDto);
  			} else {
  				String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")).toString();
  				requestDto.setRgstDt(now);
  				requestDto.setRgstPEno(facade.getDetails().getEno());
  				count += raa94BMapper.insertAuthCode(requestDto);
  			}
  		}
  		return count > 0;
  	}

  	@Override
  	public boolean deleteAuthCode(List<String> rghtCd) {
  		int count = 0;
  		count += raa94BMapper.deleteAuthCode(rghtCd);
  		return count > 0;
  	}

  	@Override
  	public boolean registerAuthCodeMenu(List<RAA93BVO> requestDtos) {
  		int count = 0;
  		for (RAA93BVO requestDto : requestDtos) {
  			requestDto.setHndlPEno(facade.getDetails().getEno());
  			count += raa93BMapper.updateAuthCodeMenu(requestDto);
  		}
  		return count > 0;
  	}

  	//============ end AC01210S(권한별 메뉴관리) ============//
    
    
    
}
