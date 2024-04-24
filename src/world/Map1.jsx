import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import { normalMap } from 'three/examples/jsm/nodes/Nodes.js'
import { RepeatWrapping } from 'three'

export default function Map1(props) {
    const { nodes, materials } = useGLTF('/assets/models/world/Map1.glb');
    const FLOOR_PATH = '/assets/textures/floor/';
    const WALL_PATH = '/assets/textures/walls/';

    const propsFloorTexture = useTexture({
        map: FLOOR_PATH + 'rock_path_diff_1k.jpg',
        displacementMap: FLOOR_PATH + 'rock_path_disp_1k.png',
        normalMap: FLOOR_PATH + 'rock_path_nor_gl_1k.jpg',
        roughnessMap: FLOOR_PATH + 'rock_path_rough_1k.jpg',
    });

    const propsWallTexture = useTexture({
        map: WALL_PATH + 'plastered_stone_wall_diff_1k.jpg',
        displacementMap: WALL_PATH + 'plastered_stone_wall_disp_1k.png',
        normalMap: WALL_PATH + 'plastered_stone_wall_nor_gl_1k.jpg',
        roughnessMap: WALL_PATH + 'plastered_stone_wall_rough_1k.jpg',
    });


    propsFloorTexture.map.repeat.set(4, 64);
    propsFloorTexture.map.wrapS = propsFloorTexture.map.wrapT = RepeatWrapping;

    propsFloorTexture.map.repeat.set(4, 64);
    propsFloorTexture.map.wrapS = propsFloorTexture.normalMap.wrapT = RepeatWrapping;

    propsFloorTexture.map.repeat.set(4, 64);
    propsFloorTexture.map.wrapS = propsFloorTexture.roughnessMap.wrapT = RepeatWrapping;
    
    propsWallTexture.map.repeat.set(4, 64);
    propsWallTexture.map.wrapS = propsWallTexture.displacementMap.wrapT = RepeatWrapping;

    propsWallTexture.map.repeat.set(4, 64);
    propsWallTexture.map.wrapS = propsWallTexture.map.wrapT = RepeatWrapping;

    propsWallTexture.map.repeat.set(4, 64);
    propsWallTexture.map.wrapS = propsWallTexture.normalMap.wrapT = RepeatWrapping;

    propsWallTexture.map.repeat.set(4, 64);
    propsWallTexture.map.wrapS = propsWallTexture.roughnessMap.wrapT = RepeatWrapping;
    
    propsWallTexture.map.repeat.set(4, 64);
    propsWallTexture.map.wrapS = propsWallTexture.displacementMap.wrapT = RepeatWrapping;

    return (
        <group {...props} dispose={null}>
          <group>
            <mesh geometry={nodes.Walls.geometry}>
                <meshStandardMaterial {...propsWallTexture}/>
                </mesh>
            <mesh geometry={nodes.Floor.geometry}>
                <meshStandardMaterial {...propsFloorTexture}/>
                </mesh>
          </group>
        </group>
      )
}