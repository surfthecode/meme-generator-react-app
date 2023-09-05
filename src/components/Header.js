import React, { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";
import logo from "../assets/images/logo.png";

const TEXTS = ["MEME LORD", "MEME MASTER", "SUPER SAYAN MEMENESS", "MEME GOD"];

const Header = () => {
  const [index, setIndex] = useState(0);

  // app title transition
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <header className="header">
      <nav>
        <a href="/meme-generator-react-app" className="logo-link">
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

      <h3 className="meme-title">
        {" "}
        Unleash your inner{" "}
        <span className="meme-lord">
          <TextTransition
            springConfig={presets.wobbly}
            direction="down"
            translateValue="50%"
          >
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </span>
      </h3>
    </header>
  );
};

export default Header;
