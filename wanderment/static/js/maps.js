function initialize() {
	var myLatlng = new google.maps.LatLng(18.9750, 72.8258);
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
		content: 'Hi!'
	});

	google.maps.event.addListener(marker, 'click', function() {
		var popupContent = '<div class="city_popup"><h2>Mumbai</h2>' +
		    '<img src="http://www.goldentriangle-tour-india.com/blog/wp-content/uploads/2013/11/Mumbai_city.jpg" height="200" width="300"/></div>';
		popup.setContent(popupContent);
		popup.open(map, marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);

