import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Floor from "../floor/Floor";
import Pillar from "../pillar/Pillar";
import Walls from "../walls/Walls";
import { useGameContext } from '../../../context/GameContext';

export default function Map1(props) {
    const { nodes, materials } = useGLTF('/assets/models/world/Map1.glb');
    const { shadowAvatar, setHealth } = useGameContext();

    const handleFalling = (event) => {
      if (event.colliderObject.name === "character-capsule-collider") {
        
        setHealth(prevHealth => prevHealth - 3);
      }
    };

    return (

        <group {...props} dispose={null}>
          <CuboidCollider onIntersectionEnter={handleFalling} position={[0, -4, 0]} sensor={true} args={[50, 0.1, 100]} />
          
            <RigidBody type="fixed" colliders="trimesh">
              <Walls 
                geometry={nodes.Walls.geometry}
                materials={materials.WallMaterial} 
                />
            </RigidBody>
            
            <RigidBody type="fixed" colliders="trimesh">
            
              <Floor 
                geometry={nodes.Floor.geometry}
                materials={materials.FloorMaterial} />
            </RigidBody>

            <RigidBody type="fixed" colliders="hull">
              <Pillar 
                geometry={nodes.Pillar.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>

            <RigidBody type="fixed" colliders="hull">
              <Pillar 
                geometry={nodes.Pillar1.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>

            <RigidBody type="fixed" colliders="hull">
              <Pillar 
                geometry={nodes.Pillar2.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>

            <RigidBody type="fixed" colliders="hull">
              <Pillar 
                geometry={nodes.Pillar3.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>
        </group>
      )
}

//se hace la precarga del modelo
useGLTF.preload('/assets/models/world/Map1.glb')