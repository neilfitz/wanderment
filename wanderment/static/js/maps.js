function initialize() {
	var myLatlng = new google.maps.LatLng(18.9750, 72.8258);
	var mapOptions = {
	        zoom: 4,
		maxZoom: 12,
		center: myLatlng,
		mapTypeControl: false,
		streetViewControl: false
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	var markers = {}
	function loadMarkers(){
		$.get(document.location.href.split("/")[0] + "get_marker_info", {"TODO":"MAPBOUNDS?"}, function(data){
			markers={}
			for(var i = 0; i< data.length; i++){
				var city = data[i];
				// alert(JSON.stringify(city))
				var mk = makeMarker(city.name, city.latitude, city.longitude);
				addMarkerListener(mk, city.name, city.imgURL, city.info, city.id);
				markers[city.name] = mk;
			}
		});
	}
	loadMarkers();

	function makeMarker(name, lat, lng){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat,lng),
			icon: {
				path:google.maps.SymbolPath.CIRCLE,
				scale: 6,
				fillColor:"#FFFFFF",
				fillOpacity: 1,
				strokeColor: "#3D0099"
			},
			map: map,
			title: name
		});
		return marker;
	}

	function addMarkerListener(marker, name, imgsrc, cityInfo, id){
		google.maps.event.addListener(marker, 'click', function(e) {
			updateInfo(cityInfo);

			var popupContent = document.createElement('div');
			popupContent.setAttribute('class', 'city_popup');
			var cityName = document.createElement('h2');
			cityName.innerHTML = name;
			var imagePost = document.createElement('input');
			imagePost.setAttribute('type', 'image');
			imagePost.setAttribute('src', imgsrc);
			imagePost.setAttribute('height', '200');
			imagePost.setAttribute('width', '300');
			imagePost.setAttribute('class', 'glow seeMoreText');

			imagePost.addEventListener('click', function() {
				//TODO go to page with all posts!!!!!!!!
				document.location.href = document.location.href.split("/")[0] + "posts/cities/"+id;
			});
			
			/*imagePost.addEventListener('mouseover',function() {
				('See More Posts').style.display = 'block';
			});
			imagePost.addEventListener('mouseout',function() {
				('See More Posts').style.display = 'none';
			});*/
			popupContent.appendChild(cityName);
			popupContent.appendChild(imagePost);
			popup.setContent(popupContent);		
			popup.open(map, marker);	
		});
	}

	/********************* POPUP BOX ***********************************/
	var popup = new google.maps.InfoWindow({
		content: 'Hi!'
	});
	google.maps.event.addListener(popup, 'closeclick', function() {
		resetInfo();
	});
	//check if infowindow is open
	function isInfoWindowOpen(infoWindow){
		var map = infoWindow.getMap();
		return (map!==null && typeof map !== "undefined");
	}
	//ESCAPE TO CLOSE
	$(document).keyup(function(e){
		//esc
		if (e.keyCode==27){
			if(isInfoWindowOpen(popup)){
				popup.close(); 
				resetInfo();
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////

	//range is a positive value
	function makeBounds(loc, range){
		var sw = new google.maps.LatLng(loc.lat()-range,loc.lng()-range);
		var ne = new google.maps.LatLng(loc.lat()+range,loc.lng()+range);
		return new google.maps.LatLngBounds(sw, ne);
	}


	/******************* SEARCH EVENT LISTENER ***************************/
	document.getElementById("map").addEventListener("searchMap", function(e) {
		// console.info("data is: ", e.detail);
		//create lat lon
		var loc = new google.maps.LatLng(e.detail.latitude, e.detail.longitude,false);
		map.panTo(loc);
		map.setZoom(6);

		popup.close();
		//TODO replace with a loop through current displayed markers
		// google.maps.event.trigger(markers[e.detail.name], 'click',{latLng: loc})
		google.maps.event.trigger(markers[e.detail.name], 'click', {latLng: loc});
	})
	//////////////////////////////////////////////////////////////////////



	// 	// To add the marker to the map, use the 'map' property
	// var marker = new google.maps.Marker({
	// 	position: myLatlng,
	// 	icon: {
	// 	        path: google.maps.SymbolPath.CIRCLE,
	// 		scale: 6,
	// 		fillColor: "#FFFFFF",
	// 		fillOpacity: 1,
	// 		strokeColor: "#3D0099"
	// 	},
	// 	map: map,
	// 	title:"Mumbai"
	// });

	// var marker2 = new google.maps.Marker({
	// 	position: new google.maps.LatLng(13.7500, 100.4667),
	// 	icon: {
	// 	        path: google.maps.SymbolPath.CIRCLE,
	// 		scale: 6,
	// 		fillColor: "#FFFFFF",
	// 		fillOpacity: 1,
	// 		strokeColor: "#3D0099"
	// 	},
	// 	map: map,
	// 	title:"Bangkok"
	// });

	// var marker3 = new google.maps.Marker({
	// 	position: new google.maps.LatLng(25.2867, 51.5333),
	// 	icon: {
	// 	        path: google.maps.SymbolPath.CIRCLE,
	// 		scale: 6,
	// 		fillColor: "#FFFFFF",
	// 		fillOpacity: 1,
	// 		strokeColor: "#3D0099"
	// 	},
	// 	map: map,
	// 	title:"Doha"
	// });

	// google.maps.event.addListener(marker, 'click', function(e) {
	// 	//make a bounds for clicking
	// 	var bounds = makeBounds(marker.position, 0.2);
	// 	//if in range of marker, zoom over
	// 	if(bounds.contains(e.latLng)){
	// 		// updateInfo(sampleInfo);

	// 		var popupContent = document.createElement('div');
	// 		popupContent.setAttribute('class', 'city_popup');
	// 		var cityName = document.createElement('h2');
	// 		cityName.innerHTML = 'Mumbai';
	// 		var imagePost = document.createElement('input');
	// 		imagePost.setAttribute('type', 'image');
	// 		imagePost.setAttribute('src', 'http://www.goldentriangle-tour-india.com/blog/wp-content/uploads/2013/11/Mumbai_city.jpg');
	// 		imagePost.setAttribute('height', '200');
	// 		imagePost.setAttribute('width', '300');
	// 		imagePost.setAttribute('class', 'glow')

	// 		imagePost.addEventListener('click', function() {
	// 			popup.close();
	// 			slide();
	// 		});

	// 		popupContent.appendChild(cityName);
	// 		popupContent.appendChild(imagePost);

	// 		popup.setContent(popupContent);		
	// 		popup.open(map, marker);	
	// 	}
		
	// });

	// google.maps.event.addListener(marker2, 'click', function(e) {
	// 	//make a bounds for clicking
	// 	var bounds = makeBounds(marker2.position, 0.2);
	// 	//if in range of marker, zoom over
	// 	if(bounds.contains(e.latLng)){
		
	// 		updateInfo(bangkokInfo);

	// 		var popupContent = document.createElement('div');
	// 		popupContent.setAttribute('class', 'city_popup');
	// 		var cityName = document.createElement('h3');
	// 		cityName.innerHTML = 'Bangkok';
			
	// 		var imagePost = document.createElement('input');
	// 		imagePost.setAttribute('type', 'image');
	// 		imagePost.setAttribute('src', 'http://www.interasia.com.au/wp-content/uploads/2012/11/bangkok-temple-of-the-dawn.jpg');
	// 		imagePost.setAttribute('height', '97');
	// 		imagePost.setAttribute('width', '140');
	// 		imagePost.setAttribute('class', 'glow2');
	// 		var imagePost2 = document.createElement('input');
	// 		imagePost2.setAttribute('type', 'image');
	// 		imagePost2.setAttribute('src', 'http://www.interasia.com.au/wp-content/uploads/2012/11/bangkok-temple-of-the-dawn.jpg');
	// 		imagePost2.setAttribute('height', '97');
	// 		imagePost2.setAttribute('width', '140');
	// 		imagePost2.setAttribute('class', 'glow2');
	// 		var imagePost3 = document.createElement('input');
	// 		imagePost3.setAttribute('type', 'image');
	// 		imagePost3.setAttribute('src', 'http://www.interasia.com.au/wp-content/uploads/2012/11/bangkok-temple-of-the-dawn.jpg');
	// 		imagePost3.setAttribute('height', '97');
	// 		imagePost3.setAttribute('width', '140');
	// 		imagePost3.setAttribute('class', 'glow2');
	// 		var imagePost4 = document.createElement('input');
	// 		imagePost4.setAttribute('type', 'image');
	// 		imagePost4.setAttribute('src', 'http://www.interasia.com.au/wp-content/uploads/2012/11/bangkok-temple-of-the-dawn.jpg');
	// 		imagePost4.setAttribute('height', '97');
	// 		imagePost4.setAttribute('width', '140');
	// 		imagePost4.setAttribute('class', 'glow2');

	// 		var seeMore = document.createElement('p3');
	// 		seeMore.innerHTML = 'View More Posts';
	// 		seeMore.setAttribute('class', 'click-more');


	// 		imagePost.addEventListener('click', function() {
	// 			alert('Nothing here yet! Take a look at Mumbai.')
	// 		});
	// 		imagePost2.addEventListener('click', function() {
	// 			alert('Nothing here yet! Take a look at Mumbai.')
	// 		});
	// 		imagePost3.addEventListener('click', function() {
	// 			alert('Nothing here yet! Take a look at Mumbai.')
	// 		});
	// 		imagePost4.addEventListener('click', function() {
	// 			alert('Nothing here yet! Take a look at Mumbai.')
	// 		});
	// 		seeMore.addEventListener('click', function() { alert('No more posts!') });

	// 		popupContent.appendChild(cityName);
	// 		//popupContent.appendChild(seeMore);
	// 		popupContent.appendChild(imagePost);
	// 		popupContent.appendChild(imagePost2);
	// 		popupContent.appendChild(imagePost3);
	// 		popupContent.appendChild(imagePost4);
	// 		popupContent.appendChild(seeMore);


	// 		popup.setContent(popupContent);		
	// 		popup.open(map, marker2);
	// 	}
	// });

	// google.maps.event.addListener(marker3, 'click', function(e) {
	// 	//make a bounds for clicking
	// 	var bounds = makeBounds(marker3.position, 0.2);
	// 	//if in range of marker, zoom over
	// 	if(bounds.contains(e.latLng)){
			
	// 		updateInfo(dohaInfo);

	// 		var popupContent = document.createElement('div');
	// 		popupContent.setAttribute('class', 'city_popup');
	// 		var cityName = document.createElement('h2');
	// 		cityName.innerHTML = 'Doha';
	// 		var imagePost = document.createElement('input');
	// 		imagePost.setAttribute('type', 'image');
	// 		imagePost.setAttribute('src', 'http://collegiatemodelun.files.wordpress.com/2013/02/doha.jpg');
	// 		imagePost.setAttribute('height', '200');
	// 		imagePost.setAttribute('width', '300');
	// 		imagePost.setAttribute('class', 'glow')

	// 		imagePost.addEventListener('click', function() {
	// 			alert('Nothing here yet! Take a look at Mumbai.')
	// 		});

	// 		popupContent.appendChild(cityName);
	// 		popupContent.appendChild(imagePost);

	// 		popup.setContent(popupContent);		
	// 		popup.open(map, marker3);
	// 	}
	// });

}


google.maps.event.addDomListener(window, 'load', initialize);
