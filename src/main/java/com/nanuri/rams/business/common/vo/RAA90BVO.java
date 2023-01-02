package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import java.util.ArrayList;
import java.util.List;

public class RAA90BVO {

    @Getter
    @Setter
    public static class CodeInfoSaveRequestVO {

        private String cmnsCdGrp;
        private String oldCdVlId;
        @Max(value = 20, message = "코드Id는 20자리 이하여야 합니다.")
        private String cdVlId;
        private String cdVlNm;
        private Integer cdSq;
        private String useF;
        private String rgstPEno;
        private String hndlPEno;
    }

    @Getter
    @Setter
    public static class CodeInfoDeleteRequestVO {
        private String cmnsCdGrp;
        private List<String> cdVlIds = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class GroupCodeInfoSaveRequestVO {
        /* GroupCodeInfoSaveRequestDTO */
        private String oldCmnsCdGrp;
        private String cmnsCdGrp;
        private String cmnsCdNm;
        private String cmnsCdGrpExpl;
        private Integer cdLngth;
        private String useF;
    }

    @Getter
    @Setter
    public static class CommonCodeInfoVO {
        /* CommonCodeInfoDTO */
        private String cmnsCdNm;
        private String cmnsCdGrp;
        private String cmnsCdGrpExpl;
    }
}
