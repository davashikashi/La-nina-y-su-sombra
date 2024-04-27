import { useTexture } from "@react-three/drei";
import { DoubleSide, RepeatWrapping } from "three";

export default function Walls({geometry, TexturePath}){
    
    const propsWallsTexture = useTexture({
        map: TexturePath + "dark_brick_wall_diff_1k.jpg",
        normalMap: TexturePath + "dark_brick_wall_nor_gl_1k.jpg",
        roughnessMap: TexturePath + "dark_brick_wall_rough_1k.jpg",
        diplacementMap: TexturePath + "dark_brick_wall_disp_1k.jpg"
    })

    //tiling texturas paredes
    //se hace el tiling de las texturas
    propsWallsTexture.map.rotation = Math.PI/2;
    propsWallsTexture.map.repeat.set(32,32);
    propsWallsTexture.map.wrapS = propsWallsTexture.map.wrapT = RepeatWrapping;

    propsWallsTexture.normalMap.rotation = Math.PI/2;
    propsWallsTexture.normalMap.repeat.set(32,32);
    propsWallsTexture.normalMap.wrapS = propsWallsTexture.normalMap.wrapT = RepeatWrapping;

    propsWallsTexture.roughnessMap.rotation = Math.PI/2;
    propsWallsTexture.roughnessMap.repeat.set(32,32);
    propsWallsTexture.roughnessMap.wrapS = propsWallsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsWallsTexture.diplacementMap.repeat.set(32,32);
    propsWallsTexture.diplacementMap.wrapS = propsWallsTexture.diplacementMap.wrapT = RepeatWrapping;


    return(
        <mesh onClick={(event)=> event.stopPropagation()} receiveShadow={true} geometry={geometry} >
                <meshStandardMaterial  {...propsWallsTexture} side={DoubleSide } />
        </mesh>
    )
}