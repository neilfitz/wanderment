function genTableInfo(dict){
	var html = '<table class="data-table">';
	for (var key in dict){
	    if (key == "Bio") {
		html = html+'<tr><td><div class="userbio">'+dict[key]+'</div></td></tr>';
	    } else if (key == "Pic") {
		html = html+'<tr><td><img src="'+dict[key]+'" class="userpic"/></td></tr>';
	    } else {
		html = html+'<tr><td class="data-key">'+key+':</td><td class="data-value">'+dict[key]+'</td></tr>';
	    }
	}
	html = html + '</table>';
	return html;
}

var defaultInfo = Object();
defaultInfo.heading = "Welcome to Wanderment!";
defaultInfo.info = "<p>search for a city or click around the map to start wandering</p>";
	
var sampleInfo = Object();
sampleInfo.name = "Mumbai";
sampleInfo.info = {"Country":"India","Population": "12,478,447", "Elevation": "14 m", "Type": "Big City", "Language": "Marathi, Hindi, English"};

var bangkokInfo = Object();
bangkokInfo.name = "Bangkok";
bangkokInfo.info = {"Country":"Thailand","Population": "8,280,925", "Elevation": "1.5 m", "Type": "Capital", "Language": "Thai"}

var dohaInfo = Object();
dohaInfo.name = "Doha";
dohaInfo.info = {"Country":"Qatar","Population": "1,312,947", "Type": "City", "Language": "Arabic"}

var userInfo = Object();
userInfo.name = "Dora";
userInfo.info = {"Pic":"../static/imgs/dora.jpg","Bio":"<p>Dora enjoys hiking, learning new languages, and taking pictures.<p>"};

//data has a heading (string) and info section (html)
function updateInfo(cityData){
    $("#sidebar-heading").text(cityData.name);
    $("#sidebar-info").html(genTableInfo(cityData.info));
}
function resetInfo(){
    $("#sidebar-heading").text(defaultInfo.heading);
    $("#sidebar-info").html(defaultInfo.info);
}

//var sideButtons = Object();
//sideButtons.info = <button onclick="window.location.href='/editor'" class="emerald-flat-button" id="show_editor" style="margin-left: 45 px; margin-top: 50px; min-width:200px">Go To Editor</button> <button onclick="alert('No Saved Posts!')" class="emerald-flat-button" id="saved_posts" style="margin-left: 45 px; margin-top: 10px; min-width:200px">Saved Posts</button> <button onclick="slideNewPost()" class="emerald-flat-button" id="create_post" style="margin-left: 45 px; margin-top: 10px; min-width:200px">Create Post</button>;
function afterLogin(){
    $("#bottom-section").innerHTML = '<button onclick="window.location.href=\'/editor\'" class="emerald-flat-button" id="show_editor" style="margin-left: 45 px; margin-top: 50px; min-width:200px">Go To Editor</button> <button onclick="alert(\'No Saved Posts!\')" class="emerald-flat-button" id="saved_posts" style="margin-left: 45 px; margin-top: 10px; min-width:200px">Saved Posts</button> <button onclick="slideNewPost()" class="emerald-flat-button" id="create_post" style="margin-left: 45 px; margin-top: 10px; min-width:200px">Create Post</button>';
}

// var locData = Object();
// locData.mumbai = makeLatLon(18.975,72.825833);
// locData.boston = makeLatLon(42.3133,-71.0571);
// locData.doha = makeLatLon(25.28666,51.53333);
// locData.bangkok = makeLatLon(13.75,100.46666);
// locData.aberdeen = makeLatLon(57.9,-2.9);
// locData.paramaribo = makeLatLon(5.45,-55.15);

// var autoComplete = ["Mumbai", "Boston", "Doha", "Bangkok", "Aberdeen","Paramaribo"]

// function searchMap(){
// 	var searchTerm = $("#search-field").val();
// 	//fake database lookup for coordinates
// 	if (locData.hasOwnProperty(searchTerm.toLowerCase())){
// 		var loc = locData[searchTerm.toLowerCase()]

// 		//create searchMap event to "map"
// 		var searchEvent = new CustomEvent("searchMap", 
// 			{
// 			detail: {
// 					location : loc
// 					}
// 			});
// 		//dispatch event 
// 		document.getElementById("map").dispatchEvent(searchEvent);
// 		// updateInfo(sampleInfo);
// 	}
// 	else{
// 		alert("Sorry, but " + searchTerm + " has no posts currently. How about Mumbai?");
// 	}
// }

function searchMap(){
	var searchTerm = $("#search-field").val();
	cityInfo(searchTerm, function(data){
		if(data.found){
			var searchEvent = new CustomEvent("searchMap", 
			{
			detail: {
					name : data.name, 
					latitude : data.latitude,
					longitude : data.longitude,
					cityInfo : data.info
					}
			});
			document.getElementById("map").dispatchEvent(searchEvent)
		}
		else{
			//TODO handle bad searches
			alert("sorry, but there are no posts about " + searchTerm + ".")
		}

	});
}

//shortcut
function cityInfo(name, callback){
	$.get(document.location.href.split("/")[0] + "get_city_info", {"name": name}, callback)

}

$(document).ready(function(){
	
	$("#search-field").autocomplete({
		source: document.location.href.split("/")[0] + "autocomplete_city",
		minLength: 0,
		// _resizeMenu: function() { this.menu.element.outerWidth(200);},
		select: function( event, ui ){$("#search-field").val(ui.item.value); searchMap();}
		});

	//search bar stuff
	$("#search-form").submit(
		function(){
		searchMap();
		return false;
	});

})
