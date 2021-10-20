document.addEventListener('DOMContentLoaded', function () {
	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Fancybox config
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$.fancybox.defaults.animationEffect = 'fade'
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close']
	$.fancybox.defaults.smallBtn = true


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Go up button
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	var go_up_btn = $('#go-up-button')

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 1000) {
			go_up_btn.addClass('_is-shown')
		} else {
			go_up_btn.removeClass('_is-shown')
		}
	})

	go_up_btn.on('click', function (e) {
		e.preventDefault()
		$('html, body').animate({ scrollTop: 0 }, 1000)
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Smooth scroll (anchors)
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('a[data-anchor]').bind('click.smoothscroll', function () {
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top - 75;

		$('body, html').animate({ scrollTop: bl_top }, 1000)

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
			$('.mmenu-backdrop').delay(5).queue(function () {
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
	$('.header .menu-burger .btn-burger').on('click', function () {
		mmenuBackdrop()

		$('body').addClass('lock-scroll')
		$('.mmenu').addClass('_is-active')
	})

	// Close menu
	$('.mmenu .mmenu-heading .btn-close').on('click', function () {
		mmenuBackdrop()

		$('body').removeClass('lock-scroll')
		$('.mmenu').removeClass('_is-active')
	})

	// Toggle submenu
	$('.mmenu .menu-item-has-children .menu-link').on('click', function (e) {
		e.preventDefault()
		$(this).parent('.menu-item-has-children').toggleClass('_is-opened')
		$(this).siblings('ul').slideToggle()
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* BS Accordion: Scroll to open vacancy item
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.collapse').on('shown.bs.collapse', function () {
		$('html,body').animate({
			scrollTop: $(this).closest('.vacancy').offset().top
		}, 500)
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Select2: Shops map filters dropdown
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('select').select2().on('select2:opening', function () {
		$(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', 'Пошук...')
	})

})



/**
*-------------------------------------------------------------------------------------------------------------------------------------------
* Google Map init
*-------------------------------------------------------------------------------------------------------------------------------------------
*/
let map, marker;
var markersArr = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('rybak-map'), {
		center: { lat: 49.364424, lng: 26.494875 },
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	})

	// Locations
	const locations = [
		{ 'lat': 48.922633, 'lng': 24.711117 },
		{ 'lat': 48.9406873, 'lng': 24.6881581 },
		{ 'lat': 48.9230679, 'lng': 24.7114661 },
		{ 'lat': 48.9135677, 'lng': 24.7171474 },
	]

	// Add some markers to the map.
	const markers = locations.map((location, i) => {
		return new google.maps.Marker({
			position: location,
			icon: './images/marker.svg',
			// label: labels[i % labels.length],
		});
	});

	console.log(markers);

	// Add a marker clusterer to manage the markers.
	const markerCluster = new markerClusterer.MarkerClusterer({ markers, map });

	// Listeners
	map.addListener('center_changed', () => {
		$('html,body').animate({
			scrollTop: $('#rybak-map').offset().top - 60
		}, 500)
	})

	// console.log(map)
}

// Change map center
$(document).on('click', '.shops-list-filters-results .shop-card', function () {
	const lat = $(this).data('lat')
	const lng = $(this).data('lng')

	map.setCenter({ lat: +lat, lng: +lng })
	map.setZoom(20)
})