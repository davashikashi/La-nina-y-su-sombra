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

  const [palancas, setPalancas] = useState({});
  const [placasPresion, setPlacasPresion] = useState({});

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