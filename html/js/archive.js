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
	$(".ng05>li>a").click(function(){
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
			}, 500, function() {
			});
			
		}else{
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
			$(this).siblings("dl").css({
				left:"80%"
			});
		}
		$(".ng05 li li").removeClass("on");
		return false;
	});
	$(".ng05>li>dl li a").click(function(){
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		if($(".fc05").hasClass("twoMode")){
			var dl = $(this).parentsUntil(".ng05>li","dl");
			dl.animate({
				left: "30%"
			}, 500, function() {
				$(".fc05").removeClass("twoMode").removeClass("oneMode");
				$(".fc05").addClass("viewMode");			
			});			
		}else{
			//$(".fc05").removeClass("twoMode").removeClass("oneMode");
			$(".fc05").addClass("viewMode");						
		}
		
		return false;
	});
	
	
	
	
	
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


