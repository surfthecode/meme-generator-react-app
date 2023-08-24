import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from 'react-resizable';
import { SketchPicker } from 'react-color';

import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

import trollface from "../assets/images/trollface.png";
import defaultImg from "../assets/images/default-img.jpg";
import downloadIcon from "../assets/icons/download.svg";

const Meme = () => {
  const source = "https://api.imgflip.com/get_memes";

  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [topTextColor, setTopTextColor] = useState('');
  const [bottomTextColor, setBottomTextColor] = useState('');
  const [topTextSize, setTopTextSize] = useState(40);
  const [bottomTextSize, setBottomTextSize] = useState(40);
  const [showInstructions, setShowInstructions] = useState(false);

  const memeRef = useRef();

  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  const handleTopText = (e) => {
    setTopText(e.target.value);
  };

  const handleTopTextSize = (e) => {
    setTopTextSize(e.target.value);
  };

  const handleTopTextColor = (e) => {
    setTopTextColor(e.target.value);
  };
  
  const handleBottomText = (e) => {
    setBottomText(e.target.value);
  };

  const handleBottomTextSize = (e) => {
    setBottomTextSize(e.target.value);
  };

  const handleBottomTextColor = (e) => {
    setBottomTextColor(e.target.value);
  };
  
    const handleMeme = (e) => {
    setMeme(e.target.value);
    console.log(e);
  };
  
  const handleNewMeme = () => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setMeme(randomMeme.url);
  };

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
        alert("The file is too large. Please choose a smaller image, less than 10MB");
      }
    } else {
      // Display an error message if the file is not an image
      alert("The file is not an image. Please choose an image file.");
    }
  };

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

 return (
      <main>
        <div className="meme-container">
          <div className="meme">

            <h3 className="meme-title">Unleash your inner <span className="meme-lord">Meme Lord</span></h3>

            <div className="meme-form">
              {/* Meme image & text container*/}
              <div className="meme-image--container" ref={memeRef}>
                <Draggable bounds="parent">
                  <div
                    className="meme-text meme-text--top"
                    style={{color: topTextColor, fontSize:`${topTextSize}px`}}>
                      {topText}
                  </div>
                </Draggable>

                <img
                  src={meme ? meme : defaultImg}
                  alt="Meme"
                  className="meme-image"/>

                <Draggable bounds="parent">
                  <div
                    className="meme-text meme-text--bottom"
                    style={{color: bottomTextColor, fontSize:`${bottomTextSize}px`}}>
                      {bottomText}
                  </div>
                </Draggable>
              </div>

              {/* HOW TO instructions */}
              <p
                className="meme-howto"
                onClick={() => setShowInstructions(!showInstructions)}>
                  &#10149; meme how to
              </p>

              {/* TOGGLE list */}
              {showInstructions && (
                <div className="meme-howto-modal">
                  <div className="meme-howto-modal-content">
                    <span
                      className="meme-howto-modal-close"
                      onClick={() => setShowInstructions(false)}>
                        &times;
                    </span>

                    <ul className="meme-howto-modal-list">
                      <li> &#10149; Get a new meme, choose one from the template list,  or upload your own.
                      </li>
                      <li>&#10149; Add some sparkling fun captions and move them  around.
                      </li>
                      <li> &#10149; Save or share your masterpiece and try not to   break   the internet!😂
                      </li>
                    </ul>
                  </div>
                 </div>
                )}

              {/* TOP TEXT input */}
            <div className="meme-form-group--container">
              <div className="meme-form-group">
                <label htmlFor="topText">Top Text</label>
                <input
                  type="text"
                  id="topText"
                  placeholder="Top Text"
                  value={topText}
                  onChange={handleTopText}
                />
              </div>

              {/* TOP TEXT size */}
        <div className="meme-form-group">
          <label htmlFor="topTextSize">Top Text Size</label>
            <input
              className="text-size--slider"
              type="range"
              id="topTextSize"
              min="20"
              max="80"
              value={topTextSize}
              onChange={handleTopTextSize}
            />
        </div>

               {/* TOP TEXT color */}
        <div className="meme-form-group">
          <label htmlFor="topTextColor">Top Text Color</label>
            <input
              type="color"
              id="topTextColor"
              value={topTextColor}
              onChange={handleTopTextColor}
              />
         </div>

              {/* BOTTOM TEXT input */}
        <div className="meme-form-group">
            <label htmlFor="bottomText">Bottom Text</label>
              <input
                  type="text"
                  id="bottomText"
                  placeholder="Bottom Text"
                  value={bottomText}
                  onChange={handleBottomText}
                />
            </div>

              {/* BOTTOM TEXT size */}
          <div className="meme-form-group">
            <label htmlFor="bottomTextSize">Bottom Text Size</label>
               <input
                  className="text-size--slider"
                  type="range"
                  id="bottomTextSize"
                  min="20"
                  max="80"
                  value={bottomTextSize}
                  onChange={handleBottomTextSize}
                />
            </div>

              {/* BOTTOM TEXT color */}
<div className="meme-form-group">
  <label htmlFor="bottomTextColor">Bottom Text Color</label>
  <input
    type="color"
    id="bottomTextColor"
    value={bottomTextColor}
    onChange={handleBottomTextColor}
  />
</div>

              {/* MEME templates list */}
              <div className="meme-form-group">
                <label htmlFor="meme">Meme Template</label>

                <select
                  id="meme"
                  value={meme}
                  onChange={handleMeme}
                >
                  <option value="">Select a meme template</option>
                    {memes.map((meme) => (
                      <option key={meme.id} value={meme.url}>
                        {meme.name}
                  </option>
                  ))}
                </select>
              </div>

              {/* UPLOAD own meme */}
              <div className="meme-form-group">
                <label htmlFor="upload">Upload Image</label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </div>

              {/* GET new meme */}
              <div className="meme-form-group">
                <button
                  className="meme-button meme-button--success"
                  onClick={handleNewMeme}
                >
                  New Meme
                </button>

              {/* SAVE meme */}
                <button
                  className="meme-button meme-button--success"
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
        </div>
      </main>
    )
}

export default Meme;
