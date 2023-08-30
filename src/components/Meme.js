import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import TextTransition, { presets } from "react-text-transition";

import textSize from "../assets/icons/text-size.png";
import textColor from "../assets/icons/text-color.png";
import defaultImg from "../assets/images/default-img.jpg";
import downloadIcon from "../assets/icons/download.svg";

const TEXTS = ["MEME LORD", "MEME MASTER", "SUPER SAYAN MEMENESS", "MEME GOD"];

const Meme = () => {
  const source = "https://api.imgflip.com/get_memes";
  const [index, setIndex] = useState(0);
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [topTextColor, setTopTextColor] = useState("#efefef");
  const [bottomTextColor, setBottomTextColor] = useState("#efefef");
  const [topTextSize, setTopTextSize] = useState(40);
  const [bottomTextSize, setBottomTextSize] = useState(40);
  const [showInstructions, setShowInstructions] = useState(false);

  // app title transition
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  // reference the meme container
  const memeRef = useRef();

  // fetch memes from the API
  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  // update the top text
  // text input
  const handleTopText = (e) => {
    setTopText(e.target.value);
  };
  // text size
  const handleTopTextSize = (e) => {
    setTopTextSize(e.target.value);
  };
  // text color
  const handleTopTextColor = (e) => {
    setTopTextColor(e.target.value);
  };

  // update the bottom text
  // text input
  const handleBottomText = (e) => {
    setBottomText(e.target.value);
  };
  // text size
  const handleBottomTextSize = (e) => {
    setBottomTextSize(e.target.value);
  };
  //  text color
  const handleBottomTextColor = (e) => {
    setBottomTextColor(e.target.value);
  };

  // update the meme on uplod
  const handleMeme = (e) => {
    setMeme(e.target.value);
  };

  // get a new meme
  const handleNewMeme = () => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setMeme(randomMeme.url);
  };

  // upload custom meme
  const handleUpload = (e) => {
    const file = e.target.files[0];
    // check if file type == image
    if (file && file.type.match("image.*")) {
      // check if file size < 10MB
      if (file.size < 10000000) {
        // create a URL from the file object
        const userImageUrl = URL.createObjectURL(file);
        // set the meme state to the URL
        setMeme(userImageUrl);
        // release the memory after the image is loaded
        URL.revokeObjectURL(file);
      } else {
        // display error message if file > 10 MB
        alert(
          "The file is too large. Please choose a smaller image, less than 10MB"
        );
      }
    } else {
      // display error message if file type != image
      alert("The file is not an image. Please choose an image file.");
    }
  };

  // save the meme to device
  const handleSave = () => {
    console.log("Saving meme...");
    htmlToImage
      .toBlob(memeRef.current)
      .then(function (blob) {
        saveAs(blob, "meme.png");
      })
      .catch(function (error) {
        // console.error("oops, something went wrong!", error);
        alert("Oops, something went wrong! Please try again.");
      });
  };

  // Social media sharing

  return (
    <>
      <main>
        <div className="meme-container">
          <div className="meme">
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

            <div className="meme-form">
              <div className="meme-form-wrapper">
                {/* Meme image & text container*/}
                <div className="meme-image--container" ref={memeRef}>
                  <Draggable bounds="parent">
                    <div
                      className="meme-text meme-text--top"
                      style={{
                        color: topTextColor,
                        fontSize: `${topTextSize}px`,
                      }}
                    >
                      {topText}
                    </div>
                  </Draggable>

                  <img
                    src={meme ? meme : defaultImg}
                    alt="Meme"
                    className="meme-image"
                  />

                  <Draggable bounds="parent">
                    <div
                      className="meme-text meme-text--bottom"
                      style={{
                        color: bottomTextColor,
                        fontSize: `${bottomTextSize}px`,
                      }}
                    >
                      {bottomText}
                    </div>
                  </Draggable>
                </div>

                {/* HOW TO instructions */}
                <p
                  className="meme-howto"
                  onClick={() => setShowInstructions(!showInstructions)}
                >
                  &#10149; meme how to
                </p>
              </div>

              {/* TOGGLE list */}
              {showInstructions && (
                <div className="meme-howto-modal">
                  <div className="meme-howto-modal-content">
                    <span
                      className="meme-howto-modal-close"
                      onClick={() => setShowInstructions(false)}
                    >
                      &times;
                    </span>

                    <ul className="meme-howto-modal-list">
                      <li>
                        {" "}
                        &#10149; Get a new meme, choose one from the template
                        list, or upload your own.
                      </li>
                      <li>
                        &#10149; Add some sparkling fun captions and move them
                        around.
                      </li>
                      <li>
                        {" "}
                        &#10149; Save or share your masterpiece and try not to
                        break the internet!😂
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="meme-form-group--container">
                {/* GET new meme */}
                <div className="get-meme">
                  <button
                    className="meme-button get-meme--btn"
                    onClick={handleNewMeme}
                  >
                    Get New Meme
                  </button>
                </div>

                {/* TOP TEXT inputs */}
                <div className="top-text-container">
                  <div className="meme-form-group top-text">
                    <label htmlFor="topText">Top Text</label>
                    <input
                      className="top-text--input"
                      type="text"
                      id="topText"
                      placeholder="TOP TEXT"
                      value={topText}
                      onChange={handleTopText}
                    />
                  </div>

                  <div className="text-modifiers">
                    <div className="meme-form-group--modifiers">
                      <label htmlFor="topTextSize">Size</label>
                      <span className="text-size--icon">
                        <img src={textSize} alt="top text size"></img>
                      </span>
                      <input
                        className="text-size--slider top-text--size"
                        type="range"
                        id="topTextSize"
                        min="20"
                        max="80"
                        value={topTextSize}
                        onChange={handleTopTextSize}
                      />
                    </div>

                    <div className="meme-form-group--modifiers">
                      <label htmlFor="topTextColor">Color</label>
                      <span className="text-color--icon">
                        <img src={textColor} alt="top text color"></img>
                      </span>
                      <input
                        className="text-color-picker top-text--color"
                        type="color"
                        id="topTextColor"
                        value={topTextColor}
                        onChange={handleTopTextColor}
                      />
                    </div>
                  </div>
                </div>

                {/* BOTTOM TEXT inputs */}
                <div className="bottom-text-container">
                  <div className="meme-form-group bottom-text">
                    <label htmlFor="bottomText">Bottom Text</label>
                    <input
                      className="bottom-text--input"
                      type="text"
                      id="bottomText"
                      placeholder="BOTTOM TEXT"
                      value={bottomText}
                      onChange={handleBottomText}
                    />
                  </div>

                  <div className="text-modifiers">
                    <div className="meme-form-group--modifiers">
                      <label htmlFor="bottomTextSize">Size</label>
                      <span className="text-size--icon">
                        <img src={textSize} alt="bottom text size"></img>
                      </span>
                      <input
                        className="text-size--slider bottom-text--size"
                        type="range"
                        id="bottomTextSize"
                        min="20"
                        max="80"
                        value={bottomTextSize}
                        onChange={handleBottomTextSize}
                      />
                    </div>

                    <div className="meme-form-group--modifiers">
                      <label htmlFor="bottomTextColor">Color</label>
                      <span className="text-color--icon">
                        <img src={textColor} alt="bottom text color"></img>
                      </span>
                      <input
                        className="text-color-picker bottom-text--color"
                        type="color"
                        id="bottomTextColor"
                        value={bottomTextColor}
                        onChange={handleBottomTextColor}
                      />
                    </div>
                  </div>
                </div>

                {/* MEME templates select */}
                <div className="meme-form-group templates-container">
                  <label htmlFor="meme">Choose from templates</label>
                  <select id="meme" value={meme} onChange={handleMeme}>
                    <option value="" style={{ textAlign: "center" }}>
                      Select a meme template
                    </option>
                    {memes.map((meme) => (
                      <option key={meme.id} value={meme.url}>
                        {meme.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="meme-buttons-container">
                  {/* UPLOAD custom meme */}
                  <div className="meme-form-group upload-meme-container">
                    <label htmlFor="upload">Upload meme</label>
                    <input
                      type="file"
                      id="upload"
                      accept="image/*"
                      onChange={handleUpload}
                    />
                  </div>

                  <div className="meme-form-group save-meme-container">
                    {/* SAVE meme */}
                    <button
                      className="meme-button save-meme--btn"
                      onClick={handleSave}
                    >
                      <img
                        src={downloadIcon}
                        alt="Download Icon"
                        className="meme-button-icon"
                      />
                      Save Meme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL share buttons */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Meme;
