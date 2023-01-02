$(document).ready(function() {

	setDatePicker();
	
	setKeyDownFunction_AS03210S();

	loadRaDealCcd();
	loadTabContents();
	
	checkErmAmt();

});

function setDatePicker() {

	// settings
	$('.datepicker').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		autoApply: false,
		locale: {
			"cancelLabel": 'Clear',
			"format": 'YYYY-MM-DD',
			"daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
			"monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
		}
	});

	// btn apply
	$('.datepicker').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
	});

	// btn clear
	$('.datepicker').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});

	// #tab1_datepicker1 btn apply function
	$('#tab1_datepicker1').on('apply.daterangepicker', function(ev, picker) {
		var month = $("#invstPrdMtC").val();
		if (month != "") {
			calcDate();
		}
	});
}


function setKeyDownFunction_AS03210S() {
	
	$("input[id=AS03210S_ibDealNo]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealList();
		}
	});
};

// deal List 가져오기
function getDealList(){
	var raDealCcd = $("#AS03210S_raDealCcd").val();
	var ibDealNo = $("#AS03210S_ibDealNo").val();
	
	var dtoParam = {
		"raDealCcd": raDealCcd
		, "ibDealNo": ibDealNo
	};
	
	$.ajax({
		type: "GET",
		url: "/getDealList",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var html = '';
			var dealList = data;
			$('#AS03210S_ibDealList').html(html);
			
			//console.log(dealList);

			if (dealList.length > 0) {
				$.each(dealList, function(key, value) {
					//console.log(value);
					html += '<tr ondblclick="setTabContents();">';
					//html += '<tr>';
					html += '<td>' + value.ibDealNo + '</td>';
					html += '<td>' + value.riskInspctCcd + '</td>';
					html += '<td>' + value.lstCCaseCcd + '</td>';
					html += '<td>' + value.chrgPEno + '</td>';
					html += '<td>' + value.inspctPrgrsStCd + '</td>';
					html += '<td>' + value.ibDealNm + '</td>';
					html += '</tr>';
				})
			} else {
				html += '<tr>';
				html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			//console.log(html);
			$('#AS03210S_ibDealList').html(html);
		}
	});
	
};

// 화면에서 deal Info 검색 후 더블클릭 set
function setTabContents() {
	//tr(selected) = event.currentTarget;
	//td(selected) = event.target;
	var tr = event.currentTarget;
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();
	$('#AS03210S_selectedDealNo').val(ibDealNo);
	
	console.log("ibDealNo: " + ibDealNo);

	//setTab1();
	//setTab2(ibDealNo);

}

function setTab2(ibDealNo) {
	getDocInfo(ibDealNo);
}

// 관련문서
function getDocInfo(ibDealNo) {

	var paramData = {
		"ibDealNo": ibDealNo
	}

	$.ajax({
		type: "GET",
		url: "/getDocInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_docInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr>';
					html += '<td>' + value.RA_DOC_NO + '</td>';
					html += '<td>' + value.RA_FNL_DOC_F + '</td>';
					html += '<td style="display:none;">' + value.ITEM_SQ + '</td>';
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan="2" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_docInfo').html(html);
		}
	});
}

// RADEAL 구분코드 
function loadRaDealCcd() {
	$.ajax({
		type: "GET",
		url: "/getRaDealCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_raDealCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_raDealCcd').html(html);
		}
	});
}

// 탭 페이지 항목 로드
function loadTabContents() {
	loadTab1();
	loadTab3();
	loadTab4();
	loadTab6();
	loadTab8();
}

// 탭1 안건구조
function loadTab1() {
	loadRiskInspctCcd();
	loadLstCCaseCcd();
	loadInspctDprtCcd();
	loadInvstGdsLdvdCd();
	loadInvstGdsMdvdCd();
	loadInvstGdsSdvdCd();
	loadInvstGdsDtlsDvdCd();
	loadInvstCrncyCd();
	loadIndTypDvdCd();
	loadCheckItemCd();
	loadInvstThingCcd();
	loadInvstThingDtlsCcd();
	loadRspsbCmplCcd();
	loadRaRsltnCcd();
	loadCoprtnTypCd();
	loadUserAuth();
	loadCntyCd();
	loadBsnsAreaCd();

}

// 탭3 기초자산
function loadTab3() {
	loadBscAstsKndCd();
}

// 탭4 법인형태
function loadTab4() {
	loadCncCmpnyClsfCd();
}

// 탭6 담보
function loadTab6() {
	loadMrtgKndCcd();
	loadMrtgDtlsCcd();
	loadRgtRnkCcd();
}

// 탭8 책임준공
function loadTab8() {
	loadDbtNpFrmOblgCcd();
}

// 리스크심사구분코드
function loadRiskInspctCcd() {
	$.ajax({
		type: "GET",
		url: "/getRiskInspctCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_riskInspctCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_riskInspctCcd').html(html);
		}
	});
}

// 부수안건구분코드
function loadLstCCaseCcd() {
	$.ajax({
		type: "GET",
		url: "/getlstCCaseCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_lstCCaseCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_lstCCaseCcd').html(html);
		}
	});
}

// 심사부서구분코드
function loadInspctDprtCcd() {
	$.ajax({
		type: "GET",
		url: "/getInspctDprtCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_inspctDprtCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_inspctDprtCcd').html(html);
		}
	});
}

// 투자상품대분류코드
function loadInvstGdsLdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsLdvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsLdvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsLdvdCd').html(html);
		}
	});
}

// 투자상품중분류코드
function loadInvstGdsMdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsMdvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsMdvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsMdvdCd').html(html);
		}
	});
}

// 투자상품소분류코드
function loadInvstGdsSdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsSdvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsSdvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsSdvdCd').html(html);
		}
	});
}

// 투자상품상세분류코드
function loadInvstGdsDtlsDvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsDtlsDvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsDtlsDvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsDtlsDvdCd').html(html);
		}
	});
}

// 투자기간 숫자입력 & 만기일 체크 function
function checkNumber(event) {
	if (event.key >= 0 && event.key <= 9) {						// 1. 숫자입력 체크
		var input = $("#tab1_datepicker1").val();
		if (input == "") {										// 2. 기표일 값이 없을경우 만기일 체크 안함
			return true;
		} else {												// 2-1. 기표일 값이 있을경우 만기일 체크
			calcDate();											// 개월수 계산하여 만기일 입력 fucntion
			return true;
		}
	}
	return false;
}

// 만기일 계산
function calcDate() {
	var inputInvstPrdMtC = $("#invstPrdMtC").val();
	var inputDate = $("#tab1_datepicker1").val();

	var year = inputDate.substring(0, 4);
	var month = inputDate.substring(5, 7);
	var day = inputDate.substring(8, 10);

	var date = new Date(year, month - 1, day);

	/*
	date.setMonth(date.getMonth() + Number(inputInvstPrdMtC));
	
	year = date.getFullYear();
	month = date.getMonth()+1;
	day = date.getDate();
	
	var resultDate = year + "-" + month + "-" + day;
	*/

	var dt = inputDate;
	var cycle = inputInvstPrdMtC;
	var nxt = '';
	if (dt != "" && cycle != '0') {
		if (cycle == '99') {
			nxt = "-";
		} else {
			var arr1 = dt.split('-');
			var date = new Date(arr1[0], arr1[1] - 1, arr1[2]);

			var addMonthFirstDate = new Date(date.getFullYear(), date.getMonth() + parseInt(cycle), 1);
			var addMonthLastDate = new Date(addMonthFirstDate.getFullYear(), addMonthFirstDate.getMonth() + 1, 0);

			var result = addMonthFirstDate;
			
			if (date.getDate() > addMonthLastDate.getDate()) {
				result.setDate(addMonthLastDate.getDate());
			}
			else {
				result.setDate(date.getDate());
			}

			nxt = result.getFullYear() + "-" + fillZero(2, (result.getMonth() + 1).toString()) + "-" + fillZero(2, result.getDate().toString());
		}
	}
	
	//남는 길이만큼 0으로 채움
	function fillZero(width, str) {
		return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;		
	}

	$("#mtrtDt").val(nxt);

}

// 부의기준통화
function loadInvstCrncyCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstCrncyCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstCrncyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstCrncyCd').html(html);
		}
	});
}

// 부의금액(원) 계산
function checkErmAmt(){
	// 투자금액
	$('#crncyAmt').keyup(function(event){
		if (event.key >= 0 && event.key <= 9) {						// 1. 숫자입력 체크
			var input1 = $("#aplcExchR").val();
			if (input1 != "") {										// 2. 적용환율 값이 있으면 계산
				var input2 = $("#crncyAmt").val();
			
				$("#crncyAmtWn").val(input1 * input2);
			}
		}
	})
	
	// 적용환율
	$('#aplcExchR').keyup(function(event){
		if (event.key >= 0 && event.key <= 9) {						// 1. 숫자입력 체크
			var input1 = $("#crncyAmt").val();
			if (input1 != "") {										// 2. 부의금액 값이 있으면 계산
				var input2 = $("#aplcExchR").val();
			
				$("#crncyAmtWn").val(input1 * input2);
			}
		}
	})
}

// 투자국가
function loadCntyCd() {
	$.ajax({
		type: "GET",
		url: "/getCntyCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_cntyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_cntyCd').html(html);
		}
	});
}

// 고위험사업
function loadIndTypDvdCd() {
	$.ajax({
		type: "GET",
		url: "/getIndTypDvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_indTypDvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_indTypDvdCd').html(html);
		}
	});
}

// 업무구분
function loadCheckItemCd() {
	$.ajax({
		type: "GET",
		url: "/getCheckItemCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_checkItemCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_checkItemCd').html(html);
		}
	});
}

// 사업지역
function loadBsnsAreaCd() {
	$.ajax({
		type: "GET",
		url: "/getBsnsAreaCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_bsnsAreaCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_bsnsAreaCd').html(html);
		}
	});
}

// 주요투자물건
function loadInvstThingCcd() {
	$.ajax({
		type: "GET",
		url: "/getInvstThingCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstThingCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstThingCcd').html(html);
		}
	});
}

// 주요투자물건상세
function loadInvstThingDtlsCcd() {
	$.ajax({
		type: "GET",
		url: "/getInvstThingDtlsCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstThingDtlsCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstThingDtlsCcd').html(html);
		}
	});
}

// 책임준공
function loadRspsbCmplCcd() {
	$.ajax({
		type: "GET",
		url: "/getRspsbCmplCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_rspsbCmplCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_rspsbCmplCcd').html(html);
		}
	});
}

// 전결구분
function loadRaRsltnCcd() {
	$.ajax({
		type: "GET",
		url: "/getRaRsltnCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_raRsltnCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_raRsltnCcd').html(html);
		}
	});
}

// 담당직원정보
function loadUserAuth() {
	$.ajax({
		type: "GET",
		url: "/getUserAuth",
		dataType: "json",
		success: function(data) {

			//console.log(data);

			$('#AS03210S_hdqtCd').val(data.HdqtCd);
			$('#AS03210S_hdqtNm').val(data.HdqtNm);
			$('#AS03210S_dprtCd').val(data.dprtCd);
			$('#AS03210S_dprtNm').val(data.dprtNm);
			$('#AS03210S_eno').val(data.eno);
			$('#AS03210S_empNm').val(data.empNm);
		}
	});
}

// 협업유형코드
function loadCoprtnTypCd() {
	$.ajax({
		type: "GET",
		url: "/getCoprtnTypCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_coprtnTypCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_coprtnTypCd').html(html);
		}
	});
};

/*tab1****************************************************/

function tab1save() {

	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건
	var inspctDprtCcd = $('#AS03210S_inspctDprtCcd').val();							// 심사부서구분 
	var raDealCcd = $('#AS03210S_raDealCcd').val();									// RADEAL구분코드
	var invstGdsLdvdCd = $('#AS03210S_invstGdsLdvdCd').val();						// 투자상품대분류
	var invstGdsMdvdCd = $('#AS03210S_invstGdsMdvdCd').val();						// 투자상품중분류
	var invstGdsSdvdCd = $('#AS03210S_invstGdsSdvdCd').val();						// 투자상품소분류
	var invstGdsDtlsDvdCd = $('#AS03210S_invstGdsDtlsDvdCd').val();					// 투자상품상세분류
																					// 투자기간(INVST_PRD_DY_C) : 만기일 - 기표일
	var wrtDt = $('#tab1_datepicker1').val();										// 기표일
	var mtrtDt = $('#mtrtDt').val();												// 만기일
	var ibDealNm = $('#ibDealNm').val();											// 안건명
	var ibDealSnmNm = $('#ibDealSnmNm').val();										// 안건약어명
	var invstCrncyCd = $('#AS03210S_invstCrncyCd').val();							// 부의기준통화
	var crncyAmt = $('#crncyAmt').val();											// 부의금액
	var invstNtnCd = $('#AS03210S_cntyCd').val();									// 투자국가
	var aplcExchR = $('aplcExchR').val();											// 적용환율
	var crncyAmtWn = $('crncyAmtWn').val();											// 부의금액(원)
	var tlErnAmt = $('#tlErnAmt').val();											// 투자수익
	var rcvblErnAmt = $('#rcvblErnAmt').val();										// 수수료수익
	var wrtErnAmt = $('#wrtErnAmt').val();											// 투자수익 
	var indTypDvdCd = $('#AS03210S_indTypDvdCd').val();								// 고위험산업
	var checkItemCd = $('#AS03210S_checkItemCd').val();								// 업무구분
	var bsnsAreaCd = $('#AS03210S_bsnsAreaCd').val();								// 사업지역
	var invstThingCcd = $('#AS03210S_invstThingCcd').val();							// 주요투자물건
	var invstThingDtlsCcd = $('#AS03210S_invstThingDtlsCcd').val();					// 투자물건상세
	var mrtgOfrF = $('#AS03210S_mrtgOfrF').val();									// 담보
	var ensrF = $('#AS03210S_ensrF').val();											// 보증
	var rspsbCmplCcd = $('#AS03210S_rspsbCmplCcd').val();							// 책임준공
	var raRsltnCcd = $('#AS03210S_raRsltnCcd').val();								// 전결구분
	var riskRcgNo = $('#AS03210S_riskRcgNo').val();									// 리스크승인번호
	var hdqtCd = $('#AS03210S_hdqtCd').val();										// 본부코드
//	var hdqtNm = $('#AS03210S_hdqtNm').val();										// 본부명
	var dprtCd = $('#AS03210S_dprtCd').val();										// 부서코드
//	var dprtNm = $('#AS03210S_dprtNm').val();										// 부서명
	var chrgPEno = $('#AS03210S_eno').val();										// 직원코드
//	var empNm = $('#AS03210S_empNm').val();											// 직원명
	var coprtnTypCd = $('#AS03210S_coprtnTypCd').val();								// 협업유형
	var cfmtEntpNm = $('#AS03210S_entpRnm').val();									// 업체명
	var bsnsDprtCmmtRmrk1 = $('#AS03210S_bsnsDprtCmmtRmrk1').val();					// 사업부의견
	var inspctDprtCmmtRmrk2 = $('#AS03210S_inspctDprtCmmtRmrk2').val();				// 심사부의견

	var paramData = {
		"riskInspctCcd": riskInspctCcd
		, "lstCCaseCcd": lstCCaseCcd
		, "inspctDprtCcd": inspctDprtCcd
		, "raDealCcd": raDealCcd
		, "invstGdsLdvdCd": invstGdsLdvdCd
		, "invstGdsMdvdCd": invstGdsMdvdCd
		, "invstGdsSdvdCd": invstGdsSdvdCd
		, "invstGdsDtlsDvdCd": invstGdsDtlsDvdCd
		, "wrtDt": wrtDt
		, "mtrtDt": mtrtDt
		, "ibDealNm": ibDealNm
		, "ibDealSnmNm": ibDealSnmNm
		, "invstCrncyCd": invstCrncyCd
		, "crncyAmt": crncyAmt
		, "invstNtnCd": invstNtnCd
		, "aplcExchR": aplcExchR
		, "ptcpAmt" : crncyAmtWn
		, "tlErnAmt": tlErnAmt
		, "rcvblErnAmt": rcvblErnAmt
		, "wrtErnAmt": wrtErnAmt
		, "indTypDvdCd": indTypDvdCd
		, "checkItemCd": checkItemCd
		, "raBsnsZoneCd": bsnsAreaCd
		, "invstThingCcd": invstThingCcd
		, "invstThingDtlsCcd": invstThingDtlsCcd
		, "mrtgOfrF": mrtgOfrF
		, "ensrF": ensrF
		, "rspsbCmplCcd": rspsbCmplCcd
		, "raRsltnCcd": raRsltnCcd
		, "riskRcgNo": riskRcgNo
		, "hdqtCd": hdqtCd
//		, "hdqtNm": hdqtNm
		, "dprtCd": dprtCd
//		, "dprtNm": dprtNm
		, "chrgPEno": chrgPEno
//		, "empNm": empNm
		, "coprtnTypCd": coprtnTypCd
		, "cfmtEntpNm": cfmtEntpNm
		, "bsnsDprtCmmtRmrk1": bsnsDprtCmmtRmrk1
		, "inspctDprtCmmtRmrk2": inspctDprtCmmtRmrk2
	};

	//console.log(paramData);

	$.ajax({
		type: "POST",
		url: "/registDealInfo",
		data: paramData,
		dataType: "json",
		success: function() {
			swal({
				title: "success!"
				
			},function(isConfirm){
				if(isConfirm){
					location.reload();
				}	
			});
		},
		error: function(errorCd) {
			swal("deal정보를 생성하는데 실패하였습니다. sql 에러 코드를 확인해주세요.\n error code:" + errorCd);
		}
	});



};



/*tab2****************************************************/
// 관련문서 초기화버튼 function
function tab2BtnReset() {
	$('#AS03210S_docNo').val('');
	$('#AS03210S_fnlDocF').val('N').prop('selected, true');
}
// 관련문서 삭제버튼 function
function tab2BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();

	if (ibDealNo != "") {
		var docNo = $('#AS03210S_docNo').val();

		//console.log(dealNo);

		var paramData = {
			"ibDealNo": dealNo
			, "docNo": docNo
		}

		$.ajax({
			type: "POST",
			url: "/deleteDocInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				getDocInfo(ibDealNo);
			},
			error: function(errorCd) {
				swal("삭제 실패하였습니다. sql 에러 코드를 확인해주세요.\n error code:" + errorCd);
			}
		});

	} else {
		swal('Deal 정보를 조회해주세요');
	}

}
// 관련문서 저장버튼 function
function tab2BtnSave() {

}

// 기초자산종류
function loadBscAstsKndCd() {
	$.ajax({
		type: "GET",
		url: "/getBscAstsKndCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_bscAstsKndCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_bscAstsKndCd').html(html);
		}
	});
};

// 법인형태
function loadCncCmpnyClsfCd() {
	$.ajax({
		type: "GET",
		url: "/getCncCmpnyClsfCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_cncCmpnyClsfCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_cncCmpnyClsfCd').html(html);
		}
	});
};

// 담보유형
function loadMrtgKndCcd() {
	$.ajax({
		type: "GET",
		url: "/getMrtgKndCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgKndCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_mrtgKndCcd').html(html);
		}
	});
};

// 담보상세
function loadMrtgDtlsCcd() {
	$.ajax({
		type: "GET",
		url: "/getMrtgDtlsCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgDtlsCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_mrtgDtlsCcd').html(html);
		}
	});
};

// 권리순위
function loadRgtRnkCcd() {
	$.ajax({
		type: "GET",
		url: "/getRgtRnkCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_rgtRnkCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_rgtRnkCcd').html(html);
		}
	});
};

// 미이행시의무
function loadDbtNpFrmOblgCcd() {
	$.ajax({
		type: "GET",
		url: "/getDbtNpFrmOblgCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_dbtNpFrmOblgCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_dbtNpFrmOblgCcd').html(html);
		}
	});
};



