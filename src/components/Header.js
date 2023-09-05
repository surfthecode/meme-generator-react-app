import React from "react";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <a
          href="https://surfthecode.github.io/meme-generator-react-app/"
          className="logo-link"
        >
          <img
            src={logo}
            alt="meme generator logo"
            className="logo"
            style={{ filter: "brightness(0.3) invert(1)" }}
          />
          <div className="meme-header-group">
            <h2 className="title">Memeify</h2>
            <p className="title-description">A quick and easy meme maker</p>
          </div>
        </a>
      </nav>
    </header>
  );
};

export default Header;
