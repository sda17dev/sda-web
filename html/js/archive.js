/*
Theme Name: Seoul Digital Archive
Author: css3studio
Version:2.0
*/
var $ = jQuery;
var header_height;
var fontSize;
var device_status = "";
var main_min_height = 640;

$(window).resize(function() {
	fontSize = parseFloat($("html").css("fontSize"));
	//브라우져 사이즈 변화에 따른 실시간 반응
	var dw = $(document).width();
	if(dw < 768 && device_status == "pc"){	//PC에서 모바일로 변경시
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else if(dw >= 768 && device_status == "mobile"){	//모바일에서 PC로 변경시
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
});

$(window).scroll(function(e){
	//헤더 고정
	if($("body").hasClass('pc')){
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
		} else if(!$("header").hasClass("fixed")) {		//서브화면
			if ($(window).scrollTop() > 0){
				$("#main_wrap").addClass("scrolling");
				$("#main-content").css("paddingTop",header_height);
			} else{
				$("#main_wrap").removeClass("scrolling");
				$("#main-content").css("paddingTop",0);
			}
		}
	}
});

$(document).ready(function() {
	//초기 로딩시 브라우저 사이즈
	var dw = $(document).width();
	if(dw < 768){	//모바일
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else{	//PC
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
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
	/* jquery ui init */
	$(".tkg01").buttonset();
	$(".ng07 select").selectmenu();
	$(".cf10 select").selectmenu();
	$( ".fc13" ).tabs();
	
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
		open_popup("#popup_category");
		return false;
	});
	//탐색 뷰 슬라이드
	$('.ib03 .slide').on('init', function(){
		$('.ib03 .slide li a img').each(function(){
			 if($(this).width() > $(this).height()){
				$(this).css({
					width:'21.25rem',
					height:'auto'
				});
			 }else{
				 $(this).css({
					height:'22.75rem',
					width:'auto'
				});
			}
		});
	});
	$('.ib03 .slide').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		focusOnSelect: true,
		centerMode: true,
		centerPadding:'1rem',
		variableWidth: true,
		appendDots:".ib03 .paging",
		customPaging: function (slider, i) {
			return  '<b>' + (i + 1) + '</b>/' + slider.slideCount;
		}
	});
	$(".ib03 .imgScale a.enlarge").bind('click', function() {	//확대
		$target = $(".ib03 .slide li.slick-current img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale += 0.1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
	});
	$(".ib03 .imgScale a.reduce").bind('click', function() {	//축소
		$target = $(".ib03 .slide li.slick-current img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale -= 0.1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
	});
	$(".ib03 .imgScale a.full").bind('click', function() {	//화면전체
		$(".ib03 .fullImage").fadeIn();
		var $source = $(".ib03 .slide li.slick-current img");
		view_in_full($source);
		return false;
	});
	$(".ib03 .fullImage a.close").bind('click', function() {	//전체화면 닫기
		$(".ib03 .fullImage").fadeOut();

		return false;
	});
	$(".ib03 .fullImage a.next").bind('click', function() {	//다음이미지
		$('.ib03 .slide').slick("slickNext");
		var $source = $(".ib03 .slide li.slick-current img");
		$(".ib03 .fullImage .thumb img").fadeOut("fast",function() {
			view_in_full($source);
			$(".ib03 .fullImage .thumb img").fadeIn();
		});
		return false;
	});
	$(".ib03 .fullImage a.prev").bind('click', function() {	//다음이미지
		$('.ib03 .slide').slick("slickPrev");
		var $source = $(".ib03 .slide li.slick-current img");
		$(".ib03 .fullImage .thumb img").fadeOut("fast",function() {
			view_in_full($source);
			$(".ib03 .fullImage .thumb img").fadeIn();
		});
		return false;
	});
	function view_in_full($source) {	//전체화면
		var $target = $(".ib03 .fullImage .thumb img");
		$target.attr("src",$source.attr("src"));
		 if($source.width() > $source.height()){
			$target.css({
				width:'100%',
				height:'auto'
			});
		 }else{
			 $target.css({
				height:'100%',
				width:'auto'
			});
		}
	}
	
	//콜렉션 메인 슬라이드
	$('.ib04 .slide').slick({
		dots: true,
		infinite: true,
		initialSlide:0,
		adaptiveHeight:true,
		speed: 300
	});
	//용산디지털 전시 뷰 슬라이드
	$('.ib05 .picSlide .slide').on('init', function(){
		$('.ib05 .picSlide .slide li dt img').each(function(){
			 if($(this).width() > $(this).height()){
				$(this).css({
					width:'80%',
					height:'auto'
				});
			 }else{
				 $(this).css({
					height:'80%',
					width:'auto'
				});
			}
		});
	});
	$('.ib05 .picSlide .slide').slick({
		dots: false,
		infinite: false,
		initialSlide:0,
		fade:true,
		speed: 300,
		dots:true,
		asNavFor: '.ib05 .pagingSlide .slide'
	});
	$('.ib05 .pagingSlide .slide').slick({
		dots: false,
		infinite: false,
		speed: 300,
		prevArrow : ".ib05 .pagingSlide .slideControl .prev",
		nextArrow : ".ib05 .pagingSlide .slideControl .next",
		asNavFor: '.ib05 .picSlide .slide',
		slidesToShow: 1,
		focusOnSelect: true,
		centerMode: true,
		variableWidth: true
	});
	$(".ib05 .picSlide .imgScale a.enlarge").bind('click', function() {	//확대
		$target = $(".ib05 .picSlide li.slick-current dt img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale += 0.1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
	});
	$(".ib05 .picSlide .imgScale a.reduce").bind('click', function() {	//축소
		$target = $(".ib05 .picSlide li.slick-current dt img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale -= 0.1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
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
		return false;
	});
	$('.pp01 .closeB').on('click', function() {
		$('.pp01').hide();
		return false;
	});
	
	//팝업 - 회원유형 변경
	$(".memberList .btn03").bind('click', function() {
		open_popup("#popup_member_type");
		return false;
   });
	//팝업 - 문의신청 완료 확인
	$("#popup_inquery_sended .submit button").bind('click', function() {
		$('.pp01').hide();
		return false;
   });
	//팝업 - 오류보고 팝업 열기
	$(".tc11 .topBtn a.open").bind('click', function() {
		$(".tc11").removeClass("closed");
		$(".tc11").addClass("opened");
		return false;
   });
	$(".tc11 .topBtn a.close").bind('click', function() {
		$(".tc11").removeClass("opened");
		$(".tc11").addClass("closed");
		return false;
   });
	//팝업 - 정보오류보고 팝업 열기
	$(".tc09.apply .btn02").bind('click', function() {
		$("#popup_report_data_error").show();
		return false;
   });
	$("#popup_report_data_error .inputGroup .input a.close").bind('click', function() {
		$(this).parent(".input").remove();
		return false;
   });
	
	//상세검색폼 키워드 입력란 추가
	$('.cf09 .keywords ul li.add button').on('click', function(event) {
		var ul = $(this).parents(".keywords ul");
		var index = ul.find("li").length;
		var group = "1";
		if(ul.find("li:first-child input").attr("name") == "search_d_keyword21")	group = "2";
		$('li.add',ul).before('<li class="l'+index+'"><input type="text" name="search_d_keyword'+group+index+'"/></li>');
		return false;
	});
   //검색가이드
   $('.lc06 li dt a').bind("click",function(event){
       $(this).parents(".lc06 ul").find("li").removeClass("on");
       $(this).parents(".lc06 ul li").addClass("on");
       return false;
   });
	//콜렉션 메인 사용자 즐겨찾기 모음 그리드 정렬
	var $grid01,$grid02,$grid03;
	if($('.lc07 .bookmarks').length > 0){
		$grid01 = $('.lc07 .bookmarks').masonry({
			itemSelector: '.box',
			gutter:'.gutter-sizer'
		});
		$grid01.imagesLoaded().progress( function() {
		  $grid01.masonry('layout');
		});
		$grid02 = $('.lc07 .bookmarks ul').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-item'
		});
		$grid02.imagesLoaded().progress( function() {
		  $grid02.masonry('layout');
		});
	}
	if($('.lc08').length > 0){
		$grid03 = $('.lc08').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-item'
		});
		$grid03.imagesLoaded().progress( function() {
		  $grid03.masonry('layout');
		});
	}	
   //콜렉션 뷰, 오른쪽 이미지 갤러리 선택
   $('.fc13 .lc08 li a').bind("click",function(event){
		$(this).parents(".lc08").find("li").removeClass("on");
		$(this).parents(".lc08 li").addClass("on");
		var src = $("img",$(this)).attr("src");
		$(this).parents(".fc13").find(".ib02 a img").attr("src",src);
		return false;
   });
	//연구가이드 링크이동 효과
	$(".ng13 li a").click(function(event){     
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500,"linear");
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

//팝업오픈
function open_popup(selector){	
	var $layerPopupObj = $(selector + ' .popupBox');
	var leftV = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
	var topV = ( $(window).scrollTop() + 200 );
	$layerPopupObj.css({
		left:leftV,
		top:topV
	});
	$(selector).show();
}

//PC버젼 초기화
function init_pc(){
	$("header nav").show();
	$(".mobileMenuOpen").unbind();
	$(".mobileMenuClose").unbind();
	$(".ng05>li>a").unbind();
	$(".ng05>li>dl li a").unbind();
	$(".cf04 dl dt a.mobileToggle").unbind();
	$(".ng05").show();

	//메인 배너 화면 꽉채우기
	if(window.innerHeight >= main_min_height)
		$("header.hd01").height(window.innerHeight);
	else
		$("header.hd01").height(main_min_height);
	header_height = $("header").height();

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
	
}
//모바일 버젼 초기화
function init_mobile(){
	//모바일 메뉴
	$("header nav").hide();
	$("header menu li.search a").unbind();
	$("header menu li a:not(li.search a)").unbind();
	$(".cf02 .closeBtn").unbind();
	$(".ng05>li>a").unbind();
	$(".ng05>li>dl li a").unbind();

	$("header.hd01").height(340);
	
	//헤더 LNB 메뉴(mobile)
	$("header .mobileMenuOpen").bind("click",function(){
		$("header nav").slideDown();
		$("header").addClass("open");
	});
	$("header .mobileMenuClose").bind("click",function(){
	   $("header nav").slideUp();
		$("header").removeClass("open");
	});
	//관리자 메뉴 열기/닫기
	$(".ng12 .mobileMenuOpen").bind('click', function() {
		$(".ng05").slideDown("fast");
		$(".ng12 .mobileMenuOpen").css("display","none");
		$(".ng12 .mobileMenuClose").css("display","inline-block");
	});
	$(".ng12 .mobileMenuClose").bind('click', function() {
		$(".ng05").slideUp("fast");
		$(".ng12 .mobileMenuOpen").css("display","inline-block");
		$(".ng12 .mobileMenuClose").css("display","none");
	});
	//관리자 메뉴	
	$(".ng05>li>a").click(function(){	//1depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		
		if($(".fc05").hasClass("viewMode")){
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
		}else{
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
		}
		$(".ng05 li li").removeClass("on");
		return false;
	});
	$(".ng05>li>dl li a").click(function(){	//2depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		if($(".fc05").hasClass("twoMode")){
			$(".fc05").removeClass("twoMode").removeClass("oneMode");
			$(".fc05").addClass("viewMode");
		}
		$(".ng05").slideUp();
		$(".ng12 .mobileMenuOpen").css("display","inline-block");
		$(".ng12 .mobileMenuClose").css("display","none");
		return false;
	});
	//패싯검색 모바일 모드
	$(".cf04 dl dt a.mobileToggle").click(function(){
		var dl = $(this).parents("dl");
		if(dl.hasClass("mobileClosed"))	dl.removeClass("mobileClosed");
		else dl.addClass("mobileClosed");
		return false;
	});
}

//폼 유효성 검사
function form_validation(){
	//헤더 검색창
	$(".cf02").bind('submit', function() {
		var input = $("input",$(this));
		if(input.val().trim() == ""){
			alert("검색어를 입력해 주세요");
			input.focus();
			return false;
		}
		else
			return true;
	});	

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
	$(".cf11.inquery").validate({
		onkeyup: function(element) {$(element).valid()},
		onclick: function(element) {$(element).valid()},
		submitHandler: function() {
			open_popup("#popup_inquery_sended");
			return false;
		},
		rules: {
			inquery_name: "required",
			inquery_email: {
				required: true,
				email: true
			},
			inquery_phone: "required",
			inquery_field: "required",
			inquery_content: "required"
		},
		messages: {
			inquery_name: "",
			inquery_email: "",
			inquery_phone: "",
			inquery_field: "",
			inquery_content: ""
		}
	});
	$("#popup_report_error .cf08").validate({
		rules: {
			error_email: {
				required: true,
				email: true
			},
			error_desc: "required"
		},
		messages: {
			error_email: "",
			error_desc: ""
		}
	});
}

