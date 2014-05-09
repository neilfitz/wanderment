function sendDelete(id){
	if(	confirm("Are you sure you want to delete this post?") ){

		$.get((document.location.origin + "/posts/delete_post/"), {"post_id": id}, function(response){location.reload()})
	}
}