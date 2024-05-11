import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";


export default function Fire(props) {
    const fireModelRef = useRef();
    const fireBodyRef = useRef()
    const avatarReference = props.avatarReference;

    const { scene, materials, animations } = useGLTF("/assets/models/fire/Fire.glb");

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { actions } = useAnimations(animations, fireModelRef);
    const { nodes } = useGraph(clone);

    const [traveledDistance, setTraveledDistance] = useState(0);
    const [direction, setDirection] = useState(1); // 1: adelante, -1: atrás.

    const sideToSide = props.sideToSide || false;

    const speed = 1
    const distance = 4
    const position  = [0,0,0]
    const directionVector = [1, 0, 0]

    // Para el movimiento de persecucion
    const chaseDistance = 5; //Distancia de persecución
    const chaseSpeed = 4.5; //Velocidad de persecución

    const [isChasing, setIsChasing] = useState(false); //Estado de persecución

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
            const avatarPosition = avatarReference.current?.translation(); 
            const currentPosition = fireBodyRef.current.translation(); // Obtener la posición actual            
            const currentPositionVector = new Vector3(currentPosition.x,
                 currentPosition.y, currentPosition.z);
            // console.log("posicion fuego: ", currentPositionVector)
            // console.log("posicion avatar: ", avatarPosition)
            // console.log("isChasing: ", isChasing)

            if (avatarPosition) {
                const distanceToAvatar = currentPositionVector.distanceTo(avatarPosition);

                if (distanceToAvatar <= chaseDistance) {
                    setIsChasing(true);
                } else {
                    setIsChasing(false);
                }

                if (isChasing) {
                    const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
                    const chaseDistanceDelta = chaseDirection.multiplyScalar(chaseSpeed * delta);
                    const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);

                    fireBodyRef.current.setTranslation(chasePosition, true);
                }
            }

            if (isChasing===false && sideToSide) {
                const step = speed * delta * direction; // Cantidad de movimiento
                const movement = new Vector3(...directionVector).multiplyScalar(step); // Movimiento en función del vector y la dirección
                            
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

            }

                // Si tenemos la posición del avatar y estamos persiguiendo
            if (avatarPosition && isChasing) {
                // Calcular la dirección hacia la que debe mirar la sombra
                const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

                // Calcular la rotación necesaria en radianes
                const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);

                // Aplicar la rotación al cuerpo rígido
                fireBodyRef.current.rotation.y = targetRotationY;
                fireModelRef.current.rotation.y = targetRotationY;
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
        <RigidBody ref={fireBodyRef} type="dynamic" position={props.position} colliders={"cuboid"} enabledRotations={[false, false, false]}>
            {/* <CuboidCollider  args={[0.3, 0.3, 0.5]} /> */}
            <group ref={fireModelRef} name="Scene">
                <group name="Fuego" scale={0.614}>
                    <skinnedMesh
                        name="Fuego"
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
