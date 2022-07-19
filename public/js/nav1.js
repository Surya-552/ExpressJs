class NavBar {

    createNavBar(imgUrl,  userInfo) {
        return `  <header id="default_header" class="header_style_1">

        <!-- header bottom -->
        <div class="header_bottom">
  
        <div class="logo" > <a href="/Account" target="content"><img  src=${imgUrl}  alt="logo" /></a> </div>
        <div class="home">
        <h3><a href="/Account">Home</a></h3>
        </div>
        <div class="task">
        <h3><a href="/Task">Task</a></h3>
        </div>
          
        </div>
        <!-- header bottom end -->
        </header>`;
            
        

    }
}

const UserData= JSON.parse(localStorage.getItem("UserData")) || [];

const navBar = new NavBar();
const imgUrl = "images/Presentation1.png";

const navHolder = document.getElementById("h_Eader");
navHolder.innerHTML = navBar.createNavBar(imgUrl,  UserData);



