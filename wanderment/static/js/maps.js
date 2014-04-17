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
	});

	google.maps.event.addListener(popup, 'closeclick', function() {
		updateInfo(defaultInfo);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);

