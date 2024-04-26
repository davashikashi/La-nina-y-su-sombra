import { useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export default function Floor({ geometry, TexturePath }) {

    //el prop que lleva las texturas del suelo
    const propsFloorTexture = useTexture({
        map: TexturePath + "patterned_cobblestone_diff_1k.jpg",
        normalMap: TexturePath + "patterned_cobblestone_nor_dx_1k.jpg",
        roughnessMap: TexturePath + "patterned_cobblestone_rough_1k.jpg",
        diplacementMap: TexturePath + "patterned_cobblestone_disp_1k.jpg"
    })

    //se hace el tiling de las texturas para el piso
    propsFloorTexture.map.repeat.set(32, 32);
    propsFloorTexture.map.wrapS = propsFloorTexture.map.wrapT = RepeatWrapping;

    propsFloorTexture.normalMap.repeat.set(32, 32);
    propsFloorTexture.normalMap.wrapS = propsFloorTexture.normalMap.wrapT = RepeatWrapping;

    propsFloorTexture.roughnessMap.repeat.set(32, 32);
    propsFloorTexture.roughnessMap.wrapS = propsFloorTexture.roughnessMap.wrapT = RepeatWrapping;

    propsFloorTexture.diplacementMap.repeat.set(32, 32);
    propsFloorTexture.diplacementMap.wrapS = propsFloorTexture.diplacementMap.wrapT = RepeatWrapping;


    return (
        <>
            <mesh  receiveShadow={true} geometry={geometry} >
                <meshStandardMaterial  {...propsFloorTexture} />
            </mesh>
        </>
    )
}