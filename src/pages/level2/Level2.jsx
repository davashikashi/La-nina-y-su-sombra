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
import Checkpoint from "../../Objects/Checkpoint/Checkpoint"
import Texts from "./Texts/Texts"



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
                        <Texts color="white" Position={[4, 2.5, 0]} Textto="Bienvenido a la Segunda mazmorra!" rotation={[0, 5, 0]}
                        fontSize={.5}/>
                        <Texts color="white" Position={[8, 3, 0]} Textto="Como la sombra puedes empujar cajas" rotation={[0, 5, 0]}
                        fontSize={.5}/>
                        <Texts color="white" Position={[8, 2.5, 0]} Textto="Ataca con la tecla F" rotation={[0, 5, 0]}
                        fontSize={.5}/>
                        <Texts color="white" Position={[17, 1.5, 3]} Textto="Puedes Encogerte con la tecla Q" rotation={[0, 3.7, 0]}
                        fontSize={.3}/>
                        <Texts color="white" Position={[18.5, 3, -2]} Textto="Recuerda la meta esta" rotation={[0, 5, 0]}
                        fontSize={.5}/>
                        <Texts color="white" Position={[18.5, 2.5, -1.8]} Textto="cruzando la puerta final" rotation={[0, 5, 0]}
                        fontSize={.5}/>

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

                            <Checkpoint id={"checkpoint1"} position={[43, 2.3, 10]} />
                            <Checkpoint id={"checkpoint1"} position={[23, 0.3, 0]} />
                            <Checkpoint id={"checkpoint1"} position={[58.5, 0.3, 0]} />
                            <Checkpoint id={"checkpoint1"} position={[81.5, 0.3, 0]} />

                            {/* <Fire id={"fuego1"} position={[10,1,0]} /> */}

                            <Box id={"caja1"} position={[4, 1, 2.5]} />
                            <Box id={"caja2"}  position={[4, 1, 1.4]} />
                            <Box id={"caja3"}  position={[4, 1, 0.3]} />
                            <Box id={"caja4"}  position={[4, 1, -.8]} />
                            <Box id={"caja5"}  position={[4, 1, -1.9]} />
                            <Box id={"caja6"}  position={[4, 1, -3]} />
                            <Box id={"caja7"}  position={[16.5, 1, 5.5]} />
                            <Box id={"caja8"}  position={[29.5, 1, 5.25]} />
                            <Box id={"caja9"}  position={[39.5, 3, 10.5]} />
                            <Box id={"caja10"}  position={[51.5, 3, 3.5]} />
                            <Box id={"caja11"}  position={[78, 1, 7.2]} />
                            <Box id={"caja12"}  position={[83.5, 1, -1.5]} />
                            <Box id={"caja13"}  position={[85.5, 1, 2.5]} />
                            <Box id={"caja14"}  position={[89.5, 1, 3.5]} />
                            <Box id={"caja15"}  position={[91.5, 1, 2.5]} />
                            <Box id={"caja16"}  position={[89.5, 1, .5]} />
                            <Box id={"caja17"}  position={[86.5, 1, .5]} />
                            <Box id={"caja18"}  position={[87.5, 1, -1.5]} />
                            <Box id={"caja19"}  position={[84.5, 1, -3.5]} />
                            <Box id={"caja20"}  position={[90.5, 1, -3.5]} />
                            <Box id={"caja21"}  position={[89, 1, -5.5]} />

                            <Plate id={"plate1"} position={[16.5, 0.06, 8]} />
                            <Plate id={"plate2"} position={[44.4, 2.06, 11]} />
                            <Plate id={"plate3"} position={[54.2, 1.06, 3.5]} />
                            <Plate id={"plate4"} position={[76.5, .06, 7.2]} />
                            <Plate id={"plate5"} position={[90.5, .06, -6.2]} />

                            {/* <Perf position="top" /> */}

                            <Tentacle id={"tentacle1"} position={[26.5, 0, 2.5]} />
                            <Tentacle id={"tentacle2"} position={[32.5, 0, 2.5]} />
                            <Tentacle id={"tentacle3"} position={[26.5, 0, 8.5]} />
                            <Tentacle id={"tentacle4"} position={[32.5, 0, 8.5]} />
                            <Tentacle id={"tentacle5"} position={[77, 0, 5.5]} />

                            <ShadowEnemy id={"ShadowEnemy1"} position={[84.5, 3, 0]} boundsPosition={[87.5, 1, 0]}
                             boundsArgs={[5.5, 1, 4]} rotation={[0, 4, 0]}/>

                            <Fire position={[50.5, 3, -0.5]} id={"fire1"}/>
                            <Fire position={[65.5, 3, -0.5]} rotation={[0, 1.55, 0]} id={"fire2"}/>
                            {/* <Fire position={[10, 3, 0]} rotation={[0, 1.55, 0]} id={"fire3"}/> */}

                            <Door placasPresionRequeridas={["plate1"]} position={[0, 2, 20.5]} rotation={[0, 1.57, 0]} />
                            <Door placasPresionRequeridas={["plate2"]} position={[0, 2, 38.5]} rotation={[0, 1.57, 0]} />
                            <Door placasPresionRequeridas={["plate3"]} position={[0, 2, 56.2]} rotation={[0, 1.57, 0]} />
                            <Door placasPresionRequeridas={["plate5"]} position={[0, 2, 93.5]} rotation={[0, 1.57, 0]} />

                            <Spikes position={[41, 0, 0]} alternating={true} />
                            <Spikes position={[45, 0, 0]} alternating={true} />
                            <Spikes position={[64, 0, 3]} alternating={true} />
                            <Spikes position={[78, 0, 0]} placasPresionRequeridas={["plate4"]} />

                            <ShadowAvatar avatarPosition={[1, 10, 1]} />
                            <FinalDoor position={[99, 0.1, 0]} link="/level3" rotation={[0, 4.7, 0]}/>
                        </Physics>
                    </Suspense>
                </Canvas>

                <GameUI />
            </div>
        </GameContextProvider>





    )
}

export default Level2;