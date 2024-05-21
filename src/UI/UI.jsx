import React from 'react';

import './GameUI.css'; // Asegúrate de crear un archivo CSS para la UI
import { useGameContext } from '../context/GameContext';

const GameUI = () => {
  const { puntaje, health} = useGameContext()

  return (
    <div className="game-ui">
      <div className="score">
        <h2>Puntaje: {puntaje}</h2>
      </div>
      <div className="lives">
        <h2>Vida: {health}</h2>
      </div>
      
    </div>
  );
};

export default GameUI;
