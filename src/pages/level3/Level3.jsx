import { OrbitControls} from "@react-three/drei";
import World from "./world/World";
import Environments from "./Environment/Environments";
import Lights from "./Lights/Lights";
import Texts from "./Text/Texts";
import Box from "./Box/Box";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Boar from "./characters/Boar/Boar";
import { Canvas } from "@react-three/fiber";



const Level3 = () => {

    return (
        <Canvas camera={{position: [0,2,50]}} >
            <Perf position="top-left" />
            <OrbitControls target={[0, 2, 0]} />
            <Lights />
            <Environments />
            <Texts Position={[0, 7, 40]} Textto={"Reto Final"} color={"white"} />
            <Physics  debug={true} >
                <World />
                <Boar position={[5.5, 0.5, 40]} />
                <Box position={[0, 1, 4]} />
                <Box position={[0, 1, 6]} />
                <Box position={[4, 2.5, -7]} />
                <Box position={[-7.5, 2.5, -6]} />
                <Box position={[-7.5, 2.5, 19.5]} />
            </Physics>

        </Canvas>
    )

}

export default Level3;