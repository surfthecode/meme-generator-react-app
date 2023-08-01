import React from "react";
import logo from "../assets/images/logo.jpg";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="nav-left">
          <img src={logo} alt="meme generator logo" className="logo" />
          <h2>The meme generator</h2>
        </div>

        <h3>create your own meme</h3>
      </nav>
    </header>
  );
};

export default Header;
