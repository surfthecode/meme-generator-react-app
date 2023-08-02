import React from "react";
import mockData from "../components/mockData";
import trollface from "../assets/images/trollface.png";
import defaultImg from "../assets/images/default-img.jpg";

const Meme = () => {
  const source = "https://api.imgflip.com/get_memes";

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImg: defaultImg,
    key: "",
    alt: "",
  });

  const [allMemeImages, setAllMemeImages] = React.useState(mockData);

  // const getData = async function (source) {
  //   try {
  //     const response = await fetch(source);
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);

  //     if (!response.success) {
  //       alert("Server error:", response.error_message);
  //     } else {
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log("Fetch error:", error);
  //   }
  // };

  const getMemeImage = () => {
    const memesArr = mockData.data.memes;
    const randomIndex = Math.floor(Math.random() * memesArr.length) + 1;
    const randomMemeObj = memesArr[randomIndex];

    let memeUrl = randomMemeObj.url;
    let memeAlt = randomMemeObj.name;
    let memeKey = randomMemeObj.id;

    setMeme((prev) => ({
      ...prev,
      randomImg: memeUrl,
      key: memeKey,
      alt: memeAlt,
    }));
  };

  return (
    <main>
      <h3>Create your own meme</h3>
      <form>
        <input type="text" className="form--input" placeholder="top text" />
        <input type="text" className="form--input" placeholder="bottom text" />
        <button className="form--btn" type="button" onClick={getMemeImage}>
          Get new meme
          <img src={trollface} alt="trollface" className="btn--logo" />
        </button>
      </form>
      <div className="meme-container">
        <img
          src={meme.randomImg}
          alt={meme.alt}
          key={meme.key}
          className="memeImg"
        />
      </div>
    </main>
  );
};

export default Meme;
