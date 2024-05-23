import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { Suspense } from "react"
import Map2 from "./world/Map2"
import { OrbitControls } from "@react-three/drei"
import { Physics } from "@react-three/rapier";
import Torch from "../../Objects/Torch/Torch";
import Flower from "../../Objects/Flower/Flower";
import { BakeShadows } from "@react-three/drei";
import MapEnvironments from "./environments/MapEnvironments"
import Lights from "./lights/Lights";
import { GameContextProvider } from "../../context/GameContext";
import ShadowAvatar from "../../characters/shadowAvatar/shadowAvatar";
import FinalDoor from "../../Objects/FinalDoor/FinalDoor";
import Box from "../../Objects/Box/Box";
import Plate from "../../Objects/Plate/Plate";

const Level2 = () => {

    return (
        <Canvas shadows={true}>
            <BakeShadows />
            <Suspense fallback={null}>                
                <OrbitControls makeDefault />
                <Lights />
                <MapEnvironments />
                <Torch position={[16, 1, -3.28]} rotation={[0, 0, 0]}/>
                <GameContextProvider>
                    <Physics debug={false} timestep="vary">
                        <Flower position={[16.5, 1, 3]}/>
                        <Flower position={[28.5, 1, 5.5]}/>
                        <Flower position={[37, 1, 11]}/>
                        <Flower position={[50.5, 1, 0.5]}/>
                        <Flower position={[54.2, 2, 3.5]}/>
                        <Flower position={[61.5, 1, 3.5]}/>
                        <Flower position={[67.5, 1, 0]}/>
                        <Flower position={[76.5, 1, 1]}/>
                        <Flower position={[89.5, 1, 6.5]}/>
                        <Flower position={[97, 1, 0]}/>
                        
                        <Box position={[3, .2, -1.4]} />
                        <Box position={[3, .2, -.7]} />
                        <Box position={[3, .2, 0]} />
                        <Box position={[3, .2, .7]} />
                        <Box position={[3, .2, 1.4]} />
                        <Box position={[8, .2, 3]} />
                        <Box position={[14.8, .2, 2.8]} />
                        <Box position={[20.5, 1.3, 5.5]} />
                        <Box position={[26, 1.3, 1.7]} />
                        <Box position={[41.75, 1, -.75]} />
                        <Box position={[43.25, 1, .25]} />
                        <Box position={[42.75, 1, 1.25]} />
                        <Box position={[43.75, 1, -.75]} />
                        <Box position={[44.75, 1, .25]} />
                        <Box position={[44.75, 1, 1.72]} />
                        <Box position={[45.25, 1, -1.72]} />
                        <Box position={[45.75, 1, 1.25]} />

                        <Plate id={"plate1"} position={[16.5, 0.06, 8]} />
                        <Plate id={"plate2"} position={[44.4, 2.06, 11]} />
                        <Plate id={"plate3"} position={[54.2, 1.06, 3.5]} />

                        <Perf position="top" />

                        <Map2 />
                        {/* <ShadowAvatar avatarPosition={[0, 10, 0]} /> */}
                    </Physics>
                </GameContextProvider>
                {/* <FinalDoor position={[0, 0, -200]} avatarReference={avatarRef}/> */}
            </Suspense>
        </Canvas>
    )
}

export default Level2;