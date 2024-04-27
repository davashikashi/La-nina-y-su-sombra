import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";


export default function Fire(props) {
    const fireModelRef = useRef();
    const fireBodyRef = useRef()
    const { scene, materials, animations } = useGLTF("/assets/models/fire/fire.glb");

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { actions } = useAnimations(animations, fireModelRef);
    const { nodes } = useGraph(clone);

    const [traveledDistance, setTraveledDistance] = useState(0);
    const [direction, setDirection] = useState(1); // 1: adelante, -1: atrás.



    const speed = 1
    const distance = 4
    const position  = [0,0,0]
    const directionVector = [1, 0, 0]

    // useFrame((_, delta) => {
    //     if (fireBodyRef.current) {
    //         const step = speed * delta * direction; // Distancia que se mueve
    //         const movement = new Vector3(step, 0, 0); // Movimiento en el eje X (cambiar según el eje deseado)

    //         // Ajustar la velocidad del cuerpo rígido dinámico
    //         const currentPosition = fireBodyRef.current.translation(); // Obtener la posición actual

    //         // Nueva posición calculada manualmente
    //         const newPosition = new Vector3(
    //             currentPosition.x + movement.x,
    //             currentPosition.y + movement.y,
    //             currentPosition.z + movement.z
    //         );

    //         fireBodyRef.current.setTranslation(newPosition, true); // Ajustar directamente la posición

    //         // Acumular la distancia recorrida
    //         setTraveledDistance((prev) => prev + Math.abs(step));

    //         // Cambiar dirección si se alcanza la distancia límite
    //         if (traveledDistance >= distance) {
    //             setDirection(-direction); // Invertir la dirección
    //             setTraveledDistance(0); // Reiniciar la distancia acumulada
    //         }

    //         // Ajustar la rotación para mirar hacia la dirección del movimiento
    //         const angle = direction === 1 ? Math.PI/2 : -Math.PI/2; // 0 para adelante, PI para atrás
    //         const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angle);
    //         fireModelRef.current.setRotationFromQuaternion(quaternion); // Rotar el modelo
    //     }
    // });


    useFrame((_, delta) => {
        if (fireBodyRef.current) {
          const step = speed * delta * direction; // Cantidad de movimiento
          const movement = new Vector3(...directionVector).multiplyScalar(step); // Movimiento en función del vector y la dirección
        
          const currentPosition = fireBodyRef.current.translation(); // Obtener la posición actual
          const newPosition = new Vector3(
            currentPosition.x + movement.x,
            currentPosition.y + movement.y,
            currentPosition.z + movement.z
          );
        
          fireBodyRef.current.setTranslation(newPosition, true); // Mover el cuerpo rígido
        
          // Acumular la distancia recorrida
          setTraveledDistance((prev) => prev + Math.abs(step));
        
          // Cambiar dirección si se alcanza la distancia límite
          if (traveledDistance >= distance) {
            setDirection(-direction); // Invertir la dirección
            setTraveledDistance(0); // Reiniciar la distancia
          }
    
          // Ajustar la rotación para mirar hacia la dirección del movimiento
        //   const normalizedDirection = new Vector3(...directionVector).normalize();
        //   const angle = Math.atan2(normalizedDirection.z, normalizedDirection.x); // Calcular el ángulo según el vector
        //   const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angle * direction); // Rotar el modelo
        //   fireModelRef.current.setRotationFromQuaternion(quaternion);
        }
      });
    


    useEffect(() => {
        if (actions["walking"]) {
            actions["walking"].play(); // Inicia la animación al montar
        }

        return () => {
            if (actions["walking"]) {
                actions["walking"].stop(); // Detiene la animación al desmontar
            }
        };
    }, [actions])

    return (
        <RigidBody ref={fireBodyRef} type="dynamic" position={props.position} colliders={"cuboid"}>
            {/* <CuboidCollider  args={[0.3, 0.3, 0.5]} /> */}
            <group ref={fireModelRef} name="Scene">
                <group name="Armature" scale={0.614}>
                    <skinnedMesh
                        name="Fire"
                        geometry={nodes.Fire.geometry}
                        material={materials["Material.002"]}
                        skeleton={nodes.Fire.skeleton}
                    />
                    <primitive object={nodes.Bone} />
                </group>
            </group>
        </RigidBody>
    );
}
