$(document).ready(function ($) {

	"use strict";

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function () {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});
	};
	carousel();

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function () {

		$('#section-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.ftco-number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					console.log(num);
					$this.animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();



	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();

	// navigation
	var OnePageNav = function () {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#'], a.go-to-contact[href^='#'], a.go-to-courses[href^='#'], a.go-to-about[href^='#']").on('click', function (e) {
			e.preventDefault();

			var hash = this.hash,
				navToggler = $('.navbar-toggler');
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});


			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});
		$('body').on('activate.bs.scrollspy', function () {
			console.log('nice');
		})
	};
	OnePageNav();



	// open modal course
	$(".open-moda-course").on('click', function (e) {
		e.preventDefault();

		var course_uuid = $(this).find("a").attr("data-course-uuid");
		var course_title = $(this).find(".title").html();
		var course_img = $(this).find(".course-img").html();
		var course_description = $(this).find(".description").html();

		resetForm(".form-booking-course");
		$(".alert-validation").hide();
		$(".alert-validation").removeClass("alert-danger");
		$(".alert-validation").removeClass("alert-success");
		$(".alert-validation").html("");


		$("#courseModal").modal('show');
		$("#courseModal").find('.modal-title').html(course_title)
		$("#courseModal").find('.modal-img').html(course_img)
		$("#courseModal").find('.modal-description').html(course_description)
		$("#courseModal").find('.modal-course-uuid').val(course_uuid)
	});

	// submit form
	$(".confirm-submit").on('click', function (e) {
		e.preventDefault();

		var form_value = $(".form-booking-course").serialize();

		$.ajax({
			url: '/landing-page-booking',
			dataType: 'html',
			type: 'POST',
			data: form_value,
			beforeSend: function () {
				$(".confirm-submit").attr("disabled", true).text('Sending...');
			},
			success: function (response) {
				$(".alert-validation").fadeIn();
				$(".alert-validation").removeClass("alert-danger");
				$(".alert-validation").addClass("alert-success");
				$(".alert-validation").html(JSON.parse(response).success);

				$(".confirm-submit").attr("disabled", false).text('Confirm');

				resetForm(".form-booking-course");

				setTimeout(function () {
					$(".alert-validation").fadeOut();
				}, 3000)
				return false;
			},
			error: function (response) {
				$(".alert-validation").fadeIn();
				$(".alert-validation").removeClass("alert-success");
				$(".alert-validation").addClass("alert-danger");

				if (JSON.parse(response.responseText).errors) {
					$(".alert-validation").html(formatErrors(JSON.parse(response.responseText).errors));
				} else {
					$(".alert-validation").html(JSON.parse(response.responseText).error);
				}

				$(".confirm-submit").attr("disabled", false).text('Confirm');
				setTimeout(function () {
					$(".alert-validation").fadeOut();
				}, 3000)
				return false;
			}
		});
	});

	// submit form email
	$(".btn-send-mail").on('click', function (e) {
		e.preventDefault();

		var form_value = $(".form-landing-page-contact").serialize();

		$.ajax({
			url: $(".form-landing-page-contact").attr("action"),
			dataType: 'html',
			type: 'POST',
			data: form_value,
			beforeSend: function () {
				$(".btn-send-mail").attr("disabled", true).text('Sending...');
			},
			success: function (response) {
				$(".alert-validation-contact").fadeIn();
				$(".alert-validation-contact").removeClass("alert-danger");
				$(".alert-validation-contact").addClass("alert-success");
				$(".alert-validation-contact").html(JSON.parse(response).success);

				$(".btn-send-mail").attr("disabled", false).text('Confirm');

				resetForm(".form-landing-page-contact");

				setTimeout(function () {
					$(".alert-validation-contact").fadeOut();
				}, 3000)
				return false;
			},
			error: function (response) {
				$(".alert-validation-contact").fadeIn();
				$(".alert-validation-contact").removeClass("alert-success");
				$(".alert-validation-contact").addClass("alert-danger");

				if (JSON.parse(response.responseText).errors) {
					$(".alert-validation-contact").html(formatErrors(JSON.parse(response.responseText).errors));
				} else {
					$(".alert-validation-contact").html(JSON.parse(response.responseText).error);
				}

				$(".btn-send-mail").attr("disabled", false).text('Confirm');
				setTimeout(function () {
					$(".alert-validation-contact").fadeOut();
				}, 3000)
				return false;
			}
		});
	});



});



//reset form
function resetForm(form) {
	$(form).each(function () {
		this.reset();
	});
}
//format error
function formatErrors(errorMsg) {
	var errors = errorMsg;
	//show messages
	for (var e in errors) {
		return errors[e][0];
	}
}
//only number
function onlyNumber(input) {
	$(input).on('keypress input', function () {
		var value = $(this).val();
		value = value.replace(/\D+/, '');
		$(this).val(value);
	});
}
