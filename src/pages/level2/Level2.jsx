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
import GameUI from "../../UI/UI"
import Tentacle from "../../characters/tentacle/tentacle"
import World from "../level3/world/World"
import Door from "../../Objects/Door/Door"
import Spikes from "../../Objects/Spikes/Spikes"
import Fire from "../../characters/fire/fire"
import ShadowEnemy from "../../characters/ShadowEnemy/ShadowEnemy"



const Level2 = () => {

    return (




        <GameContextProvider>
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

                <Canvas shadows={true}>
                    <BakeShadows />
                    <Suspense fallback={null}>
                        {/* <OrbitControls makeDefault /> */}
                        <Lights />
                        <MapEnvironments />
                        <Torch position={[16, 1, -3.28]} rotation={[0, 0, 0]} />

                        <Physics debug={false} timestep="vary">

                            <Map2 />

                            <Flower id={"flower1"} position={[16.5, 1, 3]} />
                            <Flower id={"flower2"} position={[28.5, 1, 5.5]} />
                            <Flower id={"flower3"} position={[37, 1, 11]} />
                            <Flower id={"flower4"} position={[50.5, 1, 0.5]} />
                            <Flower id={"flower5"} position={[54.2, 2, 3.5]} />
                            <Flower id={"flower6"} position={[61.5, 1, 3.5]} />
                            <Flower id={"flower7"} position={[67.5, 1, 0]} />
                            <Flower id={"flower8"} position={[76.5, 1, 1]} />
                            <Flower id={"flower9"} position={[89.5, 1, 6.5]} />
                            <Flower id={"flower10"} position={[97, 1, 0]} />

                            {/* <Fire id={"fuego1"} position={[10,1,0]} /> */}

                            <Box id={"caja1"} position={[3, 1, -1.4]} />
                            <Box id={"caja2"} position={[3, 1, -0.7]} />
                            <Box id={"caja3"} position={[3, 1, 0]} />
                            <Box id={"caja4"} position={[3, 1, 0.7]} />
                            <Box id={"caja5"} position={[3, 1, 1.4]} />
                            <Box id={"caja6"} position={[8, 1, 3]} />
                            <Box id={"caja7"} position={[14.8, .2, 2.8]} />
                            <Box id={"caja8"} position={[20.5, 1.3, 5.5]} />
                            <Box id={"caja9"} position={[26, 1.3, 1.7]} />
                            <Box id={"caja10"} position={[41.75, 1, -.75]} />
                            <Box id={"caja11"} position={[43.25, 1, .25]} />
                            <Box id={"caja12"} position={[42.75, 1, 1.25]} />
                            <Box id={"caja13"} position={[43.75, 1, -.75]} />
                            <Box id={"caja14"} position={[44.75, 1, .25]} />
                            <Box id={"caja15"} position={[44.75, 1, 1.72]} />
                            <Box id={"caja16"} position={[45.25, 1, -1.72]} />
                            <Box id={"caja17"} position={[45.75, 1, 1.25]} />

                            <Plate id={"plate1"} position={[16.5, 0.06, 8]} />
                            <Plate id={"plate2"} position={[44.4, 2.06, 11]} />
                            <Plate id={"plate3"} position={[54.2, 1.06, 3.5]} />

                            <ShadowEnemy id={"shadow1"} position={[15, 1, 0]} boundsPosition={[0, 1, 35]} boundsArgs={[7.9, 1, 20]} rotation={[0, 1, 0]} />

                            {/* <Perf position="top" /> */}

                            <Tentacle id={"tentacle1"} position={[28, 0, 3]} />
                            <Tentacle id={"tentacle2"} position={[30, 0, 3]} />
                            <Tentacle id={"tentacle3"} position={[28, 0, 7]} />
                            <Tentacle id={"tentacle4"} position={[30, 0, 7]} />

                            <ShadowAvatar avatarPosition={[1, 10, 1]} />
                        </Physics>

                        {/* <FinalDoor position={[0, 0, -200]} avatarReference={avatarRef}/> */}
                    </Suspense>
                </Canvas>

                <GameUI />
            </div>
        </GameContextProvider>





    )
}

export default Level2;