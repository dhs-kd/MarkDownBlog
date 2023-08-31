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