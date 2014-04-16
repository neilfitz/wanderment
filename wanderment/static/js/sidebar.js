$(document).ready(function(){
	function searchMap(){
		var searchTerm = $("#search-field").val();
		//dummy function for now. Should find a location on the map
		alert("searching for " + searchTerm);
	}
	//search bar stuff
	$("#search-form").submit(
		function(){
		searchMap();
		return false;
	});



})
