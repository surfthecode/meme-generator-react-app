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
        <div className="meme-header-group">
          <h2 className="title">Memeify</h2>
          <p className="title-description">The ultimate meme maker app.</p>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
