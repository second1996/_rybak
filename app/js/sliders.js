document.addEventListener('DOMContentLoaded', function() {
	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Page About: Chronology slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const chronologySwiper = new Swiper('.a-chronology-slider', {
		grabCursor: true,
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


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Single page Production: Product gallery slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const productGalleryThumbsSwiper = new Swiper('.pd-single-gallery-thumbs', {
		direction: 'horizontal',
		slidesPerView: 4.5,
		spaceBetween: 16,
		autoHeight: false,
		freeMode: {
			sticky: true,
		},
		scrollbar: {
			el: '.pd-single-gallery-thumbs .swiper-scrollbar',
			draggable: true,
		},
		breakpoints: {
			992: {
				slidesPerView: 'auto',
				slidesPerView: 6.5,
			},
			1240: {
				slidesPerView: 4.5,
			},
			1620: {
				direction: 'vertical',
				slidesPerView: 5,
				autoHeight: true,
			},
		},
		on: {
			init: function(swiper) {
				if (swiper.slides.length < 2) {
					document.querySelector('.pd-single-gallery-thumbs').classList.add('d-none')
				}
			},
		},
	})

	const productGallerySwiper = new Swiper('.pd-single-gallery-slider', {
		slidesPerView: 1,
		thumbs: {
			swiper: productGalleryThumbsSwiper,
		},
		on: {
			init: function(swiper) {
				if (swiper.slides.length < 2) {
					swiper.destroy()
				}
			},
		},
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Single page News: Other news slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const otherNewsSwiper = new Swiper('.news-single-other-slider', {
		slidesPerView: 1.2,
		spaceBetween: 30,
		pagination: {
			el: '.news-single-other-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 2.5,
			},
			1620: {
				slidesPerView: 3,
			},
		},
	})

})