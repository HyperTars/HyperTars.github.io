/**
*	Main JavaScript
*	Author: HyperTars
*	Author URL: http://www.hypertars.com
*	Copyright © HyperTars 2020. All Rights Reserved.
**/

( function( $ ) {
	'use strict';

	window.onpageshow = function(event) {if (event.persisted) {window.location.reload() }};

	$(window).on("load", function() {

		/*
			Preloader
		*/
		const preload = $('.preloader');
		preload.find('.spinner').fadeOut(function(){
			preload.fadeOut();
		});

		/*
			Lines Animations
		*/
		$('.lines').addClass('finish');
		setTimeout(function(){
			$('.lines').addClass('ready');
		}, 1200);

		/*
			Typed Subtitle
		*/
		if(($('.typed-subtitle').length) && ($('.h-subtitle p').length > 1)){
			$('.typed-subtitle').each(function(){
				$(this).typed({
					stringsElement: $(this).prev('.typing-subtitle'),
					loop: true
				});
			});
		}

		/*
			Typed Breadcrumbs
		*/
		setTimeout(function(){
			$('.h-subtitles').addClass('ready');
			if($('.typed-bread').length){
				$('.typed-bread').typed({
					stringsElement: $('.typing-bread'),
					showCursor: false
				});
			}
		}, 1000);

		/*
			Jarallax
		*/
		if($('.jarallax').length){
			$('.jarallax').jarallax();
		}
	});

	/*
		Safari Compatibility
	*/
	if (navigator.userAgent.indexOf("Safari") > -1) {
		$('.header .head-top').css({'top': '0'});
	}

	/*
		Set full height in blocks
	*/
	const width = $(window).width();
	const height = $(window).height();

	/*
		Set Height Started Section
	*/
	$('.section.started').css({'height': height});

	/*
		Set Background Enabled
	*/
	if($('.section.started').hasClass('background-enabled')) {
		$('body').addClass('background-enabled');
	}

	/*
		Grained
	*/
	if($('#grained_container').length){
		const grained_options = {
			'animate': true,
			'patternWidth': 400,
			'patternHeight': 400,
			'grainOpacity': 0.15,
			'grainDensity': 3,
			'grainWidth': 1,
			'grainHeight': 1
		};
		grained('#grained_container', grained_options);
	}
	
	/*
		Cursor Effects
	*/
	if((width > 1199) && $('.cursor-follower').length) {
		$(window).on('mousemove', function(e){
			const x = e.pageX;
			const y = e.pageY;
			const newposX = x;
			const newposY = y;
			$('.cursor-follower').css('transform','translate3d('+newposX+'px,'+newposY+'px,0px)');
		});
		$('a, .btn-group').on({
			mouseenter: function (e) {
				cursor_over();
			},
			mouseleave: function (e) {
				cursor_out();
			}
		});
	}
	function cursor_over(){
		$(".cursor-follower-inner").stop().animate({width: 86, height: 86, opacity: 0.1, margin: '-43px 0 0 -43px'}, 500);
	}
	function cursor_out(){
		$(".cursor-follower-inner").stop().animate({width: 26, height: 26, opacity: 0.4, margin: '-13px 0 0 -13px'}, 500);
	}

	/*
		Hover Masks
	*/
	$('.hover-masks a').each(function() {
		const mask_val = $(this).html();
		$(this).wrapInner('<span class="mask-lnk"></span>');
		$(this).append('<span class="mask-lnk mask-lnk-hover">' + mask_val + '</span>');
	});

	/*
		Hover Button Effect
	*/
	$('.hover-animated .circle').on({
		mouseenter: function (e) {
			if ($(this).find(".ink").length === 0) {
				$(this).prepend("<span class='ink'></span>");
			}
			const ink = $(this).find(".ink");
			ink.removeClass("animate");
			if (!ink.height() && !ink.width()) {
				const d = Math.max($(this).outerWidth(), $(this).outerHeight());
				ink.css({
					height: d,
					width: d
				});
			}
			const x = e.pageX - $(this).offset().left - ink.width() / 2;
			const y = e.pageY - $(this).offset().top - ink.height() / 2;
			ink.css({
				top: y + 'px',
				left: x + 'px'
			}).addClass("ink-animate");
			$('.cursor-follower').addClass('hide');
		},
		mouseleave: function (e) {
			const ink = $(this).find(".ink");
			const x = e.pageX - $(this).offset().left - ink.width() / 2;
			const y = e.pageY - $(this).offset().top - ink.height() / 2;
			ink.css({
				top: y + 'px',
				left: x + 'px'
			}).removeClass("ink-animate");
			$('.cursor-follower').removeClass('hide');
		}
	});

	
	/*
		On Scroll 
	*/
	$(window).on('scroll', function(){

		/* add/remove background-enabled class */
		if ($(this).scrollTop() >= $('.section.started').height()) {
			$('body').removeClass('background-enabled');
		} else {
			if($('.section.started').hasClass('background-enabled')) {
				$('body').addClass('background-enabled');
			}
		}

		/* add/remove header/footer fixed class */
		if (($(this).scrollTop() >= 100) && ($('.section').length>1)) {
			$('.header').addClass('fixed');
			$('.footer').addClass('fixed');
			$('body').removeClass('background-enabled');
			$('.mouse_btn').fadeOut();
		}
		if (($(this).scrollTop() <= 100) && ($('.section').length>1)) {
			$('.header').removeClass('fixed');
			$('.footer').removeClass('fixed');
			$('.mouse_btn').fadeIn();
		}
		if (($(this).scrollTop() <= 100) && ($('.section').length>1) && ($('.section.started').hasClass('background-enabled'))) {
			$('body').addClass('background-enabled');
		}
		
	});


	/*
		Mouse Button Scroll
	*/
	$('.section').on('click', '.mouse_btn', function(){
		$('body, html').animate({
			scrollTop: height - 150
		}, 800);
	});
	if($('.section').length>1){
		$('.mouse_btn').show();
	}
	
	/*
		Initialize Portfolio
	*/
	const $container = $('.portfolio-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			percentPosition: true,
			itemSelector: '.box-item'
		});

		/*
			Portfolio items parallax
		*/
		if($('.portfolio-items.portfolio-new').length){
			const s_parallax = document.getElementsByClassName('post-image');
			new simpleParallax(s_parallax);
		}

	});

	/*
		Filter items on button click
	*/
	$('.filters').on('click', '.btn-group', function() {
		const filterValue = $(this).find('input').val();
		$container.isotope({ filter: filterValue });
		$('.filters .btn-group label').removeClass('glitch-effect');
		$(this).find('label').addClass('glitch-effect');
	});
	
	/*
		Gallery popup
	*/
	if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}

	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});

	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});
	
	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
            patterns: {
                youtube_short: {
                  index: 'youtu.be/',
                  id: 'youtu.be/',
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});
	
	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
		const gallery = $(this).attr('href');

		$(gallery).magnificPopup({
            delegate: 'a',
            type:'image',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery: {
                enabled: true
            }
        }).magnificPopup('open');

        return false;
    });

	/*
		Background enabled
	*/
	if($('.jarallax-video').length) {
		$('body').addClass('background-enabled');
		$('.jarallax-video').jarallax();
	}


	/*
		Iframe margins
	*/
	$('.single-post-text').each(function(){
		$(this).find('iframe').wrap('<div class="embed-container"></div>');
	});

	/*
		Resize
	*/
	$(window).resize(function() {

		/* Set full height in blocks */
		const width = $(window).width();
		const height = $(window).height();

		/* Set full height in started blocks */
		$('.section.started').css({'height': height});

		/* Dotted skills line on resize */
		const skills_dotted = $('.skills-list.dotted .progress');
		const skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}

	});

	/* WeChat QR Code */
	$('.soc-wx').hover(function() {
		$('.wxImg').css({'display': 'block'});
	}, function () {
		$('.wxImg').css({'display': 'none'});
	});

	/* Change Theme */
	$('#logo').on('click', function() {
		let bgColor = $('body').css('background-color');
		console.log(bgColor);
		if (bgColor === "rgb(255, 255, 255)") {
			// Half Transparent
			$('.section .content-box').css({'border': '1px solid rgba(255,255,255,0.1)'});
			$('.header').css({'background-color': 'rgba(0, 0, 0, 0.8)', 'box-shadow': '0 10px 15px rgba(150, 150, 150, 0.1)'});
			// Black #000
			$('body, .content-box').css({'background-color': '#000'});
			$('.icon').css({'color': '#000'});
			// Tin Grey #c8c8c8
			$('.h-title').css({'color': '#c8c8c8'});
			// Head Grey #b4b4b4
			$('#logo, .menu-item a').css({'color': '#b4b4b4'});
			// Light Grey #787878
			$('.name, .follow-label, .ion, .footer .contact p, .footer .contact p a').css({'color': '#787878'});
			// Dark Grey #3e3e3e
			$('.subtitle').css({'color': '#3e3e3e'});
			// Hover Tin Grey / Dark Grey
			$('#logo, .menu-item a').hover(function() {
				$(this).css({'color': '#e6e6e6'});
			}, function() {
				$(this).css({'color': '#b4b4b4'});
			});
			// Hover Blue / Dark Light Grey
			$('.ion, .name, .footer .contact p, .footer .contact p a').hover(function() {
				$(this).css({'color': '#3c81a8'});
			}, function() {
				$(this).css({'color': '#787878'});
			});
		} else {
			// Half Transparent
			$('.section .content-box').css({'border': '1px solid rgba(0,0,0,0.1)'});
			$('.header').css({'background-color': 'rgba(255, 255, 255, 0.8)', 'box-shadow': '0 5px 5px rgba(10, 10, 10, 0.05)'});
			// White #FFF
			$('body, .content-box').css({'background-color': '#FFF'});

			// Dark Grey #3e3e3e
			$('.h-title, .follow-label, .name, .ion, .footer .contact p, .footer .contact p a').css({'color': '#3e3e3e'});
			// Light Grey #8c8c8c
			$('.subtitle').css({'color': '#8c8c8c'});
			// Tin Grey #e6e6e6
			$('.icon').css({'color': '#e6e6e6'});
			// Head Grey #323232
			$('#logo, .menu-item a').css({'color': '#323232'});
			// Hover Black / Dark Grey
			$('#logo, .menu-item a').hover(function() {
				$(this).css({'color': '#000'});
			}, function() {
				$(this).css({'color': '#323232'});
			});
			// Hover Blue / Dark Grey
			$('.ion, .name, .footer .contact p, .footer .contact p a').hover(function() {
				$(this).css({'color': '#3c81a8'});
			}, function() {
				$(this).css({'color': '#3e3e3e'});
			});
		}
	});
	
} )( jQuery );

