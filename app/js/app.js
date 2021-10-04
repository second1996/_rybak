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
	$('a[data-anchor]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
				bl_top = $(target).offset().top - 75;

		$('body, html').animate({scrollTop: bl_top}, 1000)

		return false
	})

})