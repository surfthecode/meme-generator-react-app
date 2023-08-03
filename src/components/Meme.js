import React, { useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import trollface from "../assets/images/trollface.png";
import defaultImg from "../assets/images/default-img.jpg";

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
      <div className="meme-container">
        <img src={meme.randomImg} alt={meme.alt} className="memeImg" />
        <h4 className="meme--text top">{meme.topText}</h4>
        <h4 className="meme--text bottom">{meme.bottomText}</h4>
      </div>
    </main>
  );
};

export default Meme;
