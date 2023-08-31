import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Meme from "./components/Meme";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";

// clear sessionStorage
function clearSessionStorage() {
  sessionStorage.clear();
}

function App() {
  // showOverlay state variable
  const [showOverlay, setShowOverlay] = useState(false);

  // check viewport width and set showOverlay
  useEffect(() => {
    function handleResize() {
      // if viewport > 1600px & overlayShown = false, set showOverlay = true
      if (window.innerWidth > 1600 && !sessionStorage.getItem("overlayShown")) {
        setShowOverlay(true);
        // set overlayShown = true in sessionStorage
        sessionStorage.setItem("overlayShown", true);
      } else {
        setShowOverlay(false);
      }
    }
    // handleResize on page load
    handleResize();
    // listen for resize
    window.addEventListener("resize", handleResize);

    // clear sessionStorage on unmount
    window.addEventListener("beforeunload", (e) => {
      sessionStorage.clear();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearSessionStorage();
    };
  }, []);

  return (
    <>
      {showOverlay && <Overlay />}
      <Header />
      <Meme />
      <Footer />
    </>
  );
}

export default App;
