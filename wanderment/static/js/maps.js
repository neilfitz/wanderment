function initialize() {
	var myLatlng = new google.maps.LatLng(18.9750, 72.8258);
	var mapOptions = {
	        zoom: 4,
		center: myLatlng,
		mapTypeControl: false,
		streetViewControl: false
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	// To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker({
		position: myLatlng,
		icon: {
		        path: google.maps.SymbolPath.CIRCLE,
			scale: 6,
			fillColor: "#FFFFFF",
			fillOpacity: 1,
			strokeColor: "#3D0099"
		},
		map: map,
		title:"Hello World!"
	});

	var popup = new google.maps.InfoWindow({
		content: 'Hi!'
	});

	//range is a positive value
	function makeBounds(loc, range){
		var sw = new google.maps.LatLng(loc.lat()-range,loc.lng()-range);
		var ne = new google.maps.LatLng(loc.lat()+range,loc.lng()+range);
		return new google.maps.LatLngBounds(sw, ne);
	}

	//add a listener to map for search events
	document.getElementById("map").addEventListener("searchMap", function(e) {
		console.info("data is: ", e.detail);
		//create lat lon
		var loc = new google.maps.LatLng(e.detail.location.lat, e.detail.location.lon,false);
		console.info("LatLng: ",loc);
		map.panTo(loc);
		google.maps.event.trigger(marker, 'click', {latLng: loc});
	})

	google.maps.event.addListener(marker, 'click', function(e) {
		//make a bounds for clicking
		var bounds = makeBounds(marker.position, 0.2);
		//if in range of marker, zoom over
		if(bounds.contains(e.latLng)){
			updateInfo(sampleInfo);

			var popupContent = document.createElement('div');
			popupContent.setAttribute('class', 'city_popup');
			var cityName = document.createElement('h2');
			cityName.innerHTML = 'Mumbai';
			var imagePost = document.createElement('input');
			imagePost.setAttribute('type', 'image');
			imagePost.setAttribute('src', 'http://www.goldentriangle-tour-india.com/blog/wp-content/uploads/2013/11/Mumbai_city.jpg');
			imagePost.setAttribute('height', '200');
			imagePost.setAttribute('width', '300');
			imagePost.setAttribute('class', 'glow')

			imagePost.addEventListener('click', function() {
				popup.close();
				slide();
			});

			popupContent.appendChild(cityName);
			popupContent.appendChild(imagePost);

			popup.setContent(popupContent);		
			popup.open(map, marker);	
		}
		
	});

	google.maps.event.addListener(popup, 'closeclick', function() {
		updateInfo(defaultInfo);
	});
}


google.maps.event.addDomListener(window, 'load', initialize);

