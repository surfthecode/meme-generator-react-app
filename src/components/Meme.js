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

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setMeme(reader.result);
    };

    reader.readAsDataURL(file);
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
        <div className="container">
          <div className="meme">

            <div className="meme-image">
              <Draggable>
                <div className="meme-text meme-text--top">{topText}</div>
              </Draggable>

              <img
                src={meme ? meme : defaultImg}
                alt="Meme"
                ref={memeRef}
              />

              <Draggable>
                <div className="meme-text meme-text--bottom">
                  {bottomText}
                </div>
              </Draggable>
            </div>

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
            </div>
          </div>
        </div>
      </main>
    )
}

export default Meme;
