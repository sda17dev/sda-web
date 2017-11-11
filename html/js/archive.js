/*
Theme Name: Seoul Digital Archive
Author: css3studio
Version:2.0
*/
var $ = jQuery;
var header_height;
var fontSize;
var main_min_height = 640;

$(window).resize(function() {
	fontSize = parseFloat($("html").css("fontSize"));
	if(window.innerHeight >= main_min_height)
		$("header.hd01").height(window.innerHeight);
	else
		$("header.hd01").height(main_min_height);
	header_height = $("header").height();
});

$(window).scroll(function(e){
	//헤더 고정
	if ($("#main_wrap").hasClass("mainPage")){	//메인화면
		if ($(window).scrollTop() > header_height){
			$("header").removeClass("hd01");
			$("header").addClass("hd02");
			$("#main_wrap").addClass("scrolling");
			$("#main-content").css("paddingTop",header_height + (fontSize * 3));
		} else{
			$("header").removeClass("hd02");
			$("header").addClass("hd01");
			$("#main_wrap").removeClass("scrolling");
			$("#main-content").css("paddingTop","3rem");
		}
	} else {		//서브화면
		if ($(window).scrollTop() > 0){
			$("#main_wrap").addClass("scrolling");
			$("#main-content").css("paddingTop",header_height);
		} else{
			$("#main_wrap").removeClass("scrolling");
			$("#main-content").css("paddingTop",0);
		}
	}
});

$(document).ready(function() {
	if(window.innerHeight >= main_min_height)
		$("header.hd01").height(window.innerHeight);
	else
		$("header.hd01").height(main_min_height);
	header_height = $("header").height();
	fontSize = parseFloat($("html").css("fontSize"));
	//폼요소 스타일링
	$(".cf02 select").selectmenu({
		change: function( event, data ) {
			if(data.item.value == "0")
				$(".cf02 button").text("웹사이트에서 검색");
			else
				$(".cf02 button").text("기록에서 검색");
		}
	});
	$(".tkg01").buttonset();
	$(".ng07 select").selectmenu();
	//검색창 제어
	$("header menu li.search a").click(function(){
		$("header").addClass("searchMode");
		return false;
	});
	$("header menu li a:not(li.search a)").click(function(){
		$("header").removeClass("searchMode");
		return false;
	});
	$(".cf02 .closeBtn").click(function(){
		$("header").removeClass("searchMode");
		return false;
	});
	
	//관리자 메뉴
	var sub_height = $(".ng05>li.on dl dt").outerHeight() + $(".ng05>li.on dl dd").outerHeight();
	if($(".ng05").outerHeight() < sub_height)	$(".ng05").css("height",sub_height);
	
	$(".ng05>li>a").click(function(){	//1depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		
		if($(".fc05").hasClass("viewMode")){
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
			var dl = $(this).siblings("dl");
			dl.css({
				left:"30%"
			});
			dl.animate({
				left: "80%"
			}, 300, function() {
			});
			
		}else{
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
			$(this).siblings("dl").css({
				left:"80%"
			});
		}
		$(".ng05 li li").removeClass("on");
		var sub_height = $(this).siblings("dl").find("dt").outerHeight() + $(this).siblings("dl").find("dd").outerHeight();
		if($(".ng05").outerHeight() < sub_height)	$(".ng05").css("height",sub_height);
		return false;
	});
	$(".ng05>li>dl li a").click(function(){	//2depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		if($(".fc05").hasClass("twoMode")){
			var dl = $(this).parentsUntil(".ng05>li","dl");
			dl.animate({
				left: "30%"
			}, 300, function() {
				$(".fc05").removeClass("twoMode").removeClass("oneMode");
				$(".fc05").addClass("viewMode");			
			});			
		}else{
			//$(".fc05").removeClass("twoMode").removeClass("oneMode");
			//$(".fc05").addClass("viewMode");						
		}
		
		return false;
	});
	//입력폼 파일 선택
   $("form .fake a").bind('click', function() {
       $(this).parent('.fake').siblings('.ti01').click();
   });
   $("form .ti01").bind('change', function() {
       $(this).siblings('.fake').find('span').text($(this).val());
   });
	
	//카테고리 선택 슬라이드
	$('.ib01 .slide').slick({
		dots: false,
		infinite: false,
		initialSlide:0,
		prevArrow : ".ib01 .prevB",
		nextArrow : ".ib01 .nextB",
		speed: 300,
		slidesToShow: 1,
		variableWidth: true
	});
   $(".ib01 .slide li.add a").bind('click', function() {
		var $layerPopupObj = $('#popup_category .popupBox');
		var leftV = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
		var topV = ( $(window).scrollTop() + 100 );
		$layerPopupObj.css({
			left:leftV,
			top:topV
		});
		$('#popup_category').show();
   });
	
	//팝업 - 카테고리 선택
	$('#popup_category .addCat input').on('keypress', function(event) {
		var text = $(this).val();
		var index = $('#popup_category ul li').length + 1;
		if(event.which == 13){
			if(text.length < 1){
				alert("카테고리를 입력하세요!")
			}else{
				$('#popup_category ul').append('<li><input type="checkbox" name="category_name" id="category_name' + index + '" value="' + text + '"/><label for="category_name' + index + '">' + text + '</label></li>');
				$(this).val('');
				$('#popup_category ul').scrollTop($('#popup_category ul').height());	
			}
			event.preventDefault();
		}
	});
	$('#popup_category .submit button').on('click', function() {
		var index = $('.ib01 .slide li').length - 2;
		$('#popup_category ul li input:checked').each(function(){
			if(check_overlap($(this).val())){
				var a = $('<a/>').attr("href","#").text($(this).val());
				var li = $('<li/>').append(a);
				$('.ib01 .slide').slick('slickAdd',li,index);
				index++;
			}
		});
		$('#popup_category').hide();
	});
	$('#popup_category .closeB').on('click', function() {
		$('#popup_category').hide();
	});
	
	
	//입력폼 유효성 검사
	form_validation();
	
});

function check_overlap(category){	//중복체크
	$('.ib01 .slide li a').each(function(){
		if($(this).text() == category) return false;
		//console.log($(this).text() + "=="+ category);
	})
	return true;
}

function form_validation(){
	$(".cf05.join").validate({
		rules: {
			join_email: {
				required: true,
				email: true
			},
			join_pw: {
				required: true,
				minlength: 8
			},
			join_pw2: {
				equalTo: "#join_pw"
			},
			join_agree1: "required",
			join_agree2: "required"
		},
		messages: {
			join_email: "올바른 이메일 주소를 입력하세요",
			join_pw: "적절한 비밀번호를 입력하세요",
			join_pw2: "입력한 비밀번호가 일치하지 않습니다",
			join_agree1: "[동의 필요]",
			join_agree2: "[동의 필요]"
		}
	});
	$(".cf05.login").validate({
		rules: {
			login_email: {
				required: true,
				email: true
			},
			login_pw: {
				required: true,
				minlength: 8
			}
		},
		messages: {
			login_email: "올바른 이메일 주소를 입력하세요",
			login_pw: "적절한 비밀번호를 입력하세요"
		}
	});
	$(".cf05.resetPassword").validate({
		rules: {
			reset_email: {
				required: true,
				email: true
			}
		},
		messages: {
			reset_email: "올바른 이메일 주소를 입력하세요"
		}
	});
	$(".cf05.resetPassword2").validate({
		rules: {
			reset_pw: {
				required: true,
				minlength: 8
			},
			reset_pw2: {
				equalTo: "#reset_pw"
			}
		},
		messages: {
			reset_pw: "적절한 비밀번호를 입력하세요",
			reset_pw2: "입력한 비밀번호가 일치하지 않습니다"
		}
	});
	$(".cf07.noticeWrite").validate({
		rules: {
			notice_title: "required",
			notice_summery: "required",
			notice_content: "required",
			notice_target: "required"
		},
		messages: {
			notice_title: "제목을 입력해 주세요",
			notice_summery: "요약내용을 입력해 주세요",
			notice_content: "내용을 입력해 주세요",
			notice_target: "발행할 대상을 선택해 주세요"
		}
	});
}

