
import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useMemo, useRef, useState } from "react"
import { Euler, Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";


const grupoEspada = 1
const grupoEnemigo = 2
const grupoAmigos = 3
const grupoEntorno = 5 //

export default function Model(props) {
  
  const avatarReference = props.avatarReference;
  const boarBodyRef = useRef();
  const boarModelRef = useRef();

    
  const { scene, materials, animations} = useGLTF("/assets/models/Boar/Boar.glb");  
  const {actions} = useAnimations(animations, boarModelRef);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const speed = 6
  const squareSide =10

  const distanceTraveled = useRef(0); // Distancia acumulada
  const currentDirection = useRef(new Vector3(1, 0, 0)); // Dirección inicial

  const [isWalking, setIsWalking] = useState(false); // Estado de la animación
  const [isCharging, setIsCharging] = useState(false); // Estado de la animación de carga
  const [chargeDistance, setChargeDistance] = useState(5); // Distancia de carga

  const directions = [
    new Vector3(1, 0, 0), // Derecha
    new Vector3(0, 0, -1), // Abajo
    new Vector3(-1, 0, 0), // Izquierda
    new Vector3(0, 0, 1), // Arriba
  ];

  let currentDirectionIndex = 0; // Índice para cambiar de dirección

  useFrame((_, delta) => {

    const currentPosition = boarBodyRef.current?.translation(); // Posición actual
    const avatarPosition = avatarReference.current?.translation(); // Posición del avatar
    const currentPositionVector = new Vector3(currentPosition.x,
      currentPosition.y, currentPosition.z);

    //console.log("X position: ", avatarPosition.x + "Z position: " + avatarPosition.z);

    if (avatarPosition) {
      const distanceToAvatar = currentPositionVector.distanceTo(avatarPosition);
      // console.log(chargeDistance)

      if (distanceToAvatar <= chargeDistance) {
        setIsCharging(true);
      } else {
        setIsCharging(false);
      }

      if ((avatarPosition.z >= -24  && avatarPosition.z <= -48) || avatarPosition.x >= 14) {
        setChargeDistance(0);
      }

      if ((avatarPosition.z <= -24 && avatarPosition.z >= -48) || avatarPosition.x <=14) {
        setChargeDistance(5);
      }
      // console.log("Is charging: ", isCharging);

      // if (isWalking) {
      //   // Calcular movimiento y nueva posición
      //   const movement = delta * speed; // Distancia por frame

      //   const newTranslation = new Vector3(
      //     currentPosition.x + currentDirection.current.x * movement,
      //     currentPosition.y,
      //     currentPosition.z + currentDirection.current.z * movement
      //   );

      //   distanceTraveled.current += movement; // Acumula la distancia recorrida

      //   // Cambiar de dirección cuando se alcanza el límite del cuadrado
      //   if (distanceTraveled.current >= squareSide) {
      //     distanceTraveled.current = 0; // Reiniciar la distancia
      //     currentDirectionIndex = (currentDirectionIndex + 1) % 4; // Cambiar a la siguiente dirección
      //     currentDirection.current = directions[currentDirectionIndex]; // Ajustar la dirección

      //     // Crear un cuaternión para la nueva rotación
      //     const angleMap = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // Angles para cada dirección
      //     const quaternion = new Quaternion().setFromEuler(new Euler(0, angleMap[currentDirectionIndex], 0));

      //     // Aplicar la rotación al RigidBody y al modelo para mantener la coherencia
      //     //rigidBody.setRotation(quaternion, true);
      //     boarModelRef.current.setRotationFromQuaternion(quaternion);
      //   }

      //   // Mover el RigidBody a la nueva posición
      //   boarBodyRef.current.setTranslation(newTranslation, true);
      // }

      if (isCharging) {
        setIsWalking(false);
        // Calcular la dirección hacia la que debe mirar la sombra
        const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

        // Calcular la rotación necesaria en radianes
        const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);

        // Aplicar la rotación al cuerpo rígido
        // boarBodyRef.current.rotation.y = targetRotationY;
        boarModelRef.current.rotation.y = targetRotationY;

        const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
        const chaseDistanceDelta = chaseDirection.multiplyScalar(speed * delta);
        const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);
        boarBodyRef.current?.setTranslation(chasePosition, true);
      }
    }
  });

  useEffect(() => {
    if (isWalking) {
      console.log("Walking")
      actions.BoarWalking.play();
    } else {
      actions.BoarWalking.stop();
    }

    if (isCharging) {
      actions.BoarCharge.play();
      console.log("Charging")
    } else {
      actions.BoarCharge.stop();
      console.log("Not charging")
      setIsWalking(true);
    }
  }, [actions]);

    return (

        <RigidBody ref={boarBodyRef}  type="dynamic" 
        colliders="cuboid" enabledRotations={[false, false, false]}
         position={props.position} rotation={[0,3,0]}>
            {/* <CuboidCollider  args={[0.5, 0.5, 0.5]} position={props.position} /> */}
            <group ref={boarModelRef}>
              <group name="scene">
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
            </group>
        </RigidBody>
    )
}