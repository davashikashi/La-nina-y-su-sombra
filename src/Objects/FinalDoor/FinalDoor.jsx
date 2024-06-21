import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useNavigate} from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import { CuboidCollider } from '@react-three/rapier';

export default function FinalDoor(props) {
  const { nodes, materials } = useGLTF('/assets/models/FinalDoor/finalDoor.glb')
  // const avatarReference = props.avatarReference;
  const navigate = useNavigate(); // Obtiene el objeto history para redireccionar
  const { girlAvatar } = useGameContext();
  const {shadowAvatar} = useGameContext();
  const [wentThrough, setWentThrough] = useState(false);
  const link = props.link || "/"
  const doorScale = props.scale || [1, 1, 1];
  const doorRotation = props.rotation || [0, 0, 0]; 
  useFrame(() => {
    // if (avatarReference.current) {
    //   const avatarPosition = avatarReference.current.translation();
    // //   console.log("X position: ", avatarPosition.x, "Z position: ", avatarPosition.z);

    //   if (avatarPosition.x > -1 && avatarPosition.x < 1 && avatarPosition.z <= -99){
    //     navigate("/level2");
    //   }
    // } 
    if (girlAvatar || shadowAvatar) {
      if(wentThrough){
        window.location.href = link;
      }
    }
});

const handleIntersection = (event) => {
  if (event.colliderObject.name === "character-capsule-collider") {
      setWentThrough(true);
  }
}

  return (
    <group position={props.position} rotation={doorRotation} scale={doorScale}>
      <mesh geometry={nodes.Door_1.geometry} material={materials.DoorFrame} />
      <mesh geometry={nodes.Door_2.geometry} material={materials.Door} />
      <CuboidCollider sensor={true} position={[0, 2, -1]} args={[1, 2, 0.3]}
      onIntersectionEnter={handleIntersection}/>
    </group>
  )
}

useGLTF.preload('/assets/models/FinalDoor/finalDoor.glb')