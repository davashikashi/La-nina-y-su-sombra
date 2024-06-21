// En un archivo llamado GameContext.js
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import agregarVida from "../Sounds/agregar vida.mp3";
import Recompensa from "../Sounds/recogerRecompensa.mp3";
import { db } from "../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { get, set } from 'firebase/database';
import { Vector3 } from 'three';
import { socket } from '../socket/socket-manager';


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
  const [Avatar, setAvatar] = useState(); // ref de la niña
  const [palancas, setPalancas] = useState({}); //diccionario palancas id : estado
  const [placasPresion, setPlacasPresion] = useState({}); //diccionario plates con id : estado
  const [tentacles, setTentacles] = useState({}) //diciconario tentaculos con id : ref
  const [cajas, setCajas] = useState({})
  const [flowers, setFlowers] = useState({})
  const [fires, setFires] = useState({})
  const [shadows, setShadows] = useState({})
  // const [docID, setDocID] = useState(''); //id del documento en firebase

  const [lastCheckedScore, setLastCheckedScore] = useState(0);


  const subeVida = new Audio(agregarVida)
  const recompensa = new Audio(Recompensa)

  //guardar las posiciones para firebase 
  const [tentaclePositions, setTentaclePositions] = useState({}); // Diccionario de posiciones de tentáculos: id -> {x, y, z}
  const [cajaPositions, setCajaPositions] = useState({}); // Diccionario de posiciones de cajas: id -> {x, y, z}
  const [flowerPositions, setFlowerPositions] = useState({}); // Diccionario de posiciones de flores: id -> {x, y, z}
  const [firePositions, setFirePositions] = useState({}); // Diccionario de posiciones de fuegos: id -> {x, y, z}
  const [shadowPositions, setShadowPositions] = useState({}); // Diccionario de posiciones de sombras: id -> {x, y, z}

  const getAllCheckpoints = async () => {
    try {
      // Obtener la referencia a la colección "checkpoints"
      const checkpointsCollection = collection(db, 'checkpoints');

      // Obtener todos los documentos de la colección
      const querySnapshot = await getDocs(checkpointsCollection);

      const allCheckpoints = [];

      // Iterar sobre cada documento y obtener sus datos
      querySnapshot.forEach((doc) => {

        allCheckpoints.push({
          id: doc.id,
          data: doc.data()
        });

      });

      return allCheckpoints[0].data;
    } catch (error) {
      console.error('Error al obtener los documentos de la colección:', error);
    }
  };

  

  const setFlowerVisibility = (id, visible) => {
    setFlowerPositions(prevFlowerPositions => ({
      ...prevFlowerPositions,
      [id]: {
        ...prevFlowerPositions[id],
        visible: visible
      }
    }));
  };
  const setTentacleVisibility = (id, visible) => {
    setTentaclePositions(prevTentaclePositions => ({
      ...prevTentaclePositions,
      [id]: {
        ...prevTentaclePositions[id],
        visible: visible
      }
    }));
  };
  const setShadowVisibility = (id, visible) => {
    setShadowPositions(prevShadowPositions => ({
      ...prevShadowPositions,
      [id]: {
        ...prevShadowPositions[id],
        visible: visible
      }
    }));
  };

  const setShadowHealth = (id, health) => {
    setShadowPositions(prevShadowPositions => ({
      ...prevShadowPositions,
      [id]: {
        ...prevShadowPositions[id],
        health: health
      }
    }));
  };

  const setTentacleHealth = (id, health) => {
    setTentaclePositions(prevTentaclePositions => ({
      ...prevTentaclePositions,
      [id]: {
        ...prevTentaclePositions[id],
        health: health
      }
    }));
  };

  const setPlateStatus = (id, status) => {
    setFlowerPositions(prevPlacasPresion => ({
      ...prevPlacasPresion,
      [id]: {
        ...prevPlacasPresion[id],
        status
      }
    }));
  };

  useEffect(() => {
    if (health <= 0) {
      getAllCheckpoints().then((checkpoint) => {
        for (const [id, position] of Object.entries(checkpoint.fires)) {
          fires[id].setTranslation(new Vector3(position.x, position.y + 3, position.z));
        }
        for (const [id, position] of Object.entries(checkpoint.flowers)) {
          flowers[id].setTranslation(new Vector3(position.x, position.y + 3, position.z));
          // flowerPositions[id].visible = checkpoint.flowers[id].visible;
          setFlowerVisibility(id, checkpoint.flowers[id].visible);
        }
        for (const [id, position] of Object.entries(checkpoint.cajas)) {
          cajas[id].setTranslation(new Vector3(position.x, position.y + 3, position.z));
        }
        for (const [id] of Object.entries(checkpoint.placasPresion)) {
          // placasPresion[id] = checkpoint.placasPresion[id];
          setPlateStatus(id, checkpoint.placasPresion[id]);
          console.log(placasPresion)
        }
        for (const [id, position] of Object.entries(checkpoint.tentacles)) {
          setTentacleVisibility(id, checkpoint.tentacles[id].visible);
          setTentacleHealth(id, checkpoint.tentacles[id].health);
        }
        for (const [id, position] of Object.entries(checkpoint.shadows)) {
          shadows[id].setTranslation(new Vector3(position.x, position.y + 10, position.z));
          setShadowVisibility(id, checkpoint.shadows[id].visible);
          setShadowHealth(id, checkpoint.shadows[id].health);
        }
        setHealth(checkpoint.health);
        setPuntaje(checkpoint.puntaje);
        shadowAvatar.setTranslation(new Vector3(checkpoint.shadowAvatar[0], checkpoint.shadowAvatar[1] + 6, checkpoint.shadowAvatar[2]));
        // console.log(shadowAvatar.translation())
        // shadowAvatar.position.set(checkpoint.shadowAvatar.x, checkpoint.shadowAvatar.y + 6, checkpoint.shadowAvatar.z);
      });
    }

  }, [health]);


  const addTentacle = useCallback((id, ref, visible, health) => {
    setTentacles(prevTentacles => ({
      ...prevTentacles,
      [id]: ref
    }));
    // const { x, y, z } = ref.position
    setTentaclePositions(prevTentaclePositions => ({
      ...prevTentaclePositions,
      [id]: { visible, health }
    }));

  }, []);

  const removeTentacle = useCallback((id, visible) => {
    // setTentacles(prevTentacles => {
    //   const updatedTentacles = { ...prevTentacles };
    //   delete updatedTentacles[id];
    //   return updatedTentacles;
    // });

    setTentaclePositions(prevTentaclePositions => {
      const updatedTentaclePositions = { ...prevTentaclePositions };

      // Verificar si el elemento existe en flowerPositions
      if (updatedTentaclePositions[id]) {
        // Actualizar solo el valor de visible
        updatedTentaclePositions[id]["visible"] = visible;
      }

      return updatedTentaclePositions;
    });
  }, []);

  // const addCaja = useCallback((id, ref) => {
  //   setCajas(prevCajas => ({
  //     ...prevCajas,
  //     [id]: ref
  //   }));
  // }, []);

  const addCaja = useCallback((id, ref) => {
    setCajas(prevCajas => ({
      ...prevCajas,
      [id]: ref
    }));

    // Aquí obtienes la posición del ref y actualizas el diccionario de posiciones
    const { x, y, z } = ref.translation()
    setCajaPositions(prevCajaPositions => ({
      ...prevCajaPositions,
      [id]: { x, y, z }
    }));

  }, []);

  const addFlower = useCallback((id, ref, visible) => {
    setFlowers(prevFlowers => ({
      ...prevFlowers,
      [id]: ref
    }));

    // Aquí obtienes la posición del ref y actualizas el diccionario de posiciones
    const { x, y, z } = ref.translation()
    setFlowerPositions(prevFlowerPositions => ({
      ...prevFlowerPositions,
      [id]: { x, y, z, visible }
    }));
  }, []);

  const removeFlower = useCallback((id, visible) => {
    // setFlowers(prevFlowers => {
    //   const updatedFlowers = { ...prevFlowers };
    //   delete updatedFlowers[id];
    //   return updatedFlowers;
    // });

    setFlowerPositions(prevFlowerPositions => {
      const updatedFlowerPositions = { ...prevFlowerPositions };

      // Verificar si el elemento existe en flowerPositions
      if (updatedFlowerPositions[id]) {
        // Actualizar solo el valor de visible
        updatedFlowerPositions[id]["visible"] = visible;
      }

      return updatedFlowerPositions;
    });
  }, []);

  const addFire = useCallback((id, ref) => {
    setFires(prevFires => ({
      ...prevFires,
      [id]: ref
    }));

    const { x, y, z } = ref.translation()
    setFirePositions(prevFirePositions => ({
      ...prevFirePositions,
      [id]: { x, y, z }
    }));
  }, []);

  const removeFire = useCallback((id) => {
    setFires(prevFires => {
      const updatedFires = { ...prevFires };
      delete updatedFires[id];
      return updatedFires;
    });
  }, []);


  const addShadow = useCallback((id, ref, visible, health) => {
    setShadows(prevShadows => ({
      ...prevShadows,
      [id]: ref
    }));

    const { x, y, z } = ref.translation()
    setShadowPositions(prevShadowPositions => ({
      ...prevShadowPositions,
      [id]: { x, y, z, visible, health }
    }));
  }, []);

  const removeShadow = useCallback((id, visible) => {
    // setShadows(prevShadows => {
    //   const updatedShadows = { ...prevShadows };
    //   delete updatedShadows[id];
    //   return updatedShadows;
    // });
    setShadowPositions(prevShadowPositions => {
      const updatedShadowPositions = { ...prevShadowPositions };

      // Verificar si el elemento existe en flowerPositions
      if (updatedShadowPositions[id]) {
        // Actualizar solo el valor de visible
        updatedShadowPositions[id]["visible"] = visible;
      }

      return updatedShadowPositions;
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
    // if(cajaPositions){
    //   console.log(cajaPositions)
    // }
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
        shadowPositions,
        setShadowPositions,
        addFire,
        removeFire,
        fires,
        setFires,
        firePositions,
        setFirePositions,
        addFlower,
        removeFlower,
        setFlowers,
        flowers,
        flowerPositions,
        setFlowerPositions,
        addCaja,
        cajas,
        setCajas,
        cajaPositions,
        setCajaPositions,
        removeTentacle,
        addTentacle,
        tentacles,
        tentaclePositions,
        setTentaclePositions,
        setTentacles,
        Avatar,
        setAvatar,
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