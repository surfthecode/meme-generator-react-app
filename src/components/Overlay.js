import React, { useState } from "react";

function Overlay() {
  const [showOverlay, setShowOverlay] = useState(true);

  function handleClick() {
    console.log("clicked");
    setShowOverlay(false);
  }

  return (
    <div
      className="overlay"
      style={{
        display: showOverlay ? "block" : "none",
      }}
    >
      <div
        className="box"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 1rem 2rem rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="overlay-list"
          style={{
            fontSize: "2rem",
            lineHeight: "2",
            padding: "0.5rem",
          }}
        >
          <ul className="meme-howto-modal-list">
            <li>
              {" "}
              &#10149; Get a new meme, choose one from the template list, or
              upload your own.
            </li>
            <li>
              &#10149; Add some sparkling fun captions and move them around.
            </li>
            <li>
              {" "}
              &#10149; Save or share your masterpiece and try not to break the
              internet!😂
            </li>
          </ul>
        </div>
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
