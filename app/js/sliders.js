document.addEventListener('DOMContentLoaded', function() {
	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Page About: Chronology slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const chronologySwiper = new Swiper('.a-chronology-slider', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.a-chronology-pagination',
			type: 'custom',
			clickable: true,
			renderCustom: function(swiper, current, total) {
				let items = ''
				swiper.slides.forEach((el, index) => {
					const slideTitle = el.dataset.slideTitle

					if ([current - 1] == index) {
						items += `<span class="swiper-pagination-bullet swiper-pagination-bullet-active">${slideTitle}</span>`
					} else {
						items += `<span class="swiper-pagination-bullet">${slideTitle}</span>`
					}
				})
				return items
			},
		},
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Page About: Partners slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const partnersSwiper = new Swiper('.a-partners-slider .swiper', {
		loop: true,
		slidesPerView: 1,
		navigation: {
			prevEl: '.a-partners-navigation .swiper-button-prev',
			nextEl: '.a-partners-navigation .swiper-button-next',
		},
		pagination: {
			el: '.a-partners-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			375: {
				slidesPerView: 2,
			},
			576: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1240: {
				slidesPerView: 5,
			},
			1620: {
				slidesPerView: 6,
			},
		},
	})
})