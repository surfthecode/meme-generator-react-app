import React from "react";
import mockData from "../components/mockData";
import trollface from "../assets/images/trollface.png";

const Meme = () => {
  const source = "https://api.imgflip.com/get_memes";
  let memeUrl, memeKey, memeAlt;
  const [memeImg, setMemeImg] = React.useState("");

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

  const getMemeImg = () => {
    const memesArr = mockData.data.memes;
    const randomIndex = Math.floor(Math.random() * memesArr.length) + 1;
    const randomMemeObj = memesArr[randomIndex];
    memeUrl = randomMemeObj.url;
    memeAlt = randomMemeObj.name;
    memeKey = randomMemeObj.id;
    setMemeImg(memeUrl);
  };

  return (
    <main>
      <h3>Create your own meme</h3>
      <form>
        <input type="text" className="form--input" placeholder="top text" />
        <input type="text" className="form--input" placeholder="bottom text" />
        <button className="form--btn" type="button" onClick={getMemeImg}>
          Get new meme
          <img src={trollface} alt="trollface" className="btn--logo" />
        </button>
      </form>
      <div className="meme-container">
        <img src={memeImg} alt={memeAlt} className="memeImg" />
      </div>
    </main>
  );
};

export default Meme;
