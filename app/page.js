"use client";

import React, { useEffect, useState } from "react";
import Home from "../components/home.jsx";
import Welcome from "../components/welcome";
import Game1 from "../components/game1.jsx";
import Game2 from "../components/game2.jsx";

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [screen, setScreen] = useState("home"); // home | game1 | game2

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]); //makes sure page loads at top

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen">
      {showWelcome ? (
        <Welcome onComplete={handleWelcomeComplete} />
      ) : (
        <div className="opacity-100">
          {screen === "home" && <Home onStart={() => setScreen("game1")} />}
          {screen === "game1" && <Game1 onNextGame={() => setScreen("game2")} />}
          {screen === "game2" && <Game2 />}
        </div>
      )}
    </div>
  );
}
