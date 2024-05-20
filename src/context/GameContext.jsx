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


  //logica para puertas en el contexto

  const [activators, setActivators] = useState({}) //lista activadores
  const [doors, setDoors] = useState({}) //lista de puertas

  //registrar un activador con su estado
  const registerActivator = (id) => {
    setActivators((prev) => ({...prev, [id]: false}))
  }

  //registrar una puerta con sus activadores y su estado
  const registerDoor = (id, requiredActivators) => {
    setDoors((prev) => ({...prev, [id]: {requiredActivators, isOpen:false}}))
  }

  const setActivatorState = (id, state) => {
    setActivators((prev) => ({...prev, [id] : state}))
    updateDoors()
  }

  const updateDoors = () => {
    setDoors((prev) => {
      const newDoors = {...prev}
      for (const [id, door] of Object.entries(newDoors)){
        newDoors[id].isOpen = door.requiredActivators.every((activator) => activators[activator])
      }
      return newDoors
    })
  }

  const isDoorOpen = (id) => {
    return doors[id]?.isOpen || false
  }


  ////fin logica puertas
  

  return (
    <GameContext.Provider value={{registerActivator, registerDoor, setActivatorState, isDoorOpen , isTakingLamp, setIsTakingLamp, isAttacking, setIsAttacking, isTakingSword, setIsTakingSword, actualObject, setActualObject}}>
      {children}
    </GameContext.Provider>
  );
};

// 3. Consumir el contexto
export const useGameContext = () => useContext(GameContext);