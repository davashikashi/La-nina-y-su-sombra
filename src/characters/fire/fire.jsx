import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { useGameContext } from '../../context/GameContext';


export default function Fire(props) {
    const fireModelRef = useRef();
    const fireBodyRef = useRef()
    const fireSensorRef = useRef() 
    const {addFire, removeFire} = useGameContext()

    const { girlAvatar } = useGameContext();
    const {shadowAvatar} = useGameContext();    

    const { scene, materials, animations } = useGLTF("/assets/models/fire/Fire.glb");

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { actions } = useAnimations(animations, fireModelRef);
    const { nodes } = useGraph(clone);

    const [traveledDistance, setTraveledDistance] = useState(0);
    const [direction, setDirection] = useState(1); // 1: adelante, -1: atrás.

    const sideToSide = props.sideToSide || false;

    const bone = nodes.Bone

    const speed = 1
    const distance = 4
    const position  = [0,0,0]
    const directionVector = [1, 0, 0]

    // Para el movimiento de persecucion
    const chaseDistance = 5; //Distancia de persecución
    const chaseSpeed = 4.5; //Velocidad de persecución

    const [isChasing, setIsChasing] = useState(false); //Estado de persecución

    useEffect(() => {
        addFire(props.id, fireBodyRef.current)
    }, [fireBodyRef?.current, addFire, props.id])

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

        // if (fireBodyRef.current) {
        //     const avatarPosition = avatarReference.current?.translation(); 
        //     const currentPosition = fireBodyRef.current.translation(); // Obtener la posición actual            
        //     const currentPositionVector = new Vector3(currentPosition.x,
        //          currentPosition.y, currentPosition.z);
        //     // console.log("posicion fuego: ", currentPositionVector)
        //     // console.log("posicion avatar: ", avatarPosition)
        //     // console.log("isChasing: ", isChasing)

        //     if (avatarPosition) {
        //         const distanceToAvatar = currentPositionVector.distanceTo(avatarPosition);

        //         if (distanceToAvatar <= chaseDistance) {
        //             setIsChasing(true);
        //         } else {
        //             setIsChasing(false);
        //         }

        //         if (isChasing) {
        //             const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
        //             const chaseDistanceDelta = chaseDirection.multiplyScalar(chaseSpeed * delta);
        //             const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);

        //             fireBodyRef.current.setTranslation(chasePosition, true);
        //         }
        //     }

        //     if (isChasing===false && sideToSide) {
        //         const step = speed * delta * direction; // Cantidad de movimiento
        //         const movement = new Vector3(...directionVector).multiplyScalar(step); // Movimiento en función del vector y la dirección
                            
        //         const newPosition = new Vector3(
        //             currentPosition.x + movement.x,
        //             currentPosition.y + movement.y,
        //             currentPosition.z + movement.z
        //         );
        
        //         fireBodyRef.current.setTranslation(newPosition, true); // Mover el cuerpo rígido
        
        //         // Acumular la distancia recorrida
        //         setTraveledDistance((prev) => prev + Math.abs(step));
        
        //         // Cambiar dirección si se alcanza la distancia límite
        //         if (traveledDistance >= distance) {
        //             setDirection(-direction); // Invertir la dirección
        //             setTraveledDistance(0); // Reiniciar la distancia
        //         }

        //     }

        //         // Si tenemos la posición del avatar y estamos persiguiendo
        //     if (avatarPosition && isChasing) {
        //         // Calcular la dirección hacia la que debe mirar la sombra
        //         const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

        //         // Calcular la rotación necesaria en radianes
        //         const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);

        //         // Aplicar la rotación al cuerpo rígido
        //         fireBodyRef.current.rotation.y = targetRotationY;
        //         fireModelRef.current.rotation.y = targetRotationY;
        //     }
    
        //   // Ajustar la rotación para mirar hacia la dirección del movimiento
        // //   const normalizedDirection = new Vector3(...directionVector).normalize();
        // //   const angle = Math.atan2(normalizedDirection.z, normalizedDirection.x); // Calcular el ángulo según el vector
        // //   const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angle * direction); // Rotar el modelo
        // //   fireModelRef.current.setRotationFromQuaternion(quaternion);
        // }

    if (shadowAvatar && fireBodyRef.current){

        if (!isChasing && sideToSide){
            const currentPosition = fireBodyRef.current.translation(); // Obtener la posición actual
            const currentPositionVector = new Vector3(currentPosition.x,
                currentPosition.y, currentPosition.z);
                
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

        if (isChasing){
            const currentPosition = fireBodyRef.current.translation(); // Obtener la posición actual
            const currentPositionVector = new Vector3(currentPosition.x,
                currentPosition.y, currentPosition.z);
            let avatarPosition  // Obtener la posición del avatar

            if (girlAvatar){
                avatarPosition = girlAvatar.translation();
            }else if (shadowAvatar){
                avatarPosition = shadowAvatar.translation();
            }

            const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
            const chaseDistanceDelta = chaseDirection.multiplyScalar(chaseSpeed * delta);
            const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);

            fireBodyRef.current.setTranslation(chasePosition, true);

            // Calcular la dirección hacia la que debe mirar la sombra
            const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

            // Calcular la rotación necesaria en radianes
            const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);
            const targetQuaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), targetRotationY);

            // Aplicar la rotación al cuerpo rígido
            fireBodyRef.current.setRotation(targetQuaternion);

        }
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

    const handleIntersection = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            setIsChasing(true);
        }
      }
    
      const handleIntersectionExit = (event) => { 
        if (event.colliderObject.name === "character-capsule-collider") {
            setIsChasing(false);
        }
      }

    return (
        <RigidBody name="Fuego" ref={fireBodyRef} type="dynamic" position={props.position} colliders={"cuboid"}
         enabledRotations={[false, true, false]}>
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
                    <CuboidCollider onIntersectionEnter={handleIntersection}
                     onIntersectionExit={handleIntersectionExit}
                    args={[3, 2, 4]} sensor={true} position={[0, 1, 3]}
                    name="fireSensor" ref={fireSensorRef}/>
                </group>
            </group>
        </RigidBody>
    );
}
