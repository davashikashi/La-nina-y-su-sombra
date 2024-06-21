import { useGLTF, useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import cancion from "../../../Sounds/Main Theme.mp3";
import golpeado from "../../../Sounds/hitEnemigo.mp3";
import { useGameContext } from "../../../context/GameContext";
import { useEffect, useRef } from "react";
import {DoubleSide, RepeatWrapping } from "three";


export default function World4(props) {
    //se nodes debe estar relacionado con el modelo glb
    const { nodes, materials } = useGLTF("/assets/models/world/world4.glb")

    //se pone la ruta de las texturas para el piso
    const FloorPATH = "/assets/textures/floor/";
    //ruta texturas para paredes
    const WallsPATH = "/assets/textures/walls/";

    const propsWallsTexture = useTexture({
        map: WallsPATH + "dark_brick_wall_diff_1k.jpg",
        normalMap: WallsPATH + "dark_brick_wall_nor_gl_1k.jpg",
        roughnessMap: WallsPATH + "dark_brick_wall_rough_1k.jpg",
        diplacementMap: WallsPATH + "dark_brick_wall_disp_1k.jpg"
    })

    //tiling texturas paredes
    //se hace el tiling de las texturas
    propsWallsTexture.map.rotation = Math.PI / 2;
    propsWallsTexture.map.repeat.set(30,2);
    propsWallsTexture.map.wrapS = propsWallsTexture.map.wrapT = RepeatWrapping;

    propsWallsTexture.normalMap.rotation = Math.PI / 2;
    propsWallsTexture.normalMap.repeat.set(30, 2);
    propsWallsTexture.normalMap.wrapS = propsWallsTexture.normalMap.wrapT = RepeatWrapping;

    propsWallsTexture.roughnessMap.rotation = Math.PI / 2;
    propsWallsTexture.roughnessMap.repeat.set(30, 2);
    propsWallsTexture.roughnessMap.wrapS = propsWallsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsWallsTexture.diplacementMap.repeat.set(30, 2);
    propsWallsTexture.diplacementMap.wrapS = propsWallsTexture.diplacementMap.wrapT = RepeatWrapping;

    const propsFloorTexture = useTexture({
        map: FloorPATH + "patterned_cobblestone_diff_1k.jpg",
        normalMap: FloorPATH + "patterned_cobblestone_nor_dx_1k.jpg",
        roughnessMap: FloorPATH + "patterned_cobblestone_rough_1k.jpg",
        diplacementMap: FloorPATH + "patterned_cobblestone_disp_1k.jpg"
    })

    //se hace el tiling de las texturas para el piso
    propsFloorTexture.map.repeat.set(10, 10);
    propsFloorTexture.map.wrapS = propsFloorTexture.map.wrapT = RepeatWrapping;

    propsFloorTexture.normalMap.repeat.set(10,10);
    propsFloorTexture.normalMap.wrapS = propsFloorTexture.normalMap.wrapT = RepeatWrapping;

    propsFloorTexture.roughnessMap.repeat.set(10,10);
    propsFloorTexture.roughnessMap.wrapS = propsFloorTexture.roughnessMap.wrapT = RepeatWrapping;

    propsFloorTexture.diplacementMap.repeat.set(10,10);
    propsFloorTexture.diplacementMap.wrapS = propsFloorTexture.diplacementMap.wrapT = RepeatWrapping;


    const { shadowAvatar, setHealth } = useGameContext();

    const hitEnemigoRef = useRef(new Audio(golpeado));
    const cancionThemeRef = useRef(new Audio(cancion));

    useEffect(() => {
        const cancionTheme = cancionThemeRef.current;
        cancionTheme.loop = true;
        cancionTheme.volume = 0.15;

        const playAudio = () => {
            cancionTheme.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        };

        document.addEventListener('click', playAudio, { once: true });

        return () => {
            document.removeEventListener('click', playAudio);
            cancionTheme.pause();
        };
    }, [shadowAvatar]);

    const handleFalling = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
          const hitEnemigo = hitEnemigoRef.current;
          hitEnemigo.volume = 0.3;
          hitEnemigo.play();
          setHealth(prevHealth => prevHealth - 3);
        }
      };


    return (//se añade el modelo transformado de internet

        <group {...props} dispose={null}>
            <CuboidCollider onIntersectionEnter={handleFalling} position={[0, -3, 0]} sensor={true} args={[20, 0.1, 50]} />
          
            <RigidBody name="Floor" type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Floor.geometry}
                    scale={[20, 1, 50]}
                >
                    <meshStandardMaterial {...propsFloorTexture} />
                </mesh>
            </RigidBody>
            <RigidBody name="Walls" type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Walls.geometry}
                    scale={[20, 1, 50]}
                >
                    <meshStandardMaterial {...propsWallsTexture} side={DoubleSide}/>
                </mesh>
            </RigidBody>
            <RigidBody name="ThirdFloor" type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.thirdFloor.geometry}
                    scale={[20, 1, 50]}
                >
                    <meshStandardMaterial {...propsFloorTexture} />
                </mesh>
            </RigidBody>
            <RigidBody name="SecondFloor" type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.secondFloor.geometry}
                    
                    scale={[20, 1, 50]}
                >
                    <meshStandardMaterial {...propsFloorTexture} />
                </mesh>
            </RigidBody>
        </group>

    )
}

//se hace la precarga del modelo
useGLTF.preload('/world4.glb')