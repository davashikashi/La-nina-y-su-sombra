import { useGLTF } from "@react-three/drei"
import Floor from "../Floor/Floor";
import Walls from "../Walls/Walls";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function World(props) {
    //se nodes debe estar relacionado con el modelo glb
    const { nodes } = useGLTF("/assets/models/world/world.glb")

    //se pone la ruta de las texturas para el piso
    const FloorPATH = "/assets/textures/floor/";
    //ruta texturas para paredes
    const WallsPATH = "/assets/textures/walls/";


    return (//se añade el modelo transformado de internet

        <group {...props} dispose={null}>
            <RigidBody type="fixed" colliders="trimesh">
                <Floor geometry={nodes.SecondFloor.geometry} TexturePath={FloorPATH} />

            </RigidBody>
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[20, 0.01, 80]} position={[0,0 ,0]}/>
                <Floor geometry={nodes.Floor.geometry} TexturePath={FloorPATH} />
            </RigidBody>
            <RigidBody type="fixed" colliders="trimesh">
                <Walls geometry={nodes.Walls.geometry} TexturePath={WallsPATH} />

            </RigidBody>

        </group>



    )
}

//se hace la precarga del modelo
useGLTF.preload('/world.glb')