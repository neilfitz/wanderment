var defaultInfo = Object();
defaultInfo.heading = "Welcome to Wanderment!"
defaultInfo.info = "<p>search a city or navigate the map to start wandering<p>"
	
var sampleInfo = Object();
sampleInfo.heading = "Mumbai";
sampleInfo.info = "<p>Country: India</p><p>Population: 12,478,447</p><p>Elevation: 14m</p><p>Location Type:Big City</p><p>Language: Marathi, Hindi, English</p>"
//data has a heading (string) and info section (html)
function updateInfo(data){
    $("#sidebar-heading").text(data.heading);
    $("#sidebar-info").html(data.info);
    $("#sidebar-info").addClass("data-list");
}

$(document).ready(function(){
	function searchMap(){
		var searchTerm = $("#search-field").val();
		//dummy function for now. Should find a location on the map
		alert("searching for " + searchTerm);
		// updateInfo(sampleInfo);
	}
	//search bar stuff
	$("#search-form").submit(
		function(){
		searchMap();
		return false;
	});
})
