// En un archivo llamado GameContext.js
import React, { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const GameContext = createContext();

// 2. Proveer el contexto
export const GameContextProvider = ({ children }) => {
  
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingSword, setIsTakingSword] = useState(false);
  const [isTakingLamp, setIsTakingLamp] = useState(false);
  const [actualObject, setActualObject] = useState();
  

  return (
    <GameContext.Provider value={{ isTakingLamp, setIsTakingLamp, isAttacking, setIsAttacking, isTakingSword, setIsTakingSword, actualObject, setActualObject}}>
      {children}
    </GameContext.Provider>
  );
};

// 3. Consumir el contexto
export const useGameContext = () => useContext(GameContext);