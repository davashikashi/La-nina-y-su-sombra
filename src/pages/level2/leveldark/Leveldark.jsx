import { useGLTF, useTexture } from "@react-three/drei"
import { RepeatWrapping } from "three";

export default function Darkworld(props) {
    const { nodes, materials } = useGLTF("/assets/models/darkWorld/Dworld.glb")
    const FloorPATH = "/assets/textures/floor/";
    const WallsPATH = "/assets/textures/intwalls/";
    const IntwallsPATH = "/assets/textures/walls/";

    const propsFloorTexture = useTexture({
        map: FloorPATH + "patterned_cobblestone_diff_1k.jpg",
        normalMap: FloorPATH + "patterned_cobblestone_nor_dx_1k.jpg",
        roughnessMap: FloorPATH + "patterned_cobblestone_rough_1k.jpg",
        displacementMap: FloorPATH + "patterned_cobblestone_disp_1k.jpg",
    });

    propsFloorTexture.map.repeat.set(10, 64);
    propsFloorTexture.map.wrapS = propsFloorTexture.map.wrapT = RepeatWrapping;

    propsFloorTexture.normalMap.repeat.set(10, 64);
    propsFloorTexture.normalMap.wrapS = propsFloorTexture.normalMap.wrapT = RepeatWrapping;

    propsFloorTexture.roughnessMap.repeat.set(10, 64);
    propsFloorTexture.roughnessMap.wrapS = propsFloorTexture.roughnessMap.wrapT = RepeatWrapping;

    propsFloorTexture.displacementMap.repeat.set(10, 64);
    propsFloorTexture.displacementMap.wrapS = propsFloorTexture.displacementMap.wrapT = RepeatWrapping;

    const propsWallsTexture = useTexture({
        map: WallsPATH + "quarry_wall_02_diff_1k.jpg",
        normalMap: WallsPATH + "quarry_wall_02_nor_gl_1k.jpg",
        roughnessMap: WallsPATH + "quarry_wall_02_rough_1k.jpg",
        displacementMap: WallsPATH + "quarry_wall_02_disp_1k.png",
    });

    propsWallsTexture.map.repeat.set(10, 64);
    propsWallsTexture.map.wrapS = propsWallsTexture.map.wrapT = RepeatWrapping;

    propsWallsTexture.normalMap.repeat.set(10, 64);
    propsWallsTexture.normalMap.wrapS = propsWallsTexture.normalMap.wrapT = RepeatWrapping;

    propsWallsTexture.roughnessMap.repeat.set(10, 64);
    propsWallsTexture.roughnessMap.wrapS = propsWallsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsWallsTexture.displacementMap.repeat.set(10, 64);
    propsWallsTexture.displacementMap.wrapS = propsWallsTexture.displacementMap.wrapT = RepeatWrapping;

    const propsIntwallsTexture = useTexture({
        map: IntwallsPATH + "dark_brick_wall_diff_1k.jpg",
        normalMap: IntwallsPATH + "dark_brick_wall_nor_gl_1k.jpg",
        roughnessMap: IntwallsPATH + "dark_brick_wall_rough_1k.jpg",
        displacementMap: IntwallsPATH + "dark_brick_wall_disp_1k.jpg",
    });

    propsIntwallsTexture.map.repeat.set(5, 20);
    propsIntwallsTexture.map.wrapS = propsIntwallsTexture.map.wrapT = RepeatWrapping;

    propsIntwallsTexture.normalMap.repeat.set(5, 20);
    propsIntwallsTexture.normalMap.wrapS = propsIntwallsTexture.normalMap.wrapT = RepeatWrapping;

    propsIntwallsTexture.roughnessMap.repeat.set(5, 20);
    propsIntwallsTexture.roughnessMap.wrapS = propsIntwallsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsIntwallsTexture.displacementMap.repeat.set(5, 20);
    propsIntwallsTexture.displacementMap.wrapS = propsIntwallsTexture.displacementMap.wrapT = RepeatWrapping;

    return (
        <group {...props} dispose={null}>
            <group>
                <mesh geometry={nodes.Walls.geometry}>
                    <meshStandardMaterial {...propsWallsTexture} />
                </mesh>
                <mesh geometry={nodes.IntWalls.geometry}>
                    <meshStandardMaterial {...propsIntwallsTexture} />
                </mesh>
                <mesh geometry={nodes.Floor.geometry}>
                    <meshStandardMaterial {...propsFloorTexture} />
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload('/Dworld.glb');
