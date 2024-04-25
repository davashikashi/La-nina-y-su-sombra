import { useGLTF, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { RepeatWrapping } from "three"


export default function Box(props) {

    const { nodes } = useGLTF("/assets/models/Box/Box.glb")

    const TexturePath = "/assets/textures/crate/"

    const propsBoxTexture = useTexture({
        map: TexturePath + "Cratebpr_diffuseOriginal.jpg",
        normalMap: TexturePath + "Cratebpr_normal.jpg",
        roughnessMap: TexturePath + "Cratebpr_smoothness.jpg",
        diplacementMap: TexturePath + "Cratebpr_height.jpg"
    })
    console.log(nodes)
    //se hace el tiling de las texturas
    propsBoxTexture.map.repeat.set(1, 1);
    propsBoxTexture.map.wrapS = propsBoxTexture.map.wrapT = RepeatWrapping;

    propsBoxTexture.normalMap.repeat.set(1, 1);
    propsBoxTexture.normalMap.wrapS = propsBoxTexture.normalMap.wrapT = RepeatWrapping;

    propsBoxTexture.roughnessMap.repeat.set(1, 1);
    propsBoxTexture.roughnessMap.wrapS = propsBoxTexture.roughnessMap.wrapT = RepeatWrapping;

    propsBoxTexture.diplacementMap.repeat.set(1, 1);
    propsBoxTexture.diplacementMap.wrapS = propsBoxTexture.diplacementMap.wrapT = RepeatWrapping;


    return (
        <RigidBody type="dynamic" colliders="cuboid">
            <group {...props} dispose={null}>
                <group>
                    <mesh castShadow position={props.position} geometry={nodes.Box.geometry}  >
                        <meshStandardMaterial {...propsBoxTexture} />
                    </mesh>
                </group>
            </group>

        </RigidBody>

    )
}

useGLTF.preload('/Box.glb')