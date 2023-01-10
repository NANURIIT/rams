$(document).ready(function() {

	setKeyFunction_AS03010S();

});





function setKeyFunction_AS03010S() {
	$("input[id=AS03010S_FromDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			/*assignmentSearch(); 검색 명령어*/
		}
	})
	$("input[id=AS03010S_ToDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			/*assignmentSearch(); 검색 명령어*/
		}
	});
	$("input[id=AS03010S_부서명]").keyup(function(key) {
		if (key.keyCode == 13) {
			/*assignmentSearch(); 검색 명령어*/
		}
	});
	$("input[id=AS03010S_통화명]").keyup(function(key) {
		if (key.keyCode == 13) {
			/*assignmentSearch(); 검색 명령어*/
		}
	});
	$("input[id=AS03010S_단위명]").keyup(function(key) {
		if (key.keyCode == 13) {
			/*assignmentSearch(); 검색 명령어*/
		}
	});
	$("input[id=AS03010S_dealNm]").keyup(function(key) {
		if (key.keyCode == 13) {
			/*assignmentSearch(); 검색 명령어*/
		}
	});
};

function checkDealSearch(){
	let AS03010S_FromDate = $('#AS03010S_FromDate').val();
	let AS03010S_ToDate = $('#AS03010S_ToDate').val();
	let AS03010S_dprtCd = $('#AS03010S_dprtCd').val();
	let AS03010S_invstCrncyCd = $('#AS03010S_invstCrncyCd').val();
	let AS03010S_unit = $('#AS03010S_unit').val();
	let AS03010S_dealNm = $('#AS03010S_dealNm').val();
	
	
	 /*|| !isEmpty(AS03010S_dprtCd) ||!isEmpty(AS03010S_invstCrncyCd) ||!isEmpty(AS03010S_unit) || !isEmpty(AS03010S_dealNm)) */
	if (!isEmpty(AS03010S_FromDate) || !isEmpty(AS03010S_ToDate)){
		businessFunction();
	} else{
		swal("Error!", "필수 조건을 입력해주세요", "error", "confirm");
	}
	
	function businessFunction(){
		var dtoParam = {
					 "start": AS03010S_FromDate
			,		   "end": AS03010S_ToDate
			, 		"dprtCd": AS03010S_dprtCd
			, "invstCrncyCd": AS03010S_invstCrncyCd
			,		  "unit": AS03010S_unit
			,		"dealNm": AS03010S_dealNm
		};
		
		$.ajax({
			type: "GET",
			url: "/checkDealSearch",
			data: dtoParam,
			dataType: "json",
			success: function(data){
				var html = '';
				var dealList = data;
				$('#AS03010S_checkDealList').html(html);
				console.log(dealList);
				if (dealList.length>0){
					$.each(dealList, function(key, value){
						html += '<tr>';
						html += '<td>' + value.ibDealNo + '</td>'; // deal번호
						html += '<td>' + (value.dscDt).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') + '</td>'; // DSC일자
						html += '<td>' + value.ibDealNm + '</td>'; // deal명
						html += '<td>' + value.ptcpAmt + '</td>'; // 참여금액
						html += '<td>' + value.wrtDt + '</td>'; // 기표일(예정)
						html += '<td>' + value.mtrtDt + '</td>'; // 만기일(예정)
						html += '<td>' + value.hdqtCd + '</td>'; // 본부
						html += '<td>' + value.dprtCd + '</td>'; // 부서
						html += '<td>' + value.chrgPEno + '</td>'; // 직원
						html += '<td>' + value.coprtnTypCd + '</td>'; // 협업유형
						html += '<td>' + value.tlErnAmt + '</td>'; // 전체수익
						html += '<td>' + value.rcvblErnAmt + '</td>'; // 수수료수익
						html += '<td>' + value.wrtErnAmt + '</td>'; // 투자수익
						html += '<td>' + value.entpRnm + '</td>'; // 업체명
						html += '<td>' + value.crdtGrdCd + '</td>'; // 신용등급
						html += '<td>' + value.gdsDvd1Nm + '</td>'; // 상품1
						html += '<td>' + value.gdsDvd2Nm + '</td>'; // 상품2
						html += '<td>' + value.gdsDvd3Nm + '</td>'; // 상품3
						html += '<td>' + value.gdsDvd4Nm + '</td>'; // 상품4
						html += '<td>' + value.invstNtnCd + '</td>'; // 투자국가
						html += '<td>' + value.invstCrncyCd + '</td>'; // 투자통화
						html += '<td>' + value.crncyAmt + '</td>'; // 통화금액
						html += '</tr>';
					})
				} else {
					html += '<tr>';
					html += '<td colspan="22" style = "text-align: center"> 데이터가 없습니다.</td>';
					html += '</tr>';
					}
					$('#AS03010S_checkDealList').html(html);
			}
		});
	}
};
