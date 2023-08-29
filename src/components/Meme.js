import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

import textSize from "../assets/icons/text-size.png";
import textColor from "../assets/icons/text-color.png";
import defaultImg from "../assets/images/default-img.jpg";
import downloadIcon from "../assets/icons/download.svg";

const Meme = () => {
  const source = "https://api.imgflip.com/get_memes";

  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [topTextColor, setTopTextColor] = useState("");
  const [bottomTextColor, setBottomTextColor] = useState("");
  const [topTextSize, setTopTextSize] = useState(40);
  const [bottomTextSize, setBottomTextSize] = useState(40);
  const [showInstructions, setShowInstructions] = useState(false);

  // Create a reference to the meme container element
  const memeRef = useRef();

  // Fetch memes from the API
  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  // Update the top text when the top text input changes
  const handleTopText = (e) => {
    setTopText(e.target.value);
  };

  // Update the bottom text when the bottom text input changes
  const handleTopTextSize = (e) => {
    setTopTextSize(e.target.value);
  };

  // Update the top text when the top text input changes
  const handleTopTextColor = (e) => {
    setTopTextColor(e.target.value);
  };

  // Update the bottom text when the bottom text input changes
  const handleBottomText = (e) => {
    setBottomText(e.target.value);
  };

  // Update the bottom text when the bottom text input changes
  const handleBottomTextSize = (e) => {
    setBottomTextSize(e.target.value);
  };

  //  Update the bottom text when the bottom text input changes
  const handleBottomTextColor = (e) => {
    setBottomTextColor(e.target.value);
  };

  // Update the meme when the meme select changes
  const handleMeme = (e) => {
    setMeme(e.target.value);
    console.log(e);
  };

  // Get a new meme
  const handleNewMeme = () => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setMeme(randomMeme.url);
  };

  // Upload your own meme
  const handleUpload = (e) => {
    const file = e.target.files[0];

    // Check if the file is an image
    if (file && file.type.match("image.*")) {
      // Check if the file is not too large (less than 5 MB)
      if (file.size < 10000000) {
        // Create a URL from the file object
        const userImageUrl = URL.createObjectURL(file);

        // Set the meme state to the URL
        setMeme(userImageUrl);

        // Release the memory after the image is loaded
        URL.revokeObjectURL(file);
      } else {
        // Display an error message if the file is too large
        alert(
          "The file is too large. Please choose a smaller image, less than 10MB"
        );
      }
    } else {
      // Display an error message if the file is not an image
      alert("The file is not an image. Please choose an image file.");
    }
  };

  // Save the meme
  const handleSave = () => {
    console.log("Saving meme...");
    htmlToImage
      .toBlob(memeRef.current)
      .then(function (blob) {
        saveAs(blob, "meme.png");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  // Social media sharing

  return (
    <main>
      <div className="meme-container">
        <div className="meme">
          <h3 className="meme-title">
            Unleash your inner <span className="meme-lord">Meme Lord</span>
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
                    placeholder="  TOP TEXT"
                    value={topText}
                    onChange={handleTopText}
                  />
                </div>

                <div className="text-modifiers">
                  <div className="meme-form-group--modifiers">
                    <label htmlFor="topTextSize">Size</label>
                    <span className="text-size--icon">
                      <img src={textSize}></img>
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
                      <img src={textColor}></img>
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
                    placeholder="  BOTTOM TEXT"
                    value={bottomText}
                    onChange={handleBottomText}
                  />
                </div>

                <div className="text-modifiers">
                  <div className="meme-form-group--modifiers">
                    <label htmlFor="bottomTextSize">Size</label>
                    <span className="text-size--icon">
                      <img src={textSize}></img>
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
                      <img src={textColor}></img>
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
                {/* UPLOAD own meme */}
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
  );
};

export default Meme;
