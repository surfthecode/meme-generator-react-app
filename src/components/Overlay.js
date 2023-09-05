import React, { useState } from "react";

function Overlay() {
  const [showOverlay, setShowOverlay] = useState(true);

  function handleClick() {
    setShowOverlay(false);
  }

  return (
    <div
      className="overlay"
      style={{
        display: showOverlay ? "block" : "none",
      }}
    >
      <div className="overlay-content overlay-content--get-meme">
        <p style={{ padding: "0rem", margin: "0" }}>
          1. Get a new meme by clicking on the "GET NEW MEME" button.
        </p>
      </div>

      <div className="overlay-content overlay-content--template">
        <p style={{ padding: "0rem", margin: "0" }}>
          2. Then, you can also select a meme from the template list.
        </p>
      </div>

      <div className="overlay-content overlay-content--upload">
        <p style={{ padding: "0rem", margin: "0" }}>
          3. Or, you can upload your own meme to play around.
        </p>
      </div>

      <div className="overlay-content overlay-content--text">
        <p style={{ padding: "0rem", margin: "0" }}>
          4. Now you can create a fun top and bottom meme text.
        </p>
      </div>

      <div className="overlay-content overlay-content--style">
        <p style={{ padding: "0rem", margin: "0" }}>
          5. And you can style the text size and color to your liking.
        </p>
      </div>

      <div className="overlay-content overlay-content--save">
        <p style={{ padding: "0rem", margin: "0" }}>
          6. Save your masterpice and try not to break the internet 🥳
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onClick={handleClick}
      ></div>
    </div>
  );
}

export default Overlay;
