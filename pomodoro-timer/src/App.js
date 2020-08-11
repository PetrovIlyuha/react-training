import React, { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [title, setTitle] = useState("Let the countdown begin!");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  let intervalRef = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
    setTitle("You are on your way!");
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        setTitle(
          "Working session is over! Come back for another round in 5 min"
        );
        setTimeout(() => {
          resetTimer();
        }, 0);

        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTitle("Pause can't last forever, you know!");
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(25 * 60);
  };
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>
        {/* <span role="img" aria-label="Main Title">
          🍅
        </span>
        omodoro! */}
        {title}
      </h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
