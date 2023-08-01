import React from "react";
import trollface from "../assets/images/trollface.png";

const Meme = () => {
  return (
    <main>
      <form>
        <input type="text" className="from--input" placeholder="top text" />
        <input type="text" className="from--input" placeholder="bottom text" />
        <button className="form--btn">Get new meme</button>
      </form>
    </main>
  );
};

export default Meme;
