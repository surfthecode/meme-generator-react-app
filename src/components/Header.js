import React from "react";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <img
          src={logo}
          alt="meme generator logo"
          className="logo"
          style={{ filter: "brightness(0.3) invert(1)" }}
        />
        <h2>The meme generator</h2>
      </nav>
    </header>
  );
};

export default Header;
