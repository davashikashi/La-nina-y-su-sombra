// En un archivo llamado GameContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Crear el contexto
const GameContext = createContext();

// 2. Proveer el contexto
export const GameContextProvider = ({ children }) => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingSword, setIsTakingSword] = useState(false);
  const [isTakingLamp, setIsTakingLamp] = useState(false);
  const [actualObject, setActualObject] = useState();
  const [puntaje, setPuntaje] = useState(0);
  const [health, setHealth] = useState(3);

  const [palancas, setPalancas] = useState({});
  const [placasPresion, setPlacasPresion] = useState({});
  const [lastCheckedScore, setLastCheckedScore] = useState(0);

  useEffect(() => {
    if (puntaje > lastCheckedScore && puntaje % 10 === 0 && health < 3) {
      setHealth(prevHealth => prevHealth + 1);
      setLastCheckedScore(puntaje);
    }
  }, [puntaje, health, lastCheckedScore]);

  // Función para actualizar el estado de las palancas
  const togglePalanca = (id, estado) => {
    setPalancas((prevPalancas) => ({ ...prevPalancas, [id]: estado }));
  };

  // Función para actualizar el estado de las placas de presión
  const togglePlacaPresion = (id, estado) => {
    setPlacasPresion((prevPlacasPresion) => ({ ...prevPlacasPresion, [id]: estado }));
  };

  return (
    <GameContext.Provider
      value={{
        health, 
        setHealth,
        puntaje,
        setPuntaje,
        palancas,
        placasPresion,
        togglePalanca,
        togglePlacaPresion,
        isTakingLamp,
        setIsTakingLamp,
        isAttacking,
        setIsAttacking,
        isTakingSword,
        setIsTakingSword,
        actualObject,
        setActualObject
      }}>
      {children}
    </GameContext.Provider>
  );
};

// 3. Consumir el contexto
export const useGameContext = () => useContext(GameContext);