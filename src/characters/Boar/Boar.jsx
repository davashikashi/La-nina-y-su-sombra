
import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useMemo, useRef, useState } from "react"
import { Euler, Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { useGameContext } from "../../context/GameContext";
import { set } from "firebase/database";


const grupoEspada = 1
const grupoEnemigo = 2
const grupoAmigos = 3
const grupoEntorno = 5 //

export default function Model(props) {

  const boarBodyRef = useRef();
  const boarModelRef = useRef();
  const boarSensorRef = useRef() 

    
  const { scene, materials, animations} = useGLTF("/assets/models/Boar/Boar.glb");  
  const {actions} = useAnimations(animations, boarModelRef);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const chargeSpeed = 6

  const [isWalking, setIsWalking] = useState(false); // Estado de la animación
  const [isCharging, setIsCharging] = useState(false); // Estado de la animación de carga
  const [charge, setCharge] = useState(false); // Estado de la carga

  const directions = [
    new Vector3(1, 0, 0), // Derecha
    new Vector3(0, 0, -1), // Abajo
    new Vector3(-1, 0, 0), // Izquierda
    new Vector3(0, 0, 1), // Arriba
  ];

  const { girlAvatar } = useGameContext();
  const { shadowAvatar } = useGameContext();

  const boarRotation= props.rotation || [0, 0, 0]

  useFrame((_, delta) => {

    // const currentPosition = boarBodyRef.current?.translation(); // Posición actual
    // const avatarPosition = avatarReference.current?.translation(); // Posición del avatar
    // const currentPositionVector = new Vector3(currentPosition.x,
    //   currentPosition.y, currentPosition.z);

    // //console.log("X position: ", avatarPosition.x + "Z position: " + avatarPosition.z);

    // if (avatarPosition) {
    //   const distanceToAvatar = currentPositionVector.distanceTo(avatarPosition);
    //   // console.log(chargeDistance)

    //   if (distanceToAvatar <= chargeDistance) {
    //     setIsCharging(true);
    //   } else {
    //     setIsCharging(false);
    //   }

    //   if ((avatarPosition.z >= -24  && avatarPosition.z <= -48) || avatarPosition.x >= 14) {
    //     setChargeDistance(0);
    //   }

    //   if ((avatarPosition.z <= -24 && avatarPosition.z >= -48) || avatarPosition.x <=14) {
    //     setChargeDistance(5);
    //   }

    //   if (isCharging) {
    //     setIsWalking(false);
    //     // Calcular la dirección hacia la que debe mirar la sombra
    //     const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

    //     // Calcular la rotación necesaria en radianes
    //     const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);

    //     // Aplicar la rotación al cuerpo rígido
    //     // boarBodyRef.current.rotation.y = targetRotationY;
    //     boarModelRef.current.rotation.y = targetRotationY;

    //     const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
    //     const chaseDistanceDelta = chaseDirection.multiplyScalar(speed * delta);
    //     const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);
    //     boarBodyRef.current?.setTranslation(chasePosition, true);
    //   }
    // }

    if (shadowAvatar || girlAvatar) {
      if (boarBodyRef.current){
        if (isCharging){
          const currentPosition = boarBodyRef.current.translation(); // Obtener la posición actual
            const currentPositionVector = new Vector3(currentPosition.x,
                currentPosition.y, currentPosition.z);
            let avatarPosition  // Obtener la posición del avatar

            avatarPosition = girlAvatar.translation();

            if (charge){
              const chargeDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
              const chargeDistanceDelta = chargeDirection.multiplyScalar(chargeSpeed * delta);
              const chargePosition = new Vector3().addVectors(currentPosition, chargeDistanceDelta);

              boarBodyRef.current.setTranslation(chargePosition, true);
            }

            // Calcular la dirección hacia la que debe mirar la sombra
            const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

            // Calcular la rotación necesaria en radianes
            const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);
            const targetQuaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), targetRotationY);

            // Aplicar la rotación al cuerpo rígido
            boarBodyRef.current.setRotation(targetQuaternion);
            // boarModelRef.current.setRotation(targetQuaternion);
        }
      }
    }
  });

  useEffect(() => {

    if (isCharging) {
      actions.BoarCharge.play();
      console.log("Charging")
      setTimeout(() => {
        actions.BoarCharge.stop(); // Detener el soplido después de 1 segundo
        actions.BoarWalking.play();
        setCharge(true);
      }, 2000);
    } else {
      actions.BoarCharge.stop();
      console.log("Not charging")
      setIsWalking(true);
    }
  }, [actions, isCharging, isWalking] );

  const handleIntersection = (event) => {
    if (event.colliderObject.name === "character-capsule-collider") {
        setIsCharging(true);
        // setIsWalking(true);
        console.log(isWalking)
    } else {
      setIsWalking(false);
    }
  }

  const handleIntersectionExit = (event) => { 
    if (event.colliderObject.name === "character-capsule-collider") {
        setIsCharging(false);
        setIsWalking(false);
        setCharge(false);
        console.log(isWalking)
    }
  }

    return (

        <RigidBody ref={boarBodyRef}  type="dynamic" 
        colliders="cuboid" enabledRotations={[false, false, false]}
         position={props.position} rotation={boarRotation}>
            {/* <CuboidCollider  args={[0.5, 0.5, 0.5]} position={props.position} /> */}
            <group ref={boarModelRef}>
                <group name="BoarArmature" rotation={[0, 3, 0]}>
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
                    <CuboidCollider onIntersectionEnter={handleIntersection}
                     onIntersectionExit={handleIntersectionExit}
                    args={[5, 1.5, 7 ]} sensor={true} position={[0, 1, -3.5]}
                    name="boarSensor" ref={boarSensorRef}/>
                </group>
              </group>
        </RigidBody>
    )
}