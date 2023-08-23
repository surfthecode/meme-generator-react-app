import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

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

  const memeRef = useRef();

  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  const handleTopText = (e) => {
    setTopText(e.target.value);
  };

  const handleBottomText = (e) => {
    setBottomText(e.target.value);
  };

  const handleMeme = (e) => {
    setMeme(e.target.value);
  };
  
  const handleNewMeme = () => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setMeme(randomMeme.url);
  };

  // const handleUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setMeme(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

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
            <h3 className="meme-title">Unleash your inner Meme Lord</h3>

            <p className="meme-howto">&#9755; Get a new meme, choose one from the template list, or upload your own. <br></br>
            &#9755; Add some sparkling fun captions and move them around. <br></br>&#9755; Save or share your masterpiece and try not to break the internet!😂</p>

            <div className="meme-form">
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

              <div className="meme-form-group">
                <label htmlFor="upload">Upload Image</label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </div>

              <div className="meme-form-group">
                <button
                  className="meme-button meme-button--success"
                  onClick={handleNewMeme}
                >
                  New Meme
                </button>
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

              <div className="meme-image--container" ref={memeRef}>
              <Draggable bounds="parent">
                <div className="meme-text meme-text--top">{topText}</div>
              </Draggable>

              <img
                src={meme ? meme : defaultImg}
                alt="Meme"
                className="meme-image"
                
              />

              <Draggable bounds="parent">
                <div className="meme-text meme-text--bottom">
                  {bottomText}
                </div>
              </Draggable>
            </div>
            </div>
          </div>
        </div>
      </main>
    )
}

export default Meme;
