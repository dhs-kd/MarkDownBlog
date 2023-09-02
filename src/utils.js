var open_nav_bar = true ; 
function openNav() {
    document.getElementById("navbar").style.width = "20rem";
    document.getElementById("body").style.marginLeft = "0px";
}
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("navbar").style.width = "0";
    document.getElementById("body").style.marginLeft = "0";
}

// var dark_theme_now =false
// function darkMode(){
//     if(!dark_theme_now || IS_DARKMODE){
//         document.getElementById("navbar").classList.add("dark_mode");
//         document.getElementById("backgroundBody").classList.add("dark_mode_background");
//         document.getElementById("body").classList.add("dark_mode");
//         for (var pre of document.getElementsByTagName("pre")){ 
//             pre.classList.add("dark_mode_background")
//         }
//         for (var pre of document.getElementsByTagName("code")){ 
//             pre.classList.add("dark_mode_background")
//         }
//         document.getElementById("navBut").classList.add("dark_mode")
//         document.getElementById("darkMode").classList.add("dark_mode")

//         dark_theme_now = true ;
//         IS_DARKMODE

//     }
   
//     else if (dark_theme_now) { 
//         document.getElementById("navbar").classList.remove("dark_mode");
//         document.getElementById("backgroundBody").classList.remove("dark_mode_background");
//         document.getElementById("body").classList.remove("dark_mode");
//         for (var pre of document.getElementsByTagName("pre")){ 
//             pre.classList.remove("dark_mode_background")
//         }
//         for (var pre of document.getElementsByTagName("code")){ 
//             pre.classList.remove("dark_mode_background")
//         }
//         document.getElementById("navBut").classList.remove("dark_mode")
//         document.getElementById("darkMode").classList.remove("dark_mode")

//         dark_theme_now = false ;
//         IS_DARKMODE = false

//     }
   
// }

function navbar() { 
    if (open_nav_bar) { 
        openNav();
        open_nav_bar = false;
    }
    else if (open_nav_bar === false) { 
        closeNav();
        open_nav_bar=true;
    }
}