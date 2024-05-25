// En un archivo llamado GameContext.js
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import agregarVida from "../Sounds/agregar vida.mp3";
import Recompensa from "../Sounds/recogerRecompensa.mp3";


// 1. Crear el contexto
const GameContext = createContext();

// 2. Proveer el contexto
export const GameContextProvider = ({ children }) => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [isTakingSword, setIsTakingSword] = useState(false);
  const [isTakingLamp, setIsTakingLamp] = useState(false);
  const [actualObject, setActualObject] = useState();
  
  
  const [puntaje, setPuntaje] = useState(0); //el puntaje es compartido 
  const [health, setHealth] = useState(3);  //vida del avatar (toca separar la vida del shadow conn la de la niña)
  const [shadowAvatar, setShadowAvatar] = useState(); //ref de el shadowAvatar
  const [girlAvatar, setGirlAvatar] = useState(); // ref de la niña
  const [palancas, setPalancas] = useState({}); //diccionario palancas id : estado
  const [placasPresion, setPlacasPresion] = useState({}); //diccionario plates con id : estado
  const [tentacles, setTentacles] = useState({}) //diciconario tentaculos con id : ref
  const [cajas, setCajas] = useState({})
  const [flowers, setFlowers] = useState({})
  const [fires, setFires] = useState({})
  const [shadows, setShadows] = useState({})

  const [lastCheckedScore, setLastCheckedScore] = useState(0);
  

  const subeVida = new Audio(agregarVida)
  const recompensa = new Audio(Recompensa)


  const addTentacle = useCallback((id, ref) => {
    setTentacles(prevTentacles => ({
      ...prevTentacles,
      [id]: ref
    }));
  }, []);

  const removeTentacle = useCallback((id) => {
    setTentacles(prevTentacles => {
      const updatedTentacles = { ...prevTentacles };
      delete updatedTentacles[id];
      return updatedTentacles;
    });
  }, []);

  const addCaja = useCallback((id, ref) => {
    setCajas(prevCajas => ({
      ...prevCajas,
      [id]: ref
    }));
  }, []);

  const addFlower = useCallback((id, ref) => {
    setFlowers(prevFlowers => ({
      ...prevFlowers,
      [id]: ref
    }));
  }, []);

  const removeFlower = useCallback((id) => {
    setFlowers(prevFlowers => {
      const updatedFlowers = { ...prevFlowers };
      delete updatedFlowers[id];
      return updatedFlowers;
    });
  }, []);

  const addFire = useCallback((id, ref) => {
    setFires(prevFires => ({
      ...prevFires,
      [id]: ref
    }));
  }, []);

  const removeFire = useCallback((id) => {
    setFires(prevFires => {
      const updatedFires = { ...prevFires };
      delete updatedFires[id];
      return updatedFires;
    });
  }, []);

  
  const addShadow = useCallback((id, ref) => {
    setShadows(prevShadows => ({
      ...prevShadows,
      [id]: ref
    }));
  }, []);

  const removeShadow = useCallback((id) => {
    setShadows(prevShadows => {
      const updatedShadows = { ...prevShadows };
      delete updatedShadows[id];
      return updatedShadows;
    });
  }, []);

  

  useEffect(() => {
    if (puntaje > lastCheckedScore && puntaje % 10 === 0 && health < 3) {
      setHealth(prevHealth => prevHealth + 1);
      setLastCheckedScore(puntaje);
      subeVida.volume = 0.5;
      subeVida.play();
    }

    // if (tentacles) {
    //   console.log(shadows)
    // }
  }, [puntaje, lastCheckedScore]);



  useEffect(() => {
    if (puntaje) {
      recompensa.volume = 0.2;
      recompensa.play()
    }
  }, [puntaje])

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
        addShadow,
        removeShadow,
        shadows,
        setShadows,
        addFire,
        removeFire,
        fires,
        setFires,
        addFlower,
        removeFlower,
        setFlowers,
        flowers,
        addCaja,
        cajas, 
        setCajas,
        removeTentacle,
        addTentacle,
        tentacles,
        setTentacles,
        girlAvatar,
        setGirlAvatar,
        shadowAvatar,
        setShadowAvatar,
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