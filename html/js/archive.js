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
	
	//입력폼 유효성 검사
	form_validation();
	
	
	/*
	$(".ng04 select").selectmenu();

	$(".tc02 dd a").mouseenter(function(){
		$(this).next().fadeIn();
	});
	$(".tc02 dd a").mouseleave(function(){
		$(this).next().fadeOut();
	});
	//열람하기
	$(".ng08 li.open a").click(function(){
		$(".etc01").slideDown();
		return false;
	});
	$(".etc01 a.close").click(function(){
		$(".etc01").slideUp();
		return false;
	});
	*/
});

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
}

