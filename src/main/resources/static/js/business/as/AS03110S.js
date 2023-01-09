$(document).ready(function() {

	setKeyFunction_AS03110S();

});

function setKeyFunction_AS03110S() {

	$("input[id=AS03110S_FromDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			assignmentSearch();
		}
	})
	$("input[id=AS03110S_ToDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			assignmentSearch();
		}
	});
};

function assignmentSearch() {

	let AS03110S_FromDate = $('#AS03110S_FromDate').val();
	let AS03110S_ToDate = $('#AS03110S_ToDate').val();

	if (!isEmpty(AS03110S_FromDate) || !isEmpty(AS03110S_ToDate)) {
		businessFunction();
	} else {
		swal("Error!", "접수배정일을 입력해 주세요.", "error", "confirm");
	}

	function businessFunction() {

		var dtoParam = {
			"start": AS03110S_FromDate
			, "end": AS03110S_ToDate
		};

		$.ajax({
			type: "GET",
			url: "/assignmentSearch",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#AS03110S_ibDealList').html(html);

				//console.log(dealList);

				if (dealList.length > 0) {
					$.each(dealList, function(key, value) {
						//console.log(key)
						//console.log( 'key:' + key + ' / ' + 'value:' + value ); 
						//console.log(value.fstRgstDt)
						//console.log((value.fstRgstDt).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'));
						html += '<tr>';
						html += '<td>' + (value.fstRgstDt).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') + '</td>'; // 접수배정일
						html += '<td>' + value.ibDealNo + '</td>'; // deal번호
						html += '<td>' + value.riskInspctCcd + '</td>'; // 신규/재부의
						html += '<td>' + value.lstccaseCcd; + '</td>'; // 부수안건
						html += '<td>' + value.ibDealNm + '</td>'; // 안건명
						html += '<td>' + value.ownpEno + '</td>'; // 심사역
						html += '<td>' + value.hdqtCd + '</td>'; // 본부
						html += '<td>' + value.dprtNm + '</td>'; // 부서
						html += '<td>' + value.chrgpEno + '</td>'; // 직원
						html += '<td>' + value.coprtnTypCd + '</td>'; // 현업유형
						html += '</tr>';
					})
				} else {
					html += '<tr>';
					html += '<td colspan="10" style = "text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}

				$('#AS03110S_ibDealList').html(html);
			}

		});
	}
};
