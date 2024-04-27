import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import Floor from "../floor/Floor";
import Pillar from "../pillar/Pillar";
import Walls from "../walls/Walls";

export default function Map1(props) {
    const { nodes, materials } = useGLTF('/assets/models/world/Map1.glb');

    return (
        <group {...props} dispose={null}>
          <group>
            <RigidBody type="fixed" collider="trimesh" >
              <Walls 
                geometry={nodes.Walls.geometry}
                materials={materials.WallMaterial} 
                />
            </RigidBody>
            
            <RigidBody type="fixed" collider="trimesh">
              <Floor 
              geometry={nodes.Floor.geometry}
               materials={materials.FloorMaterial} />
            </RigidBody>

            <RigidBody type="fixed" collider="trimesh">
              <Pillar 
                geometry={nodes.Pillar.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>

            <RigidBody type="fixed" collider="trimesh">
              <Pillar 
                geometry={nodes.Pillar1.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>

            <RigidBody type="fixed" collider="trimesh">
              <Pillar 
                geometry={nodes.Pillar2.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>

            <RigidBody type="fixed" collider="trimesh">
              <Pillar 
                geometry={nodes.Pillar3.geometry}
                materials={materials.PillarMaterial} 
                />
            </RigidBody>
          </group>
        </group>
      )
}