import React, { useEffect } from "react";
import { checkWin } from "../util";

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;
  if (checkWin(correctLetters, wrongLetters, selectedWord) === "Won") {
    finalMessage = "Congrats! You Won! ☺";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "Lost") {
    finalMessage = "You Lost! Try again! Save some men!";
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));
  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
