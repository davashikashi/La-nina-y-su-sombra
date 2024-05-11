import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useNavigate} from 'react-router-dom';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/assets/models/FinalDoor/finalDoor.glb')
  const avatarReference = props.avatarReference;
  const navigate = useNavigate(); // Obtiene el objeto history para redireccionar

  useFrame(() => {
    if (avatarReference.current) {
      const avatarPosition = avatarReference.current.translation();
    //   console.log("X position: ", avatarPosition.x, "Z position: ", avatarPosition.z);

      if (avatarPosition.x > -1 && avatarPosition.x < 1 && avatarPosition.z <= -99){
        navigate("/level2");
      }
    }
    
});

  return (
    <group position={props.position} rotation={[0, 3.1, 0]}>
      <mesh geometry={nodes.Door_1.geometry} material={materials.DoorFrame} />
      <mesh geometry={nodes.Door_2.geometry} material={materials.Door} />
    </group>
  )
}

useGLTF.preload('/assets/models/FinalDoor/finalDoor.glb')