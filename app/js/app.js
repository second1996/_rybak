$(document).ready(function() {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Fancybox config
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$.fancybox.defaults.animationEffect = 'fade'
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close']


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Go up button
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	var go_up_btn = $('#go-up-button')

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 1000) {
			go_up_btn.addClass('_is-shown')
		} else {
			go_up_btn.removeClass('_is-shown')
		}
	})

	go_up_btn.on('click', function(e) {
		e.preventDefault()
		$('html, body').animate({scrollTop:0}, 1000)
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Smooth scroll (anchors)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('a[data-anchor]').bind('click.smoothscroll', function() {
		var target = $(this).attr('href'),
				bl_top = $(target).offset().top - 75;

		$('body, html').animate({scrollTop: bl_top}, 1000)

		return false
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Toggle mobile menu
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function mmenuBackdrop() {
		if (!$('.mmenu-backdrop').length) {
			$('body').append('<div class="mmenu-backdrop fade"></div>')
			$('.mmenu-backdrop').delay(5).queue(function() {
				$(this).addClass('show').dequeue()
				$(this).on('click', function () {
					mmenuBackdrop()
					$('body').removeClass('lock-scroll')
					$('.mmenu').removeClass('_is-active')
				})
			})
		} else {
			$('.mmenu-backdrop').remove()
		}
	}

	// Open menu
	$('.header .menu-burger .btn-burger').on('click', function() {
		mmenuBackdrop()

		$('body').addClass('lock-scroll')
		$('.mmenu').addClass('_is-active')
	})

	// Close menu
	$('.mmenu .mmenu-heading .btn-close').on('click', function() {
		mmenuBackdrop()

		$('body').removeClass('lock-scroll')
		$('.mmenu').removeClass('_is-active')
	})

})
