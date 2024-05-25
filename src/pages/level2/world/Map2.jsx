import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Floor from "../floor/Floor";
import Walls from "../walls/Walls";
import { useGameContext } from '../../../context/GameContext';
import golpeado from "../../../Sounds/hitEnemigo.mp3"

export default function Map2(props) {
  const { nodes, materials } = useGLTF('/assets/models/world/Map2.glb')
  const { setHealth } = useGameContext()

  const hitEnemigo = new Audio(golpeado)

  const handleFalling = (event) => {
    console.log(event.colliderObject.name)
    if (event.colliderObject.name === "character-capsule-collider") {
      hitEnemigo.volume = 0.3;
      hitEnemigo.play();
      setHealth(prevHealth => prevHealth - 3);
    }
  }


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
          <CuboidCollider onIntersectionEnter={handleFalling} position={[50, -3, 0]} sensor={true} args={[50, 0.1, 20]} />
          <Floor
            geometry={nodes.Floor.geometry}
            materials={materials.floorMaterial} />
        </RigidBody>

      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/world/Map2.glb')
