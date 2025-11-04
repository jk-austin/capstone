import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async (e) => {
        e.preventDefault();
        const logout_url = window.location.origin + "/djangoapp/logout/"; // trailing slash to match Django
      
        try {
          const res = await fetch(logout_url, {
            method: "GET",
            // If frontend and backend are on different origins, enable credentials:
            // credentials: "include",
          });
      
          if (!res.ok) {
            // show server error text (helpful while debugging)
            const txt = await res.text();
            alert("Logout request failed: " + res.status + " " + res.statusText + "\n" + txt);
            return;
          }
      
          // check content-type before parsing JSON
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const json = await res.json();
            // good logout response
            let username = sessionStorage.getItem('username');
            sessionStorage.removeItem('username');
            window.location.href = window.location.origin;
            window.location.reload();
            alert("Logging out " + username + "...");
          } else {
            // server returned HTML or text; show it to help debug
            const txt = await res.text();
            alert("Expected JSON but got: " + txt);
          }
        } catch (err) {
          console.error("Logout error:", err);
          alert("Logout request failed: " + err);
        }
      };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

//Gets the username in the current session
let curr_user = sessionStorage.getItem('username')

//If the user is logged in, show the username and logout option on home page
if ( curr_user !== null &&  curr_user !== "") {
    home_page_items = <div className="input_panel">
      <text className='username'>{sessionStorage.getItem("username")}</text>
    <a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a>
  </div>
}
    return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"darkturquoise",height:"1in"}}>
            <div class="container-fluid">
              <h2 style={{paddingRight: "5%"}}>Dealerships</h2>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" style={{fontSize: "larger"}} aria-current="page" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" style={{fontSize: "larger"}} href="/about">About Us</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" style={{fontSize: "larger"}} href="/contact">Contact Us</a>
                  </li>
                </ul>
                <span class="navbar-text">
                  <div class="loginlink" id="loginlogout">
                  {home_page_items}
                  </div>
                  </span>
              </div>
            </div>
          </nav>
        </div>
    )
}

export default Header
