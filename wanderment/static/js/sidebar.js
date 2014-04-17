var defaultInfo = Object();
defaultInfo.heading = "Welcome to Wanderment!"
defaultInfo.info = "<p>search for a city or click around the map to start wandering<p>"
	
var sampleInfo = Object();
sampleInfo.heading = "Mumbai";
sampleDict = {"Country":"India","Population": "12,478,447", "Elevation": "14 m", "Type": "Big City", "Language": "Marathi, Hindi, English"};

var userInfo = Object();
userInfo.heading = "Dora";
userInfo.info = "<p>Dora enjoys hiking, learning new languages, and taking pictures.<p>";

//data has a heading (string) and info section (html)
function updateInfo(data){
    $("#sidebar-heading").text(data.heading);
    $("#sidebar-info").html(data.info);
}

function genTableInfo(dict){
	var html = '<table class="data-table">';
	for (var key in dict){
		html = html+'<tr><td>'+key+':</td><td>'+dict[key]+'</td></tr>';
	}
	html = html + '</table>';
	return html;
}
sampleInfo.info = genTableInfo(sampleDict);

function makeLatLon(lat, lon){
	var latlon = Object(); 
	latlon.lat = lat;
	latlon.lon = lon;
	return latlon;
}

var locData = Object();
locData.mumbai = makeLatLon(18.975,72.825833);
locData.boston = makeLatLon(42.3133,-71.0571);


$(document).ready(function(){
	function searchMap(){
		var searchTerm = $("#search-field").val();
		//fake database lookup for coordinates
		if (locData.hasOwnProperty(searchTerm.toLowerCase())){
			var loc = locData[searchTerm.toLowerCase()]

			//create searchMap event to "map"
			var searchEvent = new CustomEvent("searchMap", {
				detail: {
								location : loc
								}
				});
			//dispatch event 
			document.getElementById("map").dispatchEvent(searchEvent);
			// updateInfo(sampleInfo);
		}
		else{
			alert("Sorry, but " + searchTerm + " has no posts currently. How about Mumbai?");
		}
	}
	//search bar stuff
	$("#search-form").submit(
		function(){
		searchMap();
		return false;
	});

	// $("#search-field").autocomplete({
	// 	source: Object.keys(locData),
	// 	minLength: 0,
	// 	_resizeMenu: function() { this.menu.element.outerWidth(200);},
	// 	});

})
