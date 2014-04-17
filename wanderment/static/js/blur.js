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
    showOrHide_Post = true; 
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

// Animate enter show editor div
// var showOrHide_Editor = true; 
// $( "#show_editor" ).click(function() {

//   console.log("click editor");
//   if (showOrHide_Editor == true) {
//       showOrHide_Editor = false; 
//       $( "#editor" ).animate({
//         left: 0,
//       }, 500, function() {
//     });
//       console.log("animated in"); 
//   } else {
//     showOrHide_Editor = true; 
//     $( "#editor" ).animate({
//         left: 2000,
//       }, 500, function() {
//     });
//     console.log("animated out"); 
//   }
// });

}); 

