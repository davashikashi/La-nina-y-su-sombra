import { KeyboardControls, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import Environments from "./Environment/Environments";
import Lights from "./Lights/Lights";
import Texts from "./Text/Texts";
import Controls from "./controls/Controls"
import Box from "./Box/Box";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Boar from "./characters/Boar/Boar";
import { Canvas } from "@react-three/fiber";
import Avatar from "./characters/avatar/Avatar";
import useMovements from "../../utils/key-movements";
import { Suspense } from "react";
import Flower from "./Flower/Flower";



const Level3 = () => {

    const map = useMovements();

    return (

        <KeyboardControls map={map}>
            <Canvas shadows={true} camera={{ position: [0, 20, 49] }} >
                <Suspense fallback={null}>
                    <Perf position="top-left" />
                    <Controls />
                    <Lights />
                    <Environments />
                    <Texts Position={[0, 7, 40]} Textto={"Reto Final"} color={"white"} />
                    <Physics debug={true} >
                        
                        <Box position={[0, 1, 4]} />
                        <Box position={[0, 1, 6]} />
                        <Box position={[4, 2.5, -7]} />
                        <Box position={[-7.5, 2.5, -6]} />
                        <Box position={[-7.5, 2.5, 19.5]} />
                        <Box position={[0, 2, 12]} />
                        <Boar nameModel={"Boar1"} nameRigid={"Boar1 Rigid"} position={[-5,1,6]} />
                        <Boar nameModel={"Boar2"} nameRigid={"Boar2 Rigid"} position={[5.5, 1, 48.5]} />
                        <Flower position={[0,4,0]}/>
                        <Avatar />
                        <World />
                    </Physics>
                </Suspense>
            </Canvas>
        </KeyboardControls>


    )

}

export default Level3;