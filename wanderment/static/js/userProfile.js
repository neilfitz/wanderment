var UserProfile = function(name) {
    
    this.userName = name;
    this.userBio = "";
    this.userCities = [];
    this.userPosts = []; //city name, postID
    this.userPic = "";
    
    this.getName = function() {
    	return this.userName;
    }
    
    this.writeBio = function(bio) {
    	this.userBio = bio;
    }
    
    this.getBio = function() {
    	return this.userBio;
    }
    
    this.addCity = function(city) {
    	this.userCities.append(city);
    }
    
    this.addPost = function(city, post) {
    	this.addCity(city);
    	this.userPosts.push({
    		key: city,
    		value: post
    	});
    }
    
    this.getCities = function() {
    	return this.userCities;
    }
    
    this.getPosts = function() {
    	return this.userPosts;
    }
    
    this.addPic = function(img) {
    	this.userPic = img;
    }
    
    
}
