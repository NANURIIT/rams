$(document).ready(function() {

	keyDownEnter_AS02020P();

});

/**
 * 모달 팝업 show
 */
function callAS02020P(){
	$('#modal-AS02020P').modal('show');
}

/**
 * Enter key event
 */
function keyDownEnter_AS02020P() {

	$("input[id=AS02020P_ibDealNo]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

	$("input[id=AS02020P_ibDealNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

	$("input[id=AS02020P_datepicker1]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

};

/**
 * deal 번호 조회 ajax
 */
function getDealInfo() {

	var ibDealNo = $("#AS02020P_ibDealNo").val();
	var ibDealNm = $("#AS02020P_ibDealNm").val();
	var dscDate = $("#AS02020P_datepicker1").val();

	var dtoParam = {
		"ibDealNo": ibDealNo
		, "ibDealNm": ibDealNm
		, "dscDate": dscDate
	};

	//console.log(dtoParam);

	$.ajax({
		type: "GET",
		url: "/getDealInfo",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var html = '';
			var empList = data;
			$('#AS02020P_dealInfoList').html(html);

			if (empList.length > 0) {
				$.each(empList, function(key, value) {
					//console.log(value);
					html += '<tr ondblclick="setDealInfo();">';
					html += '<td>' + value.IB_DEAL_NO + '</td>';
					html += '<td>' + value.IB_DEAL_NM + '</td>';
					html += '<td>' + value.DSC_DT + '</td>';
					html += '<td>' + value.DPRT_NM + '</td>';
					html += '<td>' + value.EMP_NM + '</td>';
					html += '<td>' + value.ENTP_RNM + '</td>';
					html += '</tr>';
				})
			} else {
				html += '<tr>';
				html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			//console.log(html);
			$('#AS02020P_dealInfoList').html(html);
		}
	});
};

/**
 * reset
 */
function reset_AS02020P() {
	$('#AS02020P_dealInfoList').html("");
	$('#AS02020P_dealNo').val("");
	$('#AS02020P_dealNm').val("");
	$('#AS02020P_datepicker1').val("");
};

/**
 * close AS02020P modal
 */
function modalClose_AS02020P() {
	reset_AS02020P();
	$('#modal-AS02020P').modal('hide');
};

/**
 * 팝업에서 deal 번호 조회후 더블클릭
 */
function setDealInfo() {
	//tr(selected) = event.currentTarget;
	//td(selected) = event.target;
	var tr = event.currentTarget;
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();

	//console.log(ibDealNo);
	
	$('#AS03210S_ibDealNo').val(ibDealNo);
	
	reset_AS02020P();
	modalClose_AS02020P();
};
