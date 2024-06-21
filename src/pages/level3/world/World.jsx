import { useGLTF } from "@react-three/drei"
import Floor from "../Floor/Floor";
import Walls from "../Walls/Walls";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import cancion from "../../../Sounds/Main Theme.mp3";
import { useGameContext } from "../../../context/GameContext";
import { useEffect, useRef } from "react";


export default function World(props) {
    //se nodes debe estar relacionado con el modelo glb
    const { nodes } = useGLTF("/assets/models/world/world.glb")

    //se pone la ruta de las texturas para el piso
    const FloorPATH = "/assets/textures/floor/";
    //ruta texturas para paredes
    const WallsPATH = "/assets/textures/walls/";

    const { shadowAvatar, setHealth } = useGameContext();

  
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


    return (//se añade el modelo transformado de internet

        <group {...props} dispose={null}>
            <RigidBody name="Suelo2Floor" type="fixed" colliders="trimesh">
                <Floor geometry={nodes.SecondFloor.geometry} TexturePath={FloorPATH} />

            </RigidBody>
            <RigidBody name="Suelo" type="fixed" colliders={"trimesh"}
            >
                {/* <CuboidCollider args={[20, 0.01, 80]} position={[0,0 ,0]}/> */}
                <Floor geometry={nodes.Floor.geometry} TexturePath={FloorPATH} />
            </RigidBody>
            <RigidBody name="Pared" type="fixed" colliders="trimesh">
                <Walls geometry={nodes.Walls.geometry} TexturePath={WallsPATH} />

            </RigidBody>

        </group>



    )
}

//se hace la precarga del modelo
useGLTF.preload('/world.glb')