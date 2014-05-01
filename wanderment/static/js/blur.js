function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

// Animate enter show post div 
var showOrHide = true; 
function slide() {
  if (showOrHide == true) {
      showOrHide = false; 
      $( "#sample_post" ).animate({
        left: 0,
      }, 500, function() {
        url = '../static/sounds/rain-02.mp3'
        rain=document.createElement("embed");
        rain.setAttribute("loop","true");
        rain.setAttribute("hidden","true");
        rain.setAttribute("autostart","true");
        rain.setAttribute("src",url);
        rain.setAttribute("id","rain");
        rain.setAttribute("enablejavascript","true");
        document.body.appendChild(rain);
    });
  } else {
    showOrHide = true; 
    $( "#sample_post" ).animate({
        left: 4000,
      }, 500, function() {
        remove("rain"); 
    });
  }
};

//TODO not sure if this is the best method for the new post popup?
//also it's not actually working...
// Animate enter show editor div 
var showOrHide_newPost = true; 
function slideNewPost() {
  if (showOrHide_newPost == true) {
      showOrHide_newPost = false; 
      ( "../../posts/templates/posts/create_post.html" ).animate({
        left: 0,
      }, 500, function() {
        
    });
  } else {
    showOrHide_newPost = true; 
    ( "../../posts/templates/posts/create_post.html" ).animate({
        left: 4000,
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

