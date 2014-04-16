function initialize() {
	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
	var mapOptions = {
	        zoom: 4,
		center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	// To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker({
		position: myLatlng,
		icon: {
		        path: google.maps.SymbolPath.CIRCLE,
			scale: 5,
			fillColor: "#3D0099",
			strokeColor: "#3D0099"
		},
		map: map,
		title:"Hello World!"
	});

	var popup = new google.maps.InfoWindow({
		content:'<div class="popup"><h2>City Name Here</h2>Testing...1...2...3...testing...1...2...3...</div>'
	});

	google.maps.event.addListener(marker, 'click', function() {
		popup.open(map, marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);