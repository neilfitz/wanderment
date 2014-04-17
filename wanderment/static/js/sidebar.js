var defaultInfo = Object();
defaultInfo.heading = "Welcome to Wanderment!"
defaultInfo.info = "<p>search for a city or click around the map to start wandering<p>"
	
var sampleInfo = Object();
sampleInfo.heading = "Mumbai";
sampleDict = {"Country":"India","Population": "12,478,447", "Elevation": "14 m", "Type": "Big City", "Language": "Marathi, Hindi, English"};

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
