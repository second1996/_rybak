document.addEventListener('DOMContentLoaded', function () {
	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Fancybox config
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$.fancybox.defaults.animationEffect = 'fade';
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close'];
	$.fancybox.defaults.smallBtn = true;

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Go up button
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var go_up_btn = $('#go-up-button');

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 1000) {
			go_up_btn.addClass('_is-shown');
		} else {
			go_up_btn.removeClass('_is-shown');
		}
	});

	go_up_btn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 1000);
	});

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Smooth scroll (anchors)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('a[data-anchor]').bind('click.smoothscroll', function () {
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top - 75;

		$('body, html').animate({ scrollTop: bl_top }, 1000);

		return false;
	});

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Site header: Toggle mobile menu
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	function mmenuBackdrop() {
		if (!$('.mmenu-backdrop').length) {
			$('body').append('<div class="mmenu-backdrop fade"></div>');
			$('.mmenu-backdrop')
				.delay(5)
				.queue(function () {
					$(this).addClass('show').dequeue();
					$(this).on('click', function () {
						mmenuBackdrop();
						$('body').removeClass('lock-scroll');
						$('.mmenu').removeClass('_is-active');
					});
				});
		} else {
			$('.mmenu-backdrop').remove();
		}
	}

	// Open menu
	$('.header .menu-burger .btn-burger').on('click', function () {
		mmenuBackdrop();

		$('body').addClass('lock-scroll');
		$('.mmenu').addClass('_is-active');
	});

	// Close menu
	$('.mmenu .mmenu-heading .btn-close').on('click', function () {
		mmenuBackdrop();

		$('body').removeClass('lock-scroll');
		$('.mmenu').removeClass('_is-active');
	});

	// Toggle submenu
	$('.mmenu .menu-item-has-children .menu-link').on('click', function (e) {
		e.preventDefault();
		$(this).parent('.menu-item-has-children').toggleClass('_is-opened');
		$(this).siblings('ul').slideToggle();
	});

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * BS Accordion: Scroll to open vacancy item
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.collapse').on('shown.bs.collapse', function () {
		$('html,body').animate(
			{
				scrollTop: $(this).closest('.vacancy').offset().top,
			},
			500,
		);
	});

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Select2: Shops map filters dropdown
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('select')
		.select2()
		.on('select2:opening', function () {
			$(this)
				.data('select2')
				.$dropdown.find(':input.select2-search__field')
				.attr('placeholder', 'Пошук...');
		});
});

/**
 *-------------------------------------------------------------------------------------------------------------------------------------------
 * Google Map init
 *-------------------------------------------------------------------------------------------------------------------------------------------
 */
var locations = {
	"Бережани": {
		"Бережани, вул. Рогатинська 4": {
			'lat': 49.4467869,
			'lng': 24.9262808,
			'address': "Бережани, вул. Рогатинська 4",
		},
	},

	"Бібрка": {
		"Бібрка, вул. Львівська 4": {
			'lat': 49.6395494,
			'lng': 24.293926,
			'address': "Бібрка, вул. Львівська 4",
		},
	},

	"Болехів": {
		"Болехів, вул. Івана Франка 10а": {
			'lat': 49.0652372,
			'lng': 23.8592124,
			'address': "Болехів, вул. Івана Франка 10а",
		},
	},

	"Борислав": {
		"Борислав, вул. Коваліва 52г": {
			'lat': 49.3520503,
			'lng': 23.4795701,
			'address': "Борислав, вул. Коваліва 52г",
		},
		"Борислав, вул. Коваліва 14а": {
			'lat': 49.3510458,
			'lng': 23.4820828,
			'address': "Борислав, вул. Коваліва 14а",
		},
	},

	"Броди": {
		"Броди, вул. Просвіти 1": {
			'lat': 50.0834639,
			'lng': 25.1493288,
			'address': "Броди, вул. Просвіти 1",
		},
		"Броди, вул. Залізнична 6": {
			'lat': 50.0821971,
			'lng': 25.1433245,
			'address': "Броди, вул. Залізнична 6",
		},
	},

	"Брюховичі": {
		"Брюховичі, вул. Львівська 23": {
			'lat': 49.9044583,
			'lng': 23.9596995,
			'address': "Брюховичі, вул. Львівська 23",
		},
	},

	"Бурштин": {
		"Бурштин, вул. Січових Стрільців 27": {
			'lat': 49.2505443,
			'lng': 24.6307949,
			'address': "Бурштин, вул. Січових Стрільців 27",
		},
	},

	"Буськ": {
		"Буськ, вул. Євгена Петрушевича 3": {
			'lat': 49.9642807,
			'lng': 24.6114816,
			'address': "Буськ, вул. Євгена Петрушевича 3",
		},
	},

	"Великі Мости": {
		"Великі Мости, вул. Львівська 33": {
			'lat': 50.2295214,
			'lng': 24.1316529,
			'address': "Великі Мости, вул. Львівська 33",
		},
		"Великі Мости, вул. Львівська 64": {
			'lat': 50.2406318,
			'lng': 24.1382198,
			'address': "Великі Мости, вул. Львівська 64",
		},
	},

	"Винники": {
		"Винники, вул. Крушельницької 3а": {
			'lat': 49.8164087,
			'lng': 24.1339523,
			'address': "Винники, вул. Крушельницької 3а",
		},
	},

	"Воловець": {
		"Воловець, вул. Карпатська 50": {
			'lat': 48.714846,
			'lng': 23.1861643,
			'address': "Воловець, вул. Карпатська 50",
		},
	},

	"Володимир-Волинський": {
		"Володимир-Волинський, вул. Ковельська 46": {
			'lat': 50.8506022,
			'lng': 24.3212462,
			'address': "Володимир-Волинський, вул. Ковельська 46",
		},
	},

	"Волочиськ": {
		"Волочиськ, вул. Незалежності 58": {
			'lat': 49.536312,
			'lng': 26.216953,
			'address': "Волочиськ, вул. Незалежності 58",
		},
	},

	"Галич": {
		"Галич, вул. Євгена Коновальця 4": {
			'lat': 49.1241724,
			'lng': 24.7296735,
			'address': "Галич, вул. Євгена Коновальця 4",
		},
	},

	"Городенка": {
		"Городенка, вул. Шевченка 74": {
			'lat': 48.9151767,
			'lng': 24.6997113,
			'address': "Гороленка, вул. Шевченка 74",
		},
	},

	"Городок": {
		"Городок, вул. Перемишильська 18": {
			'lat': 49.7835796,
			'lng': 23.6418164,
			'address': "Городок, вул. Перемишильська 18",
		},
	},

	"Горохів": {
		"Горохів, вул. Луцька 49": {
			'lat': 50.5042857,
			'lng': 24.7734666,
			'address': "Горохів, вул. Луцька 49",
		},
	},

	"Грибовичі": {
		"Грибовичі, вул. Львівська 2": {
			'lat': 49.9110157,
			'lng': 24.0543944,
			'address': "Грибовичі, вул. Львівська 2с",
		},
	},

	"Гусятин": {
		"Гусятин, пр. Незалежності 25": {
			'lat': 49.0714026,
			'lng': 26.1959026,
			'address': "Гусятин, пр. Незалежності 25",
		},
	},

	"Добросин": {
		"Добросин, пл. 40-річчя Перемоги 4": {
			'lat': 50.1338503,
			'lng': 23.8484675,
			'address': "Добросин, пл. 40-річчя Перемоги 4",
		},
	},

	"Добротвір": {
		"Добротвір, вул. Будівельна 7": {
			'lat': 50.207391,
			'lng': 24.3874851,
			'address': "Добротвір, вул. Будівельна 7",
		},
	},

	"Долина": {
		"Долина, вул. Довбуша 9": {
			'lat': 48.9727054,
			'lng': 23.9734861,
			'address': "вулиця Довбуша, 9, Долина, Івано-Франківська область, Україна, 77500",
		},
	},
}

// Google Map
var map, marker;
var markersArr = [];
var markerCluster;
var chainFilteredLocations = {};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 50.4482502, lng: 30.5149951 },
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		// disableDefaultUI: true
	});

	setMarkers(map, locations);

	// var cityFilter = document.querySelector('.js-city-filter .select-options li');
	// google.maps.event.addDomListener(cityFilter, clearClusters);
}

function setMarkers(map, locations) {
	var markerEl = './images/marker.svg';
	map.markers = [];
	for (var cityKey in locations) { // loop for cities
		var city = locations[cityKey];

		$('#stores-filters-city').append(`<option value="${cityKey}">${cityKey}</option>`);

		for (var locationKey in city) { // loop for locations
			var location = city[locationKey];
			var pos = new google.maps.LatLng(location.lat, location.lng); // get position object

			var marker = new google.maps.Marker({ // create marker
				position: pos,
				icon: markerEl,
				map: map,
				title: 'kek',
				customLocationName: location.address
			})

			$('#stores-filters-address').append(`<option value="${locationKey}">${locationKey}</option>`);

			map.markers.push(marker);

			google.maps.event.addListener(marker, 'click', (function (marker) { // pan to marker on click
				return function () {
					map.panTo(marker.getPosition());
					map.setZoom(18); // zoom map
				};
			})(marker));

			markersArr.push(marker); // add marker to custom markers array
			addInfoWindow(marker, location); // render InfoWindow for marker
		}
	}

	function addInfoWindow(marker, body) {
		var infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker, 'click', function () {
			infoWindow.setContent(`<div class="rybak-infoWindow">
				<div class="title">${body.address}</div>
				<div class="link">
					<a href="http://maps.google.com/?q=${body.lat},${body.lng}&z=20" target="_blank">Відкрити на карті</a>
				</div>
			</div>`)
			infoWindow.open(map, marker);
		});
	}

	$(document).on('click', '.stores-list-filters-results .shop-card', function () {
		var cardLat = $(this).data('lat');
		var cardLng = $(this).data('lng');

		for (markerKey in markersArr) {
			if (markersArr[markerKey].__gm) { // check if it's realy google marker 
				if (markersArr[markerKey].position.lat() == cardLat && markersArr[markerKey].position.lng() == cardLng) { // if lng and lat is the same with marker
					google.maps.event.trigger(markersArr[markerKey], 'click'); // move map to marker
					map.setZoom(18); // zoom map

					$('html, body').animate({
						scrollTop: $('.stores-list-map').offset().top - $('header').height() // smooth scroll to map
					}, 500);
				}
			}
		}
	});

	var cleanMarkersArr = [];

	for (var i = 0; i < markersArr.length; i++) {
		if (markersArr[i].icon) {
			cleanMarkersArr.push(markersArr[i]);
		}
	}

	if (markerCluster !== undefined) { // if cluster was peviosly created
		markerCluster.clearMarkers(); // clear markers from cluster
	}

	markerCluster = new MarkerClusterer(map, cleanMarkersArr, { // apply clustering to map
		cssClass: 'rybak-gm-marker', // set custom class for every marker
		zoomOnClick: true, // zoom after click on marker
		averageCenter: true,
		// gridSize: 60,
		minimumClusterSize: 2
	});

	centerMap(map);
}

function destroyMarkers() {
	for (var i = 0; i < markersArr.length; i++) { // destroy markers
		if (markersArr[i].anchorPoint) { // check if this marker
			markersArr[i].setMap(null);
		}
	}
	markersArr = [];
	cleanMarkersArr = [];
	// $('.buy-place-map-info-inner').empty();
}

function clearClusters(e) {
	e.preventDefault();
	e.stopPropagation();
	markerCluster.clearMarkers();
}

function centerMap(map) {
	var bounds = new google.maps.LatLngBounds();

	$.each(map.markers, function (i, marker) {
		var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
		bounds.extend(latlng);
	});

	if (map.markers.length === 1) {
		map.setCenter(bounds.getCenter());
		map.setZoom(14);
	}
	else {
		// fit to bounds
		map.fitBounds(bounds);
	}
}

// // Change map center
// $(document).on('click', '.shops-list-filters-results .shop-card', function () {
//   const lat = $(this).data('lat');
//   const lng = $(this).data('lng');

//   map.setCenter({ lat: +lat, lng: +lng });
//   map.setZoom(20);

//   $('html,body').animate(
//     {
//       scrollTop: $('#rybak-map').offset().top - 60,
//     },
//     500,
//   );
// });