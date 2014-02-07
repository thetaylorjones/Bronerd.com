(function($) {

	function is_touch_device() {
	  return !!('ontouchstart' in window) // works on most browsers
		  || !!('onmsgesturechange' in window); // works on ie10
	};


	// TWITTER INIT
	/* twitter(); */


	// SLIDERS INIT
    $(window).load(function() {
      $('.devices').flexslider({
        animation: "fade",
        directionNav: false,
        manualControls: ".devices-nav li",
        slideshow: false
      });
      $('#home-slider').flexslider({
        animation: "fade",
        controlNav: true,
        directionNav: false,
        slideshowSpeed: 5000,
        animationSpeed: 500
      });
      $('.testimonials-slider').flexslider({
        animation: "fade"
      });
      $('.tweet').flexslider({
        animation: "fade",
        selector: ".tweet_list > li",
      });
      $('.project-slider').flexslider({
        animation: "slide",
      });
      $('.clients-carousel').flexslider({
        animation: "slide",
        itemWidth: 190,
        controlNav: false,
        directionNav: false,
        useCSS: false
      });
    });

	// Fullscreen home
	function homeHeight() {
		var windowheight = $(window).height();
			navbarheight = $("#navbar").outerHeight();
			home = $('#home');

		if ( home.hasClass("home-fullscreen") && $("#navbar").hasClass("nav-home-bottom")) {
			home.css('height', windowheight - navbarheight);
		} else
		if ( home.hasClass("home-fullscreen") ) {
			$('#home').css('height', windowheight);
		}

		if (windowheight < 600) {
			$(".logo-home").hide();
		} else {
			$(".logo-home").show();
		}
	};


	$(window).load(function() {
		var homeTextHeight = $("#home-slider").height()
		$(".home-text").css("height", homeTextHeight + 18 + 60)
	});

	function navBarf() {
		var navbar = $("#navbar")
		$(window).scroll(function() {
		if (navbar.hasClass("nav-fixed") && navbar.hasClass("nav-home-top") && $(window).scrollTop() >= 1) {
			navbar.addClass("nav-fixed-fixed");
		} else {
			navbar.removeClass("nav-fixed-fixed");
		}
		});

		if (navbar.hasClass("nav-home-top")) {
			$(".main-nav ul li:first-child a").addClass("active");
			$(".main-nav ul li ul li a").removeClass("active");
			$(".logo-home").css("display", "none");
		}

		if (navbar.hasClass("nav-home-bottom")) {
			navbar.addClass("submenu-up");
		}

		$(window).scroll(function() {
		if (navbar.hasClass("nav-home-bottom") && $(window).scrollTop() >= 130) {
			navbar.removeClass("submenu-up");
		} else if (navbar.hasClass("nav-home-bottom")) {
			navbar.addClass("submenu-up");
		}
		});
	};

	// Counting
	function counting() {
		$('.count-item').waypoint(function() {
	    	$('.counter').countTo();
	    	$('.counter').removeClass('counter');
		}, { offset: '90%' })
	};

	// Fixed navbar
	function fixedNavbar() {
		var navbar = $("#navbar")
			sidebarTrigger = $("#st-trigger-effects")
		if (navbar.hasClass("nav-fixed")) {
			navbar.scrollToFixed();
		};

		if (sidebarTrigger.hasClass("nav-fixed")) {
			sidebarTrigger.scrollToFixed();
		};
  	};

  	// Navbar scroll to
  	function scrollToNavbar() {
  		$('.main-nav ul li a').click( function(e) {
  			var href = $(this).attr('href');
  			if (href == '#' || href == '') {
  				e.preventDefault();
  			}
  		});
  		$.scrollIt();
  	};

  	// Contact form validation
  	function contactFormValid() {
		$('form#contact-form').submit(function() {
			$('form#contact-form .alert').remove();
			var hasError = false;
			$('.requiredField').each(function() {
				if(jQuery.trim($(this).val()) == '') {
	            	var labelText = $(this).prev('span').text();
	            	$(this).addClass('input-error');
	            	$(this).parent().find('span').addClass('input-error');
	            	hasError = true;
	            } else if($(this).hasClass('email')) {
	            	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	            	if(!emailReg.test(jQuery.trim($(this).val()))) {
	            		var labelText = $(this).prev('span').text();
	            		$(this).addClass('input-error');
	            	$(this).parent().find('span').addClass('input-error');
	            		hasError = true;
	            	}
	            }
			});
			if(!hasError) {
				$('form#contact-form .btn-submit').fadeOut(1, function() {
					$(this).parent().append('<input tabindex="5" value="Sending..." class="btn-submit btn">');
				});
				var formInput = $(this).serialize();
				$.post($(this).attr('action'),formInput, function(data){
					$('form#contact-form').slideUp("fast", function() {
						$(this).before('<div class="alert alert-success">Your email was successfully sent!</div>');
					});
				});
			}

			return false;
		});
	};



	// Portfolio filtering
	function filtering() {
		$(window).load(function(){
			// cache container
			var $container = $('.portfolio-items-container');
			// initialize isotope
			$container.isotope({
			  resizesContainer: true,
			});

			// filter items when filter link is clicked
			$('#filters a').click(function(){
			  var selector = $(this).attr('data-filter');
			  $container.isotope({ filter: selector });

			  //active classes
			  $('#filters li a').removeClass('active');
			  $(this).addClass('active');

			  return false;
			});

		});
	};



	// Contact form labels
	function labelBetter() {
	    $("input.label-better").label_better({
	    position: "top",
	    animationTime: 100,
	    // easing: "ease-in-out",
	     offset: 60,
	    // hidePlaceholderOnFocus: true
	    });
	    $("textarea.label-better").label_better({
	    position: "top",
	    animationTime: 100,
	    // easing: "ease-in-out",
	     offset: 160,
	    // hidePlaceholderOnFocus: true
	    });
    };

	$.fn.hasAttr = function(name) {
			return this.attr(name) !== undefined;
	};

    function projectLoad() {
    	var projectItem = $('.portfolio-item a');
    		error = "<span class=\"project-error\">Project does not exist</span>";
    		loader = "<span class=\"project-loader\">Loading...</span>";

    	projectItem.click(function() {
    		var href = $(this).attr('href');
    			container = $("#project-container");
    			lightbox = "data-lightbox";


			    if(!$(this).hasAttr(lightbox)) {

	    			if ($(this).children().hasClass("active-project")) {

	    				return false;

	    			} else {

			    		// $("body").scrollTo("#project-container", 500, function(){
			    			$('html, body').animate({ scrollTop: container.offset().top -40}, 500);
			    			container.slideUp(500).addClass("project");

			    			setTimeout(function() {
		    				  container.after(loader);
							  container.empty();
							}, 500);

			    			setTimeout(function() {
			    			container.load(href, function(response, status) {
			    				if (status == "error") {
			    					container.append(error).slideDown(500);
			    				} else {
			    					container.slideDown(500);
			    				}
			    				$(".project-loader").remove();
			    			})
							}, 500);
			    		// });

	    			}

	    		projectItem.children().removeClass("active-project");
	    		$(this).children().addClass("active-project");
	    		return false;
	    		}
    	});

    	var projectNav = $(".project-nav a");

    	projectNav.click(function() {
    		container.slideUp(500);

			setTimeout(function() {
			  container.empty().removeClass("project");
			  projectItem.children().removeClass("active-project");
			}, 500);

    		return false;
    	});
    };

	function hideOnScroll() {
		$("#st-trigger-effects a").click(function(){
			var scrtop = $(window).scrollTop()
			scrtopvar = scrtop;
		});

		$(window).scroll(function() {
		var scrtop = $(window).scrollTop();
			scrolloffset = 10;
		if ($("#st-container").hasClass("st-menu-open")) {

			if (scrtopvar >= scrtop + scrolloffset || scrtopvar <= scrtop - scrolloffset) {
				$("#st-container").removeClass("st-menu-open");
			}
		}
	    });

	};

	function animations() {
		var animOffset = '90%';
			animTime = 300;

		function fDelay(selector) {
			if ($(selector).hasAttr("fade-delay")) {
				fadeDelayAttr = $(selector).attr("fade-delay")
				fadeDelay = fadeDelayAttr;
			} else {
				fadeDelay = 0;
			}
		};

		$('.fadeLeft').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1,left:"0px"},animTime);
			}, { offset: animOffset });
		});

		$('.fadeRight').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1,right:"0px"},animTime);
			}, { offset: animOffset });
		});

		$('.fadeTop').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
			  	$(this).delay(fadeDelay).animate({opacity:1,top:"0px"},animTime);
			}, { offset: animOffset });
		});

		$('.fadeBottom').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1,bottom:"0px"},animTime);
			}, { offset: animOffset });
		});

		$('.fadeIn').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1},animTime);
			}, { offset: animOffset });
		});

	};

	function fitVid() {
		$(".fit-vid").fitVids();
	};


/*
	function twitter() {
		$('.tweet').tweet({
			modpath: 'js/twitter/',
			username: 'br0nerd',
			join_text: null,
			avatar_size: null,
			count: 3,
			loading_text: 'loading twitter feed...',
			template: "{text}{time}"
		});
	};
*/


	function homeBgPlayer() {
      $(".home-bg-player").mb_YTPlayer();
    };


	//Function Initializing
	homeHeight();
	counting();
	fixedNavbar();
	scrollToNavbar();
	contactFormValid();
	labelBetter();
	filtering();
	projectLoad();
	hideOnScroll();
	animations();
	fitVid();
	navBarf();
	homeBgPlayer();

	if (!is_touch_device()) {
		var s = skrollr.init();
	}

	if (is_touch_device()) {
		$(".team-member-big, .team-member-small").click(function() {
			return false;
		});
	}


	$(window).resize(function(){
		homeHeight();
		navBarf();
	});

})(jQuery);

$(window).load(function() {
	/* $(".loader").fadeOut(); */
	$("#page-loader").fadeOut("slow");
});

