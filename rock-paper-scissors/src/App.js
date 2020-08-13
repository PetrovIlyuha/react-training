import React, { useState } from "react";
import Rock from "./icons/Rock";
import Paper from "./icons/Paper";
import Scissors from "./icons/Scissors";
import "./App.css";
import { useEffect } from "react";
import GameStats from "./GameStats";
import Popup from "./Popup";
import PlayersChoices from "./PlayersChoices";

const choices = [
  { id: 3, name: "scissors", component: Scissors, losesTo: 1 },
  { id: 2, name: "paper", component: Paper, losesTo: 3 },
  { id: 1, name: "rock", component: Rock, losesTo: 2 },
];

export default function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }, []);

  const resetGame = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    setGameState(null);
  };

  const handleUserChoice = (choice) => {
    const chosen = choices.find((c) => c.id === choice);
    setUserChoice(chosen);

    if (chosen.losesTo === computerChoice.id) {
      setGameState("lose");
      setLosses((losses) => losses + 1);
    } else if (computerChoice.losesTo === chosen.id) {
      setGameState("win");
      setWins((wins) => wins + 1);
    } else if (computerChoice.id === chosen.id) {
      setGameState("draw");
    }
  };

  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }

  return (
    <div className="app">
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>
        <GameStats wins={wins} losses={losses} />
      </div>
      <Popup
        gameState={gameState}
        renderComponent={renderComponent}
        userChoice={userChoice}
        computerChoice={computerChoice}
        resetGame={resetGame}
      />
      <PlayersChoices handleUserChoice={handleUserChoice} />
    </div>
  );
}
