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

const Level2 = () => {

    return (
        <Canvas shadows={true}>
            <BakeShadows />
            <Suspense fallback={null}>                
                <OrbitControls makeDefault />
                <Lights />
                <MapEnvironments />
                <Torch position={[32, 2, -7.28]} rotation={[0, 0, 0]}/>
                <GameContextProvider>
                    <Physics debug={false} timestep="vary">
                        <Flower position={[33, 1, 7]}/>
                        <Flower position={[57, 1, 13]}/>
                        <Flower position={[75, 1, 23]}/>
                        <Flower position={[101, 1, 1]}/>
                        <Flower position={[109, 3, 5]}/>
                        <Flower position={[123, 1, 7]}/>
                        <Flower position={[135, 1, 0]}/>
                        <Flower position={[153, 1, 1]}/>
                        <Flower position={[179, 1, 13]}/>
                        <Flower position={[194, 1, 0]}/>
                        <Perf position="top-left" />
                        <ambientLight intensity={0.5} />
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