
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
		options: {
			gestureHandling: 'greedy'
		},
		// disableDefaultUI: true,
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
				title: location.address,
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

	$(document).on('click', '.stores-list-filters-results .store-card-trigger', function () {
		var cardLat = $(this).data('lat');
		var cardLng = $(this).data('lng');

		for (markerKey in markersArr) {
			if (markersArr[markerKey].__gm) { // check if it's realy google marker 
				if (markersArr[markerKey].position.lat() == cardLat && markersArr[markerKey].position.lng() == cardLng) { // if lng and lat is the same with marker
					// google.maps.event.trigger(markersArr[markerKey], 'click'); // move map to marker
					map.panTo(markersArr[markerKey].getPosition()); // move map to marker
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
