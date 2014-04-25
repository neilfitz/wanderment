function genTableInfo(dict){
	var html = '<table class="data-table">';
	for (var key in dict){
		html = html+'<tr><td>'+key+':</td><td>'+dict[key]+'</td></tr>';
	}
	html = html + '</table>';
	return html;
}

var defaultInfo = Object();
defaultInfo.heading = "Welcome to Wanderment!"
defaultInfo.info = "<p>search for a city or click around the map to start wandering<p>"
	
var sampleInfo = Object();
sampleInfo.heading = "Mumbai";
sampleDict = {"Country":"India","Population": "12,478,447", "Elevation": "14 m", "Type": "Big City", "Language": "Marathi, Hindi, English"};
sampleInfo.info = genTableInfo(sampleDict);

var bangkokInfo = Object();
bangkokInfo.heading = "Bangkok";
bangkokDict = {"Country":"Thailand","Population": "8,280,925", "Elevation": "1.5 m", "Type": "Capital", "Language": "Thai"}
bangkokInfo.info = genTableInfo(bangkokDict);

var dohaInfo = Object();
dohaInfo.heading = "Doha";
dohaDict = {"Country":"Qatar","Population": "1,312,947", "Type": "City", "Language": "Arabic"}
dohaInfo.info = genTableInfo(dohaDict);

var userInfo = Object();
userInfo.heading = "Dora";
userInfo.info = "<p>Dora enjoys hiking, learning new languages, and taking pictures.<p>";

//data has a heading (string) and info section (html)
function updateInfo(data){
    $("#sidebar-heading").text(data.heading);
    $("#sidebar-info").html(data.info);
}

function makeLatLon(lat, lon){
	var latlon = Object(); 
	latlon.lat = lat;
	latlon.lon = lon;
	return latlon;
}

var locData = Object();
locData.mumbai = makeLatLon(18.975,72.825833);
locData.boston = makeLatLon(42.3133,-71.0571);
locData.doha = makeLatLon(25.28666,51.53333);
locData.bangkok = makeLatLon(13.75,100.46666);
locData.aberdeen = makeLatLon(57.9,-2.9);
locData.paramaribo = makeLatLon(5.45,-55.15);

var autoComplete = ["Mumbai", "Boston", "Doha", "Bangkok", "Aberdeen","Paramaribo"]

$(document).ready(function(){
	function searchMap(){
		var searchTerm = $("#search-field").val();
		//fake database lookup for coordinates
		if (locData.hasOwnProperty(searchTerm.toLowerCase())){
			var loc = locData[searchTerm.toLowerCase()]

			//create searchMap event to "map"
			var searchEvent = new CustomEvent("searchMap", 
				{
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

	$("#search-field").autocomplete({
		source: autoComplete,
		minLength: 0,
		// _resizeMenu: function() { this.menu.element.outerWidth(200);},
		select: function( event, ui ){$("#search-field").val(ui.item.value); searchMap();}
		});

})
