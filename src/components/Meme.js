import React from "react";
import trollface from "../assets/images/trollface.png";

const Meme = () => {
  return (
    <main>
      <form>
        <input type="text" className="form--input" placeholder="top text" />
        <input type="text" className="form--input" placeholder="bottom text" />
        <button className="form--btn">
          Get new meme{" "}
          <img src={trollface} alt="trollface" className="btn--logo" />
        </button>
      </form>
    </main>
  );
};

export default Meme;
