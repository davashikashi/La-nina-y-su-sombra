import { useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3, Euler } from "three";
import { useGameContext } from "../../context/GameContext";

export default function Flower(props) {
  const { nodes, materials } = useGLTF("/assets/models/Flower/Flower.glb");
  const flowerModelRef = useRef();
  const flowerBodyRef = useRef();
  const { puntaje, setPuntaje } = useGameContext();
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(0);

  const floatScale = 0.5; // Escala para ajustar el movimiento del modelo
  const floatAmplitude = 1 * floatScale; // Amplitud del movimiento de flotación
  const floatSpeed = 1; // Velocidad del movimiento de flotación
  const rotationSpeed = 1; // Velocidad de rotación
   // Ajusta según sea necesario


  useFrame((state, delta) => {
    // Incrementamos el tiempo utilizando el delta de tiempo para obtener un movimiento uniforme
    setTime(prevTime => prevTime + delta);

    if (flowerModelRef.current && flowerBodyRef.current) {
      // Calcular el desplazamiento vertical para la flotación en seno
      const verticalOffset = floatAmplitude * Math.sin(floatSpeed * time);

      // Calcular la rotación sobre el eje Y utilizando el tiempo delta
      const rotationAngle = rotationSpeed * delta;

      // Crear vectores de posición y rotación para el cuerpo rígido
      const newPosition = new Vector3(props.position[0], props.position[1] + verticalOffset, props.position[2]);
      const newRotation = new Euler(0, rotationAngle, 0, 'XYZ');

      // Actualizar la posición y rotación del rigidBody cinemático
      flowerBodyRef.current.setNextKinematicTranslation(newPosition);
      flowerBodyRef.current.setNextKinematicRotation(newRotation);

      // Rotar el modelo sobre su propio eje
      flowerModelRef.current.rotation.y += rotationAngle;
    }
  });





  const handleIntersection = (event) => {
    if (event.colliderObject.name.toString() === 'character-capsule-collider') {
      console.log("si choca");
      setPuntaje(prevPuntaje => prevPuntaje + 1);
      setVisible(false); // Ocultar el objeto
    }
  };

  useEffect(() => {
    console.log("puntaje: ", puntaje);
  }, [puntaje]);

  return (
    <RigidBody
      ref={flowerBodyRef}
      type="kinematicPosition"
      sensor={true}
      gravityScale={0}
      colliders={false}
      onIntersectionEnter={handleIntersection}
      position={props.position}
    >
      {visible && (
        <>
          <CuboidCollider args={[0.1, 0.3, 0.1]} />
          <group ref={flowerModelRef} scale={[4, 4, 4]} >
            <mesh

              castShadow
              receiveShadow
              geometry={nodes.Plane001.geometry}
              material={materials.Petals}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane001_1.geometry}
              material={materials.Heart}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane001_2.geometry}
              material={materials.Stick}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane001_3.geometry}
              material={materials.Leaf}
            />

          </group>
        </>
      )}
    </RigidBody>
  );
}


