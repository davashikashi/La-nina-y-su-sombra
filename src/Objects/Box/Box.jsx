import { useGLTF, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import { RepeatWrapping } from "three"
import { useGameContext } from "../../context/GameContext"

export default function Box(props) {

    const { nodes } = useGLTF("/assets/models/Box/Box.glb")
    const {isAttacking, isTakingSword} = useGameContext()

    const TexturePath = "/assets/textures/crate/"

    const propsBoxTexture = useTexture({
        map: TexturePath + "Cratebpr_diffuseOriginal.jpg",
        normalMap: TexturePath + "Cratebpr_normal.jpg",
        roughnessMap: TexturePath + "Cratebpr_smoothness.jpg",
        diplacementMap: TexturePath + "Cratebpr_height.jpg"
    })

    //se hace el tiling de las texturas
    propsBoxTexture.map.repeat.set(1, 1);
    propsBoxTexture.map.wrapS = propsBoxTexture.map.wrapT = RepeatWrapping;

    propsBoxTexture.normalMap.repeat.set(1, 1);
    propsBoxTexture.normalMap.wrapS = propsBoxTexture.normalMap.wrapT = RepeatWrapping;

    propsBoxTexture.roughnessMap.repeat.set(1, 1);
    propsBoxTexture.roughnessMap.wrapS = propsBoxTexture.roughnessMap.wrapT = RepeatWrapping;

    propsBoxTexture.diplacementMap.repeat.set(1, 1);
    propsBoxTexture.diplacementMap.wrapS = propsBoxTexture.diplacementMap.wrapT = RepeatWrapping;

    

    const health = useRef(100);

    const handleHit = () => {
        console.log(isAttacking)
        if (isAttacking && isTakingSword) {
            health.current = Math.max(health.current - 10, 0);
            console.log("Health:", health.current);
            console.log("desde box ")
        }

    };

    if (health.current <= 0) {
        return null;
    }

    // 


    return (
        <RigidBody
            name="rigid caja"
            type="dynamic"
            colliders="trimesh"
            onIntersectionEnter={handleHit}
        >
            <group {...props} dispose={null}>
                <group>
                    <mesh castShadow={true} position={props.position} geometry={nodes.Box.geometry}  >
                        <meshStandardMaterial {...propsBoxTexture} />
                    </mesh>
                </group>
            </group>

        </RigidBody>

    )
}

useGLTF.preload('/Box.glb')