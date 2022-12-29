/** common **/
'use strict';

/** onload **/
$(function() {

	// 사용자 정보 click
	$('.user-wrap').click(function () {
		$(this).show();
		if (!$(this).hasClass("active")) {
			$(this).addClass('active');
			$(this).find('.sub-wrap').slideDown();
		} else {
			$(this).removeClass('active');
			$(this).find('.sub-wrap').slideUp();
		}
	});

	// 비밀번호 변경 버튼 click
	$('#chgpw-btn').click(function () {
		popupChgPw();
	});

	// 비밀번호 변경 확인 버튼 click
	$('#chgpw-confirm-btn').click(function () {
		chgPw();
	});

	// 로그아웃 버튼 click
	$('#logout-btn').click(function () {
		logout();
	});
	
	
	// datepicker 초기화
	var mem = $('.input-group.date').datepicker({
	    format: "yyyy-mm-dd",
		todayBtn: "linked",
	    keyboardNavigation: false,
	    forceParse: false,
	    calendarWeeks: true,
	    autoclose: true
	});
	
	//TouchSpin
	$(".touchspin").TouchSpin({
		verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
    });

});

/**
 * 비동기 통신함수
 * @param {string} option.method ajax 전송방식
 * @param {string} option.url ajax 전송위치
 * @param {string} option.data ajax 데이터
 * @param {boolean} option.async 비동기식 처리 여부(default true)
 * @param {boolean} option.errPopShow callback Error 팝업 표출 여부 (default true)
 * @param {function} option.success ajax 전송 성공시 처리
 * @param {function} option.fail ajax 전송 실패시 처리
 */
var ajaxCall = function (option) {

	if (!optionObjChk(option)) {
		return;
	}

	// 미입력시 default값 세팅
	if(option.errPopShow == undefined || option.errPopShow == null){
		option.errPopShow = true;
	}
	if(option.method != 'GET' && option.method != 'get') {
		option.data = JSON.stringify(option.data);
	}

	if(option.async == undefined || option.async == null){
		option.async = true;
	}

	$.ajax({
	    method: option.method,
	    url: option.url,
	    data: option.data,
	    cache: false,
	    datatype: "JSON",
		async : option.async, 
	    contentType: "application/json; charset=UTF-8",
	    beforeSend : function(xhr, opt) {
	        openPopup({type:"loding",show:true});
	    },
	    error:function(request,status,error){
			openPopup({type:"loding",show:false});
			if (option.errPopShow) {
				openPopup({type:"error",title:'통신 오류',text:'오류내역 : ' + request.responseJSON.errorTx});
			}

        },
        complete:function () {
			openPopup({type:"loding",show:false});
		}
	}).then(
	    $.type(option.success) === 'function' ? option.success : function(){},
	    $.type(option.fail) === 'function' ? option.fail : function(){}
	)
};

/**
 * 엑셀 다운로드
 * @param {string} option.url 엑셀 전송위치
 * @param {string} option.data 엑셀 데이터
 */
var excelDownload = function (option) {

	if (isEmpty(option.url)) {
		openPopup({type:"error",title:'오류',text:'인자값을 정확히 입력해주세요.'});
		return;
	}

	var destinationUrl = option.url;

	if ($.type(option.data) === 'object' && !isEmpty(option.data)) {
		destinationUrl += '?' + $.param( option.data );
	}

	location.href = destinationUrl;

};

/**
 * 팝업 함수
 * @param {string} option.title 타이틀
 * @param {string} option.text 내용
 * @param {string} option.type 팝업 타입 ['success','warning','error','loding']
 * @param {boolean} option.show 팝업 표출여부 (type loading에서만 사용)
 * @param {function} option.callback 팝업 callback
 */
var openPopup = function (option) {

	if (!optionObjChk(option)) {
		return;
	}

    let _opt = {
		type : 'success',
        title : option.title,
        text : option.text,
        closeOnClickOutside : false,
        confirmButtonText : '예',
        cancelButtonText : '아니요'
    };

    if(option.type !== null) {
        _opt.type = option.type; // default success
    }

	if (_opt.type === 'success') {
		_opt.confirmButtonText = '확인';
	}
	else if(_opt.type === 'warning') {
        _opt.showCancelButton = true;
        _opt.confirmButtonColor = '#DD6B55';
        _opt.closeOnConfirm = false;
    }
    else if(_opt.type === 'error') {
		_opt.confirmButtonText = '확인';
	}

    if(_opt.type === 'success') {
        if(isEmpty(option.callback))
            swal(_opt);
        else {
            swal(_opt, function() {
                option.callback();
            });
        }
    }
    else if(_opt.type === 'warning') {
        swal(_opt, function () {
			if(!isEmpty(option.callback)) {
				option.callback();
			}
        });
    }
    else if(_opt.type === 'error') {
        swal(_opt, function () {
			if(!isEmpty(option.callback)) {
				option.callback();
			}
        });
    }
    else if (_opt.type == "loding") {
		let $target = $('#loadingModal');

		if (option.show) {
			$target.attr('style','display: block; background-color: rgba( 50, 50, 50, 0.8 );');
			$target.addClass('show');
		} else {
			$target.removeClass('show');
			$target.attr('style','');
		}
	}
    else {
        swal(_opt);
    }
};

/**
 * 페이지 함수
 * @param {number} option.thisPageNo 현재 페이지 번호
 * @param {number} option.totalDataNum 전체 데이터 개수
 * @param {string} option.functionNm 페이지 callback function명
 * @param {string} option.htmlNm 타겟html ID명
 * @param {number} option.pageDivNo 페이지 나누는 개수 (default 50)
 * @param {number} option.pageViewNo 페이지 표시 개수 (default 5)
 */
var setPage = function (option) {

	if (!optionObjChk(option)) {
		return;
	}

	// 미입력시 default값 세팅
	if(isEmpty(option.pageDivNo)){
		option.pageDivNo = 50;
	}
	if (isEmpty(option.thisPageNo)) {
		option.thisPageNo = 1;
	}
	if (isEmpty(option.pageViewNo)) {
		option.pageViewNo = 5;
	}
	if (isEmpty(option.functionNm)) {
		option.functionNm = "void";
	}
	if (isEmpty(option.totalDataNum)) {
		option.totalDataNum = 0;
	}

	let pageHtml = "";
	let forStartNo = 0;
	let forEndNo = 0;
	let pagePrev = 0;
	let pageNext = 0;
	let totalPageNo = 0;

	pagePrev = Math.floor((option.thisPageNo-1)/option.pageDivNo)*option.pageDivNo; // 이전페이지
	pageNext = ((Math.floor((option.thisPageNo-1)/option.pageDivNo)+1)*option.pageDivNo)+1; // 이후페이지
	totalPageNo = Math.ceil(option.totalDataNum/option.pageDivNo); // 총페이지
	forStartNo = Math.floor((option.thisPageNo-1)/option.pageViewNo)*option.pageViewNo; // 페이지시작 (ex] 1~5 / 6~10 - 0 5)
	forEndNo = Math.floor((option.thisPageNo-1)/option.pageViewNo)*option.pageViewNo + option.pageViewNo; // 페이지 종료 (- 5 10)

	if(forEndNo > totalPageNo){
		forEndNo = totalPageNo;
	}
	if(pagePrev <= 0){
		pagePrev = 1;
	}
	if(pageNext > totalPageNo){
		pageNext = totalPageNo;
	}

	pageHtml += '<a class="list_prev" href="#" onclick="'+option.functionNm+'('+pagePrev+');"><</a>';
	pageHtml += '<ul>'
	
	for(var i=forStartNo; i<forEndNo; i++){
		if((i+1) == option.thisPageNo){
			pageHtml += '<li><a class="list-active" onclick="'+option.functionNm+'('+(i+1)+');">'+(i+1)+'</a></li>';
		}else{
			pageHtml += '<li><a onclick="'+option.functionNm+'('+(i+1)+');">'+(i+1)+'</a></li>';
		}
	}
	pageHtml += '</ul>'
	pageHtml += '<a class="product_list_next" onclick="'+option.functionNm+'('+pageNext+');" href="#">></a>';

	$('#'+option.htmlNm).html(pageHtml);
	$('#'+option.htmlNm).show();
};

/**
 * 모바일화면 페이지 함수
 * @param {number} option.thisPageNo 현재 페이지 번호
 * @param {number} option.totalDataNum 전체 데이터 개수
 * @param {string} option.functionNm 페이지 callback function명
 * @param {string} option.htmlNm 타겟html ID명
 * @param {number} option.pageDivNo 페이지 나누는 개수 (default 50)
 * @param {number} option.pageViewNo 페이지 표시 개수 (default 5)
 */
 var setMobilePage = function (option) {

	if (!optionObjChk(option)) {
		return;
	}

	// 미입력시 default값 세팅
	if(isEmpty(option.pageDivNo)){
		option.pageDivNo = 50;
	}
	if (isEmpty(option.thisPageNo)) {
		option.thisPageNo = 1;
	}
	if (isEmpty(option.pageViewNo)) {
		option.pageViewNo = 5;
	}
	if (isEmpty(option.functionNm)) {
		option.functionNm = "void";
	}
	if (isEmpty(option.totalDataNum)) {
		option.totalDataNum = 0;
	}

	let pageHtml = "";
	let forStartNo = 0;
	let forEndNo = 0;
	let pagePrev = 0;
	let pageNext = 0;
	let totalPageNo = 0;

	pagePrev = Math.floor((option.thisPageNo-1)/option.pageDivNo)*option.pageDivNo; // 이전페이지
	pageNext = ((Math.floor((option.thisPageNo-1)/option.pageDivNo)+1)*option.pageDivNo)+1; // 이후페이지
	totalPageNo = Math.ceil(option.totalDataNum/option.pageDivNo); // 총페이지
	forStartNo = Math.floor((option.thisPageNo-1)/option.pageViewNo)*option.pageViewNo; // 페이지시작 (ex] 1~5 / 6~10 - 0 5)
	forEndNo = Math.floor((option.thisPageNo-1)/option.pageViewNo)*option.pageViewNo + option.pageViewNo; // 페이지 종료 (- 5 10)

	if(forEndNo > totalPageNo){
		forEndNo = totalPageNo;
	}
	if(pagePrev <= 0){
		pagePrev = 1;
	}
	if(pageNext > totalPageNo){
		pageNext = totalPageNo;
	}

	pageHtml += '<ul>'
	pageHtml += '<li class="pagination_prev"><a onclick="'+option.functionNm+'('+pagePrev+');"><</a></li>';
	
	for(var i=forStartNo; i<forEndNo; i++){
		if((i+1) == option.thisPageNo){
			pageHtml += '<li class="select"><a onclick="'+option.functionNm+'('+(i+1)+');">'+(i+1)+'</a></li>';
		}else{
			pageHtml += '<li><a onclick="'+option.functionNm+'('+(i+1)+');">'+(i+1)+'</a></li>';
		}
	}

	pageHtml += '<li class="pagination_next"><a onclick="'+option.functionNm+'('+pageNext+');">></a></li>';
	pageHtml += '</ul>'

	$('.'+option.htmlNm).html(pageHtml);
	$('.'+option.htmlNm).show();
};

/**
 * 비밀번호변경 팝업
 */
var popupChgPw = function () {
	$("#chgpw-exp01").hide();
	$("#chgpw-exp02").hide();
	$("#chgpw-exp03").hide();
	$('#curPw').val('');
	$('#chgPw1').val('');
	$('#chgPw2').val('');
	$('#chgpw-modal').modal('show');
};

/**
 * 비밀번호변경
 */
var chgPw = function () {

	let curPw = $('#curPw').val();
	let chgPw1 = $('#chgPw1').val();
	let chgPw2 = $('#chgPw2').val();

	// 입력항목에 빈값이 없는지 체크
	if (isEmpty(curPw) || isEmpty(chgPw1) || isEmpty(chgPw2)) {
		openPopup({
			type : "warning",
			title : "입력 오류" ,
			text : "비밀번호를 입력해주세요."
		});
		return;
	}

	// 8자 이상의 영문, 숫자, 특수문자를 조합 비밀번호 체크 / 2개이상 사용
	let chk = 0;
	let testPw = /^[a-zA-Z0-9!@#$%^&*()?_~]{8,}$/;
	if(chgPw1.search(/[0-9]/g) != -1) {
		chk ++;
	}
	if(chgPw1.search(/[a-z]/ig)  != -1) {
		chk ++;
	}
	if(chgPw1.search(/[!@#$%^&*()?_~]/g) != -1) {
		chk ++;
	}

	if(chk < 2 || !testPw.test(chgPw1)) {
  		$("#admin-write-exp02").show();
		return false;
	}

	// 비밀번호가 동일한지 체크
	if (chgPw1 != chgPw2) {
		$("#chgpw-exp03").show();
		return;
	}

	ajaxCall({
		method : "PATCH",
		url : "/password",
		data : {
			curOperatorPassword : curPw,
			chgOperatorPassword : chgPw1
		},
		errPopShow : false,
		success : function (callback) {
			if (callback.successResult) {
				openPopup({
					title : "성공" ,
					text : "비밀번호 변경 성공했습니다. 로그인 화면으로 이동합니다.",
					type : "success",
					callback : function () {
						logout(); // 로그아웃
					}
				});
			}
		},
		fail : function (requset) {
			if (requset.responseJSON.errorCd != '1101') {
				openPopup({type:"error",title:'통신 오류',text:'오류내역 : ' + callback.errorTx});
			} else {
				$("#chgpw-exp01").show();
			}
		},
	});

};

/**
 * 로그아웃
 */
var logout = function () {
    location.href = '/logout';
};

/**
 * 옵션 파라미터 체크
 * @param {object} option object 값
 * @return {boolean} 옵션 object 여부 확인
 */
var optionObjChk = function (option) {
    if (typeof option == 'undefined' || typeof option != 'object') {
		openPopup({type:"error",title:'인자값 오류',text:'option 값이 올바르지 않습니다.'});
		return false;
	}
	return true;
};

/**
 * 공백 제거
 * @param {string} str 공백제거 필요한 string
 * @returns {string} 공백제거 후 string
 */
var removeWhiteSpace = function (str) {
    if(str.length > 0)
        return str.replace(/\s*/g, '');
    return '';
};

/**
 * 빈값 체크
 * @param {T} value 빈값체크 필요한 <T> 아무타입이나
 * @returns {boolean} 빈값 여부
 */
var isEmpty = function (value) {
    if( value == "" || value == null || value == undefined ||
    	( value != null && typeof value == "object" && !Object.keys(value).length ) ) {
		return true;
	}

	return false;
};

/**
 * 콤마 찍기
 * @param {string or number} value 콤마찍기 필요한 <string or number> 값
 * @returns {string} 세자리 ,값 표시된 콤마 String
 */
var commaStr = function (value) {

	if (typeof value != 'string' && typeof value == 'number') {
		value += ''; // 숫자 문자로 치환
	}

	let regx = new RegExp(/(-?\d+)(\d{3})/);
	let bExists = value.indexOf(".", 0);
	let strArr = value.split('.');

	while (regx.test(strArr[0])) {
		strArr[0] = strArr[0].replace(regx, "$1,$2");
	}

	if (bExists > -1) {
		value = strArr[0] + "." + strArr[1];
	} else {
		value = strArr[0];
	}

	return value;
}

/**
 * 좌측문자열 채우기
 * @param {string} str 원 문자열
 * @param {number} padLen 최대 채우고자 하는 길이
 * @param {string} padStr 채우고자하는 문자(char)
 * @returns {string} 채워진 문자열
 */
var lpadStr = function (str, padLen, padStr) {
    if (padStr.length > padLen) {
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen) {
        str = padStr + str;
    }
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
};

/**
 * 전화번호 문자 (-포맷)
 * @param {string} str 원 문자열
 * @returns {string} 포맷된 문자열
 */
var formatPhoneNo = function (str) {
	if (str == undefined || str == null) {
		str = '';
	}

	var number = str.replace(/[^0-9]/g, "");
	var phone = "";

	if (number.length < 9) {
		return number;
	} else if (number.length < 10) {
		phone += number.substr(0, 2);
        phone += "-";
        phone += number.substr(2, 3);
		phone += "-";
		phone += number.substr(5);
	} else if (number.length < 11) {
		phone += number.substr(0, 3);
		phone += "-";
		phone += number.substr(3, 3);
		phone += "-";
		phone += number.substr(6);
	} else {
		phone += number.substr(0, 3);
		phone += "-";
		phone += number.substr(3, 4);
		phone += "-";
		phone += number.substr(7);
	}

	return phone;
}

/**
 * 날짜 포맷 변경 prototype
 * @param {string} f DateFomat형태
 * @returns {string} DateFomat포맷 된 데이터
 */
Date.prototype.format = function (f) {

    if (!this.valueOf()) return " ";
    let weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    let weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return lpadStr((d.getFullYear() % 1000),2,'0'); // 년 (2자리)
            case "MM": return lpadStr((d.getMonth() + 1),2,'0'); // 월 (2자리)
            case "dd": return lpadStr((d.getDate()),2,'0'); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return lpadStr((d.getHours()),2,'0'); // 시간 (24시간 기준, 2자리)
            case "hh": return lpadStr(((h = d.getHours() % 12) ? h : 12),2,'0'); // 시간 (12시간 기준, 2자리)
            case "mm": return lpadStr((d.getMinutes()),2,'0'); // 분 (2자리)
            case "ss": return lpadStr((d.getSeconds()),2,'0'); // 초 (2자리)
            case "a/p": return d.getHours() < 12 ? "am" : "pm"; // 오전/오후 구분
            default: return $1;
        }
    });
};

/**
 * 콤마 찍기(live)
 * @param {string or number} value 콤마찍기 필요한 <string or number> 값
 * @returns {string} 세자리 ,값 표시된 콤마 String
 */
function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
	str = String(str);
	return str.replace(/[^\d]+/g, '');
} 

function inputNumberFormat(obj) {
	obj.value = comma(uncomma(obj.value));
}

function inputOnlyNumberFormat(obj) {
	obj.value = onlynumber(uncomma(obj.value));
}

function onlynumber(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1');
}  