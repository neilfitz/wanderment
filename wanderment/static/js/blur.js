// Animate enter show post div 
var showOrHide = true; 

function slide() {
  console.log("click");
  if (showOrHide == true) {
      showOrHide = false; 
      $( "#sample_post" ).animate({
        left: 0,
      }, 500, function() {
    });
  } else {
    showOrHide = true; 
    $( "#sample_post" ).animate({
        left: 2000,
      }, 500, function() {
    });
  }
};


$(document).ready(function() {

// Blurring image-viewing
(function() {
  $(window).scroll(function() {
    var oVal;
    oVal = $(window).scrollTop() / 240;
    return $(".blur").css("opacity", oVal);
  });

}).call(this);

}); 

