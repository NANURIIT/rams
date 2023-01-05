$(document).ready(function() {

	setDatePicker();
	
	//setKeyFunction_AS03210S();
	
	loadRaDealCcd();
	loadTabContents();
	
	checkErmAmt();
	checkNumber();

});

function setDatePicker() {
	
	// #tab1_datepicker1 btn apply function
	$('#tab1_datepicker1').on('change', function() {
		var month = $("#invstPrdMmC").val();
		if (month != "") {
			calcDate();
		}
	});
	
}

// 인풋창 엔터키 검색시 페이지 스크롤이 사라지는 이슈로 미사용
function setKeyFunction_AS03210S() {

	$("input[id=AS03210S_ibDealNo]").keyup(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealList();
		}
	});
};

// deal List 가져오기
function getDealList(){
	
	let ibDealNo = $('#AS03210S_ibDealNo').val();
	
	// 유효성검사
	if(!isEmpty(ibDealNo)){
		$('#AS03210S_selectedDealNo').val();
		businessFunction();
	}else{
		swal("Error!", "Deal번호를 입력해 주세요.", "error", "confirm");
	}
	
	function businessFunction() {
		var raDealCcd = $("#AS03210S_raDealCcd").val();

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
						html += '<tr ondblclick="setTabContents(this);">';
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
	}
	
};

// 화면에서 deal Info 검색 후 더블클릭 set
function setTabContents(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// console.log(tr.html());
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();		// ibDeal번호
	$('#AS03210S_selectedDealNo').val(ibDealNo);

	setTab1(ibDealNo);
	
	//setTab2(ibDealNo);

}

// 안건구조tab setting
function setTab1(ibDealNo) {
	getDealDetailInfo(ibDealNo);
}

// 안건구조정보
function getDealDetailInfo(ibDealNo) {
	
	var paramData = {
		"ibDealNo": ibDealNo
	}
	
	$.ajax({
		type: "GET",
		url: "/getDealDetailInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var dealDetail = data;
			
			//console.log(dealDetail);
			
			$('#AS03210S_riskInspctCcd').prop("disabled", true);
			$('#AS03210S_lstCCaseCcd').prop("disabled", true);
			
			$('#AS03210S_riskInspctCcd').val(dealDetail.riskInspctCcd).prop("selected", true);				// 리스크심사구분
			$('#AS03210S_lstCCaseCcd').val(dealDetail.lstCCaseCcd).prop("selected", true);					// 부수안건
			$('#ibDealNm').val(dealDetail.ibDealNm);														// 안건명
			$('#ibDealSnmNm').val(dealDetail.ibDealSnmNm);													// 약어명
			$('#AS03210S_raRsltnCcd').val(dealDetail.raRsltnCcd).prop("selected", true);					// 전결구분
			$('#AS03210S_riskRcgNo').val(dealDetail.riskRcgNo);												// 리스크승인번호
			
			$('#AS03210S_inspctDprtCcd').val(dealDetail.inspctDprtCcd).prop("selected", true);				// 심사부서구분
			$('#AS03210S_invstGdsLdvdCd').val(dealDetail.invstGdsLdvdCd).prop("selected", true);			// 투자상품대분류
			$('#AS03210S_invstGdsMdvdCd').val(dealDetail.invstGdsMdvdCd).prop("selected", true);			// 투자상품중분류
			$('#AS03210S_invstGdsSdvdCd').val(dealDetail.invstGdsSdvdCd).prop("selected", true);			// 투자상품소분류
			$('#AS03210S_invstGdsDtlsDvdCd').val(dealDetail.invstGdsDtlsDvdCd).prop("selected", true);		// 투자상품상세분류
			
			$('#AS03210S_invstCrncyCd').val(dealDetail.invstCrncyCd).prop("selected", true);				// 부의기준통화
			$('#crncyAmt').val(dealDetail.crncyAmt);														// 부의금액
			$('#AS03210S_cntyCd').val(dealDetail.invstNtnCd).prop("selected", true);						// 투자국가
			$('#aplcExchR').val(dealDetail.aplcExchR);														// 적용환율
			$('#crncyAmtWn').val(dealDetail.ptcpAmt);														// 부의금액(원)
			
			$('#AS03210S_indTypDvdCd').val(dealDetail.indTypDvdCd).prop("selected", true);					// 고위험사업
			$('#AS03210S_checkItemCd').val(dealDetail.checkItemCd).prop("selected", true);					// 업무구분
			$('#AS03210S_bsnsAreaCd').val(dealDetail.raBsnsZoneCd).prop("selected", true);					// 사업지역
			$('#AS03210S_invstThingCcd').val(dealDetail.invstThingCcd).prop("selected", true);				// 주요투자물건
			$('#AS03210S_invstThingDtlsCcd').val(dealDetail.invstThingDtlsCcd).prop("selected", true);		// 투자물건상세
			
			$('#invstPrdMmC').val(dealDetail.invstPrdMmC);													// 투자기간(개월)
			$('#tab1_datepicker1').val(dealDetail.wrtDt);													// 기표일(예정)
			$('#mtrtDt').val(dealDetail.mtrtDt);															// 만기일(예정)
			
			$('#tlErnAmt').val(dealDetail.tlErnAmt);														// 전체수익
			$('#rcvblErnAmt').val(dealDetail.rcvblErnAmt);													// 수수료수익
			$('#wrtErnAmt').val(dealDetail.wrtErnAmt);														// 투자수익
			
			$('#AS03210S_mrtgOfrF').val(dealDetail.mrtgOfrF).prop("selected", true);						// 담보
			$('#AS03210S_ensrF').val(dealDetail.ensrF).prop("selected", true);								// 보증
			$('#AS03210S_rspsbCmplCcd').val(dealDetail.rspsbCmplCcd).prop("selected", true);				// 책임준공
			
			$('#AS03210S_bsnsDprtCmmtRmrk1').val(dealDetail.bsnsDprtCmmtRmrk1);								// 사업부의견
			$('#AS03210S_inspctDprtCmmtRmrk2').val(dealDetail.inspctDprtCmmtRmrk2);							// 심사부의견
			
			$('#AS03210S_coprtnTypCd').val(dealDetail.coprtnTypCd);											// 협업유형
			$('#AS03210S_entpRnm').val(dealDetail.cfmtEntpNm);												// 업체명
			
			var chrgPEno = dealDetail.chrgPEno;
			
			var dtoParam = {
				"empNm": ""
				, "eno": chrgPEno
				, "dprtCd": ""
				, "dprtNm": ""
				, "hdqtCd": ""
				, "hdqtNm": ""
			}

			$.ajax({
				type: "GET",
				url: "/findEmpList",
				data: dtoParam,
				dataType: "json",
				success: function(data) {
					$('#AS03210S_hdqtCd').val(data[0].HDQT_CD);												// 본부코드
					$('#AS03210S_hdqtNm').val(data[0].HDQT_NM);												// 본부코드명
					$('#AS03210S_dprtCd').val(data[0].DPRT_CD);												// 부서코드
					$('#AS03210S_dprtNm').val(data[0].DPRT_NM);												// 부서코드명
					$('#AS03210S_empNm').val(data[0].EMP_NM);												// 직원명
				}
			});/* end of ajax*/
			
		}
	});/* end of ajax*/
	
}

// 관련문서tab setting
function setTab2(ibDealNo) {
	getDocInfo(ibDealNo);
}

// 관련문서 정보
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
function checkNumber() {
	
	$('#invstPrdMmC').keyup(function(event){
		if (event.key >= 0 && event.key <= 9) {						// 1. 숫자입력 체크
			var input = $("#tab1_datepicker1").val();
			if (input != "") {										// 2. 기표일 값이 있을경우 만기일 계산
				calcDate();											// 개월수 계산하여 만기일 입력 fucntion
			}
		}
	})
	
}

// 만기일 계산
function calcDate() {
	var inputinvstPrdMmC = $("#invstPrdMmC").val();
	var inputDate = $("#tab1_datepicker1").val();

	var year = inputDate.substring(0, 4);
	var month = inputDate.substring(5, 7);
	var day = inputDate.substring(8, 10);

	var date = new Date(year, month - 1, day);

	// 2월달 날짜까지 계산됨	
	var dt = inputDate;
	var cycle = inputinvstPrdMmC;
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
			if (input1 != "") {										// 2-1. 적용환율 값이 있을경우
				var input2 = $("#crncyAmt").val();
				$("#crncyAmtWn").val(input1 * input2);
			} else {												// 2-2. 적용환율 값이 없을경우
				var input2 = $("#crncyAmt").val();
				$("#crncyAmtWn").val(input2);	
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

	// 날짜체크 정규식
	var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
	var selectedIbDealNo = $('#AS03210S_selectedDealNo').val();
	
	// deal 선택중인지 확인
	if (isEmpty(selectedIbDealNo)) {
		registDealInfo();
	} else {
		updateDealInfo();
	}

	// Deal 정보 생성
	function registDealInfo() {
		var raDealCcd = $('#AS03210S_raDealCcd').val();									// RADEAL구분코드
		var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
		var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건
		var inspctDprtCcd = $('#AS03210S_inspctDprtCcd').val();							// 심사부서구분
		var invstGdsLdvdCd = $('#AS03210S_invstGdsLdvdCd').val();						// 투자상품대분류
		var invstGdsMdvdCd = $('#AS03210S_invstGdsMdvdCd').val();						// 투자상품중분류
		var invstGdsSdvdCd = $('#AS03210S_invstGdsSdvdCd').val();						// 투자상품소분류
		var invstGdsDtlsDvdCd = $('#AS03210S_invstGdsDtlsDvdCd').val();					// 투자상품상세분류
																						// 투자기간(INVST_PRD_DY_C) : 만기일 - 기표일
		var invstPrdMmC = $('#invstPrdMmC').val();					 					// 투자기간
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
//		var hdqtNm = $('#AS03210S_hdqtNm').val();										// 본부명
		var dprtCd = $('#AS03210S_dprtCd').val();										// 부서코드
//		var dprtNm = $('#AS03210S_dprtNm').val();										// 부서명
		var chrgPEno = $('#AS03210S_eno').val();										// 직원코드
//		var empNm = $('#AS03210S_empNm').val();											// 직원명
		var coprtnTypCd = $('#AS03210S_coprtnTypCd').val();								// 협업유형
		var cfmtEntpNm = $('#AS03210S_entpRnm').val();									// 업체명
		var bsnsDprtCmmtRmrk1 = $('#AS03210S_bsnsDprtCmmtRmrk1').val();					// 사업부의견
		var inspctDprtCmmtRmrk2 = $('#AS03210S_inspctDprtCmmtRmrk2').val();				// 심사부의견

		var paramData = {
			"raDealCcd": raDealCcd
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "inspctDprtCcd": inspctDprtCcd
			, "invstGdsLdvdCd": invstGdsLdvdCd
			, "invstGdsMdvdCd": invstGdsMdvdCd
			, "invstGdsSdvdCd": invstGdsSdvdCd
			, "invstGdsDtlsDvdCd": invstGdsDtlsDvdCd
			, "invstPrdMmC": invstPrdMmC
			, "wrtDt": wrtDt
			, "mtrtDt": mtrtDt
			, "ibDealNm": ibDealNm
			, "ibDealSnmNm": ibDealSnmNm
			, "invstCrncyCd": invstCrncyCd
			, "crncyAmt": crncyAmt
			, "invstNtnCd": invstNtnCd
			, "aplcExchR": aplcExchR
			, "ptcpAmt": crncyAmtWn
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
//			, "hdqtNm": hdqtNm
			, "dprtCd": dprtCd
//			, "dprtNm": dprtNm
			, "chrgPEno": chrgPEno
//			, "empNm": empNm
			, "coprtnTypCd": coprtnTypCd
			, "cfmtEntpNm": cfmtEntpNm
			, "bsnsDprtCmmtRmrk1": bsnsDprtCmmtRmrk1
			, "inspctDprtCmmtRmrk2": inspctDprtCmmtRmrk2
		};

		//console.log(paramData);

		// 유효성검사
		if (!isEmpty(ibDealNm) && !isEmpty(crncyAmt) && !isEmpty(invstPrdMmC) && !isEmpty(wrtDt) && pattern.test(wrtDt)) {
			businessInsert();
		} else {
			swal("Error!", "필수 입력값을 확인해주세요.", "error", "confirm");
		}

		function businessInsert() {
			$.ajax({
				type: "POST",
				url: "/registDealInfo",
				data: paramData,
				dataType: "json",
				success: function() {
					swal({
						title: "deal정보를 생성하였습니다."

					}, function(isConfirm) {
						if (isConfirm) {
							location.reload();
						}
					});
				},
				error: function() {
					swal("deal정보를 생성하는데 실패하였습니다.");
				}
			});
		}
	} // end of insertDealInfo()

	// Deal 정보 갱신
	function updateDealInfo() {
		
		$('#AS03210S_riskInspctCcd').prop("disabled", false);
		$('#AS03210S_lstCCaseCcd').prop("disabled", false);
		
		var ibDealNo = selectedIbDealNo;
		var raDealCcd = $('#AS03210S_raDealCcd').val();									// RADEAL구분코드
		var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
		var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건
		var inspctDprtCcd = $('#AS03210S_inspctDprtCcd').val();							// 심사부서구분
		var invstGdsLdvdCd = $('#AS03210S_invstGdsLdvdCd').val();						// 투자상품대분류
		var invstGdsMdvdCd = $('#AS03210S_invstGdsMdvdCd').val();						// 투자상품중분류
		var invstGdsSdvdCd = $('#AS03210S_invstGdsSdvdCd').val();						// 투자상품소분류
		var invstGdsDtlsDvdCd = $('#AS03210S_invstGdsDtlsDvdCd').val();					// 투자상품상세분류
																						// 투자기간(INVST_PRD_DY_C) : 만기일 - 기표일
		var invstPrdMmC = $('#invstPrdMmC').val();					 					// 투자기간
		var wrtDt = $('#tab1_datepicker1').val();										// 기표일
		var mtrtDt = $('#mtrtDt').val();												// 만기일
		var ibDealNm = $('#ibDealNm').val();											// 안건명
		var ibDealSnmNm = $('#ibDealSnmNm').val();										// 안건약어명
		var invstCrncyCd = $('#AS03210S_invstCrncyCd').val();							// 부의기준통화
		var crncyAmt = $('#crncyAmt').val();											// 부의금액
		var invstNtnCd = $('#AS03210S_cntyCd').val();									// 투자국가
		var aplcExchR = $('aplcExchR').val();											// 적용환율
		var crncyAmtWn = $('crncyAmtWn').val();											// 부의금액(원)
		var tlErnAmt = $('#tlErnAmt').val();											// 전체수익
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
//		var hdqtNm = $('#AS03210S_hdqtNm').val();										// 본부명
		var dprtCd = $('#AS03210S_dprtCd').val();										// 부서코드
//		var dprtNm = $('#AS03210S_dprtNm').val();										// 부서명
		var chrgPEno = $('#AS03210S_eno').val();										// 직원코드
//		var empNm = $('#AS03210S_empNm').val();											// 직원명
		var coprtnTypCd = $('#AS03210S_coprtnTypCd').val();								// 협업유형
		var cfmtEntpNm = $('#AS03210S_entpRnm').val();									// 업체명
		var bsnsDprtCmmtRmrk1 = $('#AS03210S_bsnsDprtCmmtRmrk1').val();					// 사업부의견
		var inspctDprtCmmtRmrk2 = $('#AS03210S_inspctDprtCmmtRmrk2').val();				// 심사부의견

		var paramData = {
			"ibDealNo": ibDealNo
			, "raDealCcd": raDealCcd
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "inspctDprtCcd": inspctDprtCcd
			, "invstGdsLdvdCd": invstGdsLdvdCd
			, "invstGdsMdvdCd": invstGdsMdvdCd
			, "invstGdsSdvdCd": invstGdsSdvdCd
			, "invstGdsDtlsDvdCd": invstGdsDtlsDvdCd
			, "invstPrdMmC": invstPrdMmC
			, "wrtDt": wrtDt
			, "mtrtDt": mtrtDt
			, "ibDealNm": ibDealNm
			, "ibDealSnmNm": ibDealSnmNm
			, "invstCrncyCd": invstCrncyCd
			, "crncyAmt": crncyAmt
			, "invstNtnCd": invstNtnCd
			, "aplcExchR": aplcExchR
			, "ptcpAmt": crncyAmtWn
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
//			, "hdqtNm": hdqtNm
			, "dprtCd": dprtCd
//			, "dprtNm": dprtNm
			, "chrgPEno": chrgPEno
//			, "empNm": empNm
			, "coprtnTypCd": coprtnTypCd
			, "cfmtEntpNm": cfmtEntpNm
			, "bsnsDprtCmmtRmrk1": bsnsDprtCmmtRmrk1
			, "inspctDprtCmmtRmrk2": inspctDprtCmmtRmrk2
		};
		
		// 유효성검사
		if (!isEmpty(ibDealNm) && !isEmpty(crncyAmt) && !isEmpty(invstPrdMmC) && !isEmpty(wrtDt) && pattern.test(wrtDt)) {
			businessUpdate();
		} else {
			swal("Error!", "필수 입력값을 확인해주세요.", "error", "confirm");
		}
		
		function businessUpdate() {
			$.ajax({
				type: "POST",
				url: "/updateDealInfo",
				data: paramData,
				dataType: "json",
				success: function() {
					swal({
						title: "deal정보를 갱신하였습니다."

					}, function(isConfirm) {
						if (isConfirm) {
							location.reload();
						}
					});
				},
				error: function() {
					swal("deal정보를 갱신하는데 실패하였습니다.");
				}
			});
		}
		
	} // end of updateDealInfo()

};

// tab1 초기화
function tab1reset() {
	$('#AS03210S_selectedDealNo').val("");
	
	$('#ibDealNm').val("");
	$('#ibDealSnmNm').val("");
	$('#AS03210S_riskRcgNo').val("");
	$('#crncyAmt').val("");
	$('#aplcExchR').val("");
	$('#crncyAmtWn').val("");
	$('#invstPrdMmC').val("");
	$('#tab1_datepicker1').val("");
	$('#mtrtDt').val("");
	$('#tlErnAmt').val("");
	$('#rcvblErnAmt').val("");
	$('#wrtErnAmt').val("");
	$('#AS03210S_entpRnm').val("");
	$('#AS03210S_bsnsDprtCmmtRmrk1').val("");
	$('#AS03210S_inspctDprtCmmtRmrk2').val("");
	$('#AS03210S_mrtgOfrF').val("Y").prop("selected", true);
	$('#AS03210S_ensrF').val("Y").prop("selected", true);
	
	$('#AS03210S_riskInspctCcd').prop("disabled", false);
	$('#AS03210S_lstCCaseCcd').prop("disabled", false);
	
	loadTab1();
}


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



