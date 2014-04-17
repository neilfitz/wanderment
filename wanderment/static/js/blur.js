$(document).ready(function() {

// Blurring image-viewing
(function() {
  $(window).scroll(function() {
    var oVal;
    oVal = $(window).scrollTop() / 240;
    return $(".blur").css("opacity", oVal);
  });

}).call(this);

// Animate enter show post div 
var showOrHide_Post = true; 
$( "#show_sample_post" ).click(function() {
  console.log("click post");
  if (showOrHide_Post == true) {
      showOrHide_Post = false; 
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
});

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

