import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

import trollface from "../assets/images/trollface.png";
import defaultImg from "../assets/images/default-img.jpg";
import downloadIcon from "../assets/icons/download.svg";

const Meme = () => {
  const source = "https://api.imgflip.com/get_memes";

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImg: defaultImg,
    alt: "",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(source);
      const data = await response.json();
      setAllMemes(data.data.memes);
    }
    getData();
  }, []);

  const getMemeImage = () => {
    const randomIndex = Math.floor(Math.random() * allMemes.length) + 1;
    const randomMemeObj = allMemes[randomIndex];

    let memeUrl = randomMemeObj.url;
    let memeAlt = randomMemeObj.name;

    setMeme((prev) => ({
      ...prev,
      randomImg: memeUrl,
      alt: memeAlt,
    }));
  };

  const handleChange = function (event) {
    const { name, value } = event.target;
    setMeme((prev) => ({ ...prev, [name]: value }));
  };

  // Save Image
  //access the HTML element that contains the meme image by using the useRef hook which is a way to store a reference to a value that persists across renders
  const memeRef = useRef(null);

  const saveMeme = () => {
    // get the meme container element
    const memeElement = memeRef.current;

    // calling htmlToImage.toBlob method on the meme element returns a promise that resolves with a blob object containing the image data in PNG format.
    htmlToImage
      .toBlob(memeElement) //  blob = binary large object used to store files in memory or transfer them over the network
      .then(function (blob) {
        // download the blob to a file
        saveAs(blob, "meme.png");
      })
      .catch(function (error) {
        // handle errors during conversion or download
        alert("oops, something went wrong!", error);
      });
  };

  //Change text position
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);

  return (
    <main>
      <h3>Create your own meme</h3>

      <form>
        <input
          type="text"
          className="form--input"
          placeholder="top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form--input"
          placeholder="bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--btn" type="button" onClick={getMemeImage}>
          Get new meme
          <img src={trollface} alt="trollface" className="btn--logo" />
        </button>
      </form>

      <div className="meme-container" ref={memeRef}>
        <img src={meme.randomImg} alt={meme.alt} className="memeImg" />

        <Draggable bounds="parent">
          <p className="meme--text top" ref={topTextRef}>
            {meme.topText}
          </p>
        </Draggable>

        <Draggable bounds="parent">
          <p className="meme--text bottom" ref={bottomTextRef}>
            {meme.bottomText}
          </p>
        </Draggable>
      </div>

      <div className="download" onClick={saveMeme}>
        <img src={downloadIcon} alt="download-icon" />
      </div>
    </main>
  );
};

export default Meme;
