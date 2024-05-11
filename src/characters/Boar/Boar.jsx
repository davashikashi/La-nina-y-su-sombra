
import { useGLTF, useTexture } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useMemo, useRef, useState } from "react"
import { Euler, Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export default function Boar(props) {

    
  const { scene, materials} = useGLTF("/assets/models/Boar/Boar.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
    const speed = 2
    const squareSide =10

  const boarBodyRef = useRef();
  const boarModelRef = useRef();
  const distanceTraveled = useRef(0); // Distancia acumulada
  const currentDirection = useRef(new Vector3(1, 0, 0)); // Dirección inicial

  const directions = [
    new Vector3(1, 0, 0), // Derecha
    new Vector3(0, 0, -1), // Abajo
    new Vector3(-1, 0, 0), // Izquierda
    new Vector3(0, 0, 1), // Arriba
  ];

  let currentDirectionIndex = 0; // Índice para cambiar de dirección

  useFrame((_, delta) => {
    const rigidBody = boarBodyRef.current;

    if (rigidBody) {
      // Calcular movimiento y nueva posición
      const movement = delta * speed; // Distancia por frame
      const translation = rigidBody.translation(); // Posición actual

      const newTranslation = new Vector3(
        translation.x + currentDirection.current.x * movement,
        translation.y,
        translation.z + currentDirection.current.z * movement
      );

      distanceTraveled.current += movement; // Acumula la distancia recorrida

      // Cambiar de dirección cuando se alcanza el límite del cuadrado
      if (distanceTraveled.current >= squareSide) {
        distanceTraveled.current = 0; // Reiniciar la distancia
        currentDirectionIndex = (currentDirectionIndex + 1) % 4; // Cambiar a la siguiente dirección
        currentDirection.current = directions[currentDirectionIndex]; // Ajustar la dirección

        // Crear un cuaternión para la nueva rotación
        const angleMap = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // Angles para cada dirección
        const quaternion = new Quaternion().setFromEuler(new Euler(0, angleMap[currentDirectionIndex], 0));

        // Aplicar la rotación al RigidBody y al modelo para mantener la coherencia
        //rigidBody.setRotation(quaternion, true);
        boarModelRef.current.setRotationFromQuaternion(quaternion);
      }

      // Mover el RigidBody a la nueva posición
      rigidBody.setTranslation(newTranslation, true);
    }
  });

    return (

        <RigidBody ref={boarBodyRef}  type="dynamic" colliders={false} >
            <CuboidCollider  args={[0.7, 0.5, 0.5]} position={props.position} />
            <group ref={boarModelRef}  position={props.position} >
                <group name="BoarArmature">
                    <skinnedMesh
                        name="Boar"
                        geometry={nodes.Boar.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Boar.skeleton}
                    />
                    <primitive object={nodes.Back} />
                    <primitive object={nodes.Buttock} />
                    <primitive object={nodes.BackRightForeLeg} />
                    <primitive object={nodes.FrontRightForeLeg} />
                    <primitive object={nodes.BackLeftForeLeg} />
                    <primitive object={nodes.FrontLeftForeLeg} />
                </group>
            </group>
        </RigidBody>



    )
}


