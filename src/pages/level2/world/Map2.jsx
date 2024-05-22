import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Floor from "../floor/Floor";
import Walls from "../walls/Walls";

export default function Map2(props) {
  const { nodes, materials } = useGLTF('/assets/models/world/Map2.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <RigidBody type="fixed" colliders="trimesh">
          <Walls 
            geometry={nodes.Walls.geometry}
            materials={materials.wallMaterial} 
            />
        </RigidBody>
        
        <RigidBody type="fixed" colliders="trimesh">
          <Floor 
            geometry={nodes.Floor.geometry}
            materials={materials.floorMaterial} />
        </RigidBody>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/world/Map2.glb')
