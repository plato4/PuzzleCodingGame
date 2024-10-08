import "./app.css";
import "../../css/scifi.css";
import "../../css/palette.css";

import { createContext, useContext, useState } from "react";
import React from "react";

import { GameCanvas } from "../gamecanvas/GameCanvas";
import { Ui } from "../ui/Ui";

import { Game } from "../../engine/Game";
import { GitHub } from "../github/GitHub";

document.addEventListener("contextmenu", (event) => event.preventDefault());

export type GameContextType = {
  game: Game | undefined;
  setGame: (game: Game) => void;
};

export const GameContext = createContext<GameContextType>({
  game: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setGame: (_game) => console.warn("no game provider"),
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => useContext(GameContext);

export const App: React.FC = () => {
  const [game, setGame] = useState<Game>();
  const [started, setStarted] = useState(false);
  return (
    <div>
      {window.location.hostname.includes("github") ? <GitHub /> : <></>}
      {started ? (
        <div>
          <GameContext.Provider value={{ game, setGame }}>
            <div className="game-layer-container">
              <GameCanvas />
            </div>
            <div className="ui-layer-container">
              <Ui />
            </div>
          </GameContext.Provider>
        </div>
      ) : (
        <div className="prompt-container" onClick={() => setStarted(true)}>
          <h1 style={{ margin: "auto" }}>CLICK TO START!</h1>
        </div>
      )}
    </div>
  );
};
