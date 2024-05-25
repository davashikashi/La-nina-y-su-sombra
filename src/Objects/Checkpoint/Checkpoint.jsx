import { useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3, Euler } from "three";
import { useGameContext } from "../../context/GameContext";
import { db } from "../../firebase/firebase.config";
import { createCheckpoint } from "../../db/checkpoints-collections";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { set } from "firebase/database";




export default function Checkpoint(props) {
  const { nodes, materials } = useGLTF('/assets/models/Checkpoint/Book.glb')
  const BookModelRef = useRef();
  const BookBodyRef = useRef();
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(0);
  const { puntaje, health, shadowAvatar, girlAvatar, palancas,
    placasPresion, cajaPositions, flowerPositions, firePositions, shadowPositions, docID, setDocID,
    setShadows, setFires, setFlowers, setTentacles, setGirlAvatar, 
    setShadowAvatar, setHealth, setPuntaje, setCajas, setPalancas, 
    setPlacasPresion, tentaclePositions, setTentaclePositions,
   } = useGameContext();

  const floatScale = 0.5; // Escala para ajustar el movimiento del modelo
  const floatAmplitude = .5 * floatScale; // Amplitud del movimiento de flotación
  const floatSpeed = 1; // Velocidad del movimiento de flotación
  const rotationSpeed = 1; // Velocidad de rotación

  const shadowAvatarPosition = [shadowAvatar?.translation().x, shadowAvatar?.translation().y, shadowAvatar?.translation().z]

  let checkpointID = null;

  const addCheckpointToFirestore = async () => {
        try {
          checkpointID = await createCheckpoint({
            position: props.position,
            puntaje: puntaje,
            health: health,
            shadowAvatar: shadowAvatarPosition,
            palancas: palancas,
            placasPresion: placasPresion,
            cajas: cajaPositions,
            flowers: flowerPositions,
            fires: firePositions,
            shadows: shadowPositions,
            tentacles: tentaclePositions
        });
        console.log('Checkpoint agregado a Firestore correctamente. ID: ', checkpointID);
        } catch (error) {
        console.error('Error al agregar el checkpoint a Firestore:', error);
        }
  };

//   const deleteCheckpoint = async (checkpointId) => {
//     try {
//         await deleteDoc(doc(db, 'checkpoints', checkpointId));
//         console.log('Documento eliminado correctamente:', checkpointId);
//     } catch (error) {
//         console.error('Error al eliminar el documento:', error);
//         throw error;
//     }
// };

// const deleteCheckpointFromFirestore = async (checkpointId) => {
//     try{
//         await deleteCheckpoint(checkpointId);
//         console.log('Checkpoint eliminado correctamente');
//     } catch (error) {
//         console.error('Error al eliminar el checkpoint:', error);
//     }
// }

const deleteAllCheckpoints = async () => {
    try {
        // Obtener la referencia de la colección "checkpoints"
        const checkpointsRef = collection(db, 'checkpoints');
        
        // Obtener todos los documentos de la colección
        const querySnapshot = await getDocs(checkpointsRef);
        
        // Iterar sobre cada documento y borrarlo
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        console.log('Todos los documentos de la colección "checkpoints" han sido borrados correctamente');
    } catch (error) {
        console.error('Error al borrar los documentos de la colección "checkpoints":', error);
    }
};

//   useEffect(() => {
//     if (BookModelRef.current && BookBodyRef.current) {
//         console.log(BookModelRef)
//         console.log('entre al useEffect')
//     }
// }, [BookBodyRef?.current, cajaPositions]);

  useFrame((state, delta) => {
    // Incrementamos el tiempo utilizando el delta de tiempo para obtener un movimiento uniforme
    setTime(prevTime => prevTime + delta);

    if (BookModelRef.current && BookBodyRef.current) {
      // Calcular el desplazamiento vertical para la flotación en seno
      const verticalOffset = floatAmplitude * Math.sin(floatSpeed * time);

      // Calcular la rotación sobre el eje Y utilizando el tiempo delta
      const rotationAngle = rotationSpeed * delta;

      // Crear vectores de posición y rotación para el cuerpo rígido
      const newPosition = new Vector3(props.position[0], props.position[1] + verticalOffset, props.position[2]);
      const newRotation = new Euler(0, rotationAngle, 0, 'XYZ');

      // Actualizar la posición y rotación del rigidBody cinemático
      BookBodyRef.current.setNextKinematicTranslation(newPosition);
      BookBodyRef.current.setNextKinematicRotation(newRotation);

      // Rotar el modelo sobre su propio eje
      BookModelRef.current.rotation.y += rotationAngle;
    }
  });

  const handleIntersection = (event) => {
    if (event.colliderObject.name.toString() === 'character-capsule-collider') {

        // if (checkpointID) {
        //     // El checkpointId existe, por lo tanto, podemos intentar borrar el checkpoint
        //     deleteCheckpointFromFirestore(checkpointID);
        //     console.log('Checkpoint eliminado correctamente');
        // } else {
        //     console.log('El checkpointId no existe');
        // }
        deleteAllCheckpoints();
        setTimeout(() => {
            addCheckpointToFirestore();// Detener el soplido después de 1 segundo
            // setDocID(checkpointID);
          }, 3000);
        setVisible(false); // Ocultar el objeto
    }

  };
  

  useEffect(() => {
    if(puntaje){
        console.log('se ejecuta');
    }
}, [puntaje]);

  return (
    <RigidBody
      ref={BookBodyRef}
      type="kinematicPosition"
      sensor={true}
      gravityScale={0}
      colliders={false}
      onIntersectionEnter={handleIntersection}
      position={props.position}
    >
        {visible &&(
            <>
                <CuboidCollider args={[0.5, 0.2, 0.5]} position={[0, 0.2, 0]}/>
                <group ref={BookModelRef} scale={[.5, .5, .5]}>
                    <mesh geometry={nodes.Book.geometry} material={materials.BookMaterial} />
                </group>
            </>
        )}
    </RigidBody>
  )
}
