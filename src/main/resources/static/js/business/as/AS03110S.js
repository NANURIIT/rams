$(document).ready(function() {

	setKeyFunction_AS03110S();
	trDoubleClick();

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
						
						html += '<tr>';
						html += '<td>' + (value.fstRgstDt).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') + '</td>';		// 접수배정일
						html += '<td>' + value.ibDealNo + '</td>';														// deal번호
						html += '<td>' + value.riskInspctCcd + '</td>';													// 신규/재부의
						html += '<td>' + value.lstccaseCcd; + '</td>';													// 부수안건
						html += '<td>' + value.ibDealNm + '</td>';														// 안건명
						html += '<td>' + value.ownpEno + '</td>';														// 심사역
						html += '<td>' + value.hdqtCd + '</td>';														// 본부
						html += '<td>' + value.dprtNm + '</td>';														// 부서
						html += '<td>' + value.chrgpEno + '</td>';														// 직원
						html += '<td>' + value.inspctPrgrsStCd + '</td>';												// 진행상태
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

/* 더블클릭 했을시 이동*/
function trDoubleClick() {
	$("#AS03110S_ibDealList").on('dblclick', 'tr', function () {
		var tr = $(this);
		var td = tr.children();		
		var ibDealNo = td.eq(1).text();

		var ibDealNoSearch = function (ibDealNo) {
			
			$.ajax({
				method: 'GET',
				url: '/ibDealNoSearch?ibDealNo=' + ibDealNo,
				data: JSON.stringify(ibDealNo),
				contentType: 'application/json; charset=UTF-8',
				dataType: 'json',
				success: function (data) {
					var inspctPrgrsStCdList = data;
						if (inspctPrgrsStCdList.length > 0) {
							$.each(inspctPrgrsStCdList, function(key, value) {
								inspctPrgrsStCd = value.inspctPrgrsStCd;
								//console.log(inspctPrgrsStCd);
							})
						} 
						
/*						if(inspctPrgrsStCd => 100 && inspctPrgrsStCd < 200){
							location.href = "AS03210S"; //IB/PI안건 심사요청
						} else if(inspctPrgrsStCd => 200 && inspctPrgrsStCd < 300){
							//
						} else if (inspctPrgrsStCd => 300 && inspctPrgrsStCd < 400){
							location.href = "AS04010S";	//협의체 부의 및 결과
						}*/	
						
						console.log(inspctPrgrsStCd);
						switch(inspctPrgrsStCd){
							case '100' :
							case '110' :
							case '120' :
								console.log(inspctPrgrsStCd);
								location.href = "AS03210S";
								break;
							case '200':
								//location.href = "AS03210S";
								break;
							case '300':
								location.href = "AS03210S";
								break;
						}
						
				},
				error: function (response) {
		
				}
			});
		};
		
		ibDealNoSearch(ibDealNo);
		
	})
	
};


