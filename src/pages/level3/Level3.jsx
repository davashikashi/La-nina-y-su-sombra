import World from "./world/World";
import Environments from "./Environment/Environments";
import Lights from "./Lights/Lights";
import Texts from "./Text/Texts";
import Box from "../../Objects/Box/Box";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Boar from "../../characters/Boar/Boar";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Flower from "../../Objects/Flower/Flower";
import Fire from "../../characters/fire/fire";
import Avatar from "../../characters/avatar/Avatar";
import Sword from "../../Objects/sword/sword";
import { GameContextProvider } from "../../context/GameContext";
import { OrbitControls, Text } from "@react-three/drei";
import Lamp from "../../Objects/Lamp/Lamp";
import ShadowAvatar from "../../characters/shadowAvatar/shadowAvatar";
import Door from "../../Objects/Door/Door";
import Plate from "../../Objects/Plate/Plate";
import GameUI from "../../UI/UI";
import Tentacle from "../../characters/tentacle/tentacle";
import Spikes from "../../Objects/Spikes/Spikes";
import ShadowEnemy from "../../characters/ShadowEnemy/ShadowEnemy";
import Map2 from "../level2/world/Map2";
import FinalDoor from "../../Objects/FinalDoor/FinalDoor";
import Checkpoint from "../../Objects/Checkpoint/Checkpoint";
import { socket } from "../../socket/socket-manager"; // Importa el socket




const Level3 = () => {

    

    return (

        <GameContextProvider>
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

                <Canvas shadows={true} camera={{ position: [0, 20, 49] }} >
                    {/* <Perf position="top-left" /> */}
                    {/* <OrbitControls makeDefault /> */}
                    <Suspense fallback={null}>
                        <Lights />
                        <Environments />
                        <Texts  Position={[0, 4, 44.8]} Textto={"Bienvenido al nivel 3"} color={"white"} />
                        <Texts  Position={[0, 3, 44.8]} Textto={"Ya sabes que hacer!"} color={"white"} />
                        
                        <Physics debug={false} timeStep="vary">

                            

                            
                            <Box id={"box1"} position={[0, 1, 6]} />
                            <Box id={"box2"} position={[4, 2.5, -7]} />
                            <Box id={"box3"} position={[-7.5, 2.5, -6]} />
                            <Box id={"box4"} position={[-7.5, 2.5, 19.5]} />
                            
                            {/* <Boar avatarReference={avatarRef} position={[-5, 2.5, 6]} />
                        <Boar avatarReference={avatarRef} position={[5, 2.5, 10]} />
                        <Boar avatarReference={avatarRef} position={[5.5, 2.5, 48.5]} />
                        <Flower position={[0, 1, 40]} /> */}
                            <Flower position={[0, 1, 30]} />
                            <Flower position={[0, 1, 0]} />


                            <Flower position={[0, 1, -3]} />
                            <Flower position={[1, 1, 0]} />
                            <Flower position={[9, 1, 11]} />
                            <Flower position={[11, 1, 8]} />
                            <Flower position={[10, 1, 8]} />
                            <Flower position={[9, 1, 8]} />
                            <Flower position={[11, 1, 11]} />
                            <Flower position={[10, 1, 11]} />

                            <Flower position={[0, 1, 35]} />
                            <Flower position={[5, 1, 25]} />
                            <Flower position={[-5, 1, 25]} />
                            <Flower position={[5, 1, 48]} />
                            <Flower position={[-5, 1, 48]} />
                            <Flower position={[-10, 1, 48]} />
                            <Flower position={[-10, 1, 0]} />
                            <Flower position={[0, 1, 10]} />
                            <Flower position={[8, 1, 10]} />
                            {/* <Fire avatarReference={avatarRef} position={[-12, 1, -2]} />
                        <Fire avatarReference={avatarRef} position={[-12, 1, 28]} />
                        <Fire avatarReference={avatarRef} position={[10, 1, 20]} />
                        <Fire avatarReference={avatarRef} position={[10, 1, 35]} /> */}
                            {/* <Avatar avatarPosition={[0,10,0]} ref={avatarRef}/> */}
                            
                            
                            <Door placasPresionRequeridas={["plate1"]} position={[0, 2, 44.55]} />
                            <Plate id={"plate1"} position={[13, 0.1, 43]} />
                            <Box  id={"box5"} position={[11, 1, 43]} />
                            
                            <Door placasPresionRequeridas={["plate2"]}  position={[-48.5, 2, -9]} rotation={[0,1.56,0]}  />
                            <Door placasPresionRequeridas={["plate2"]}  position={[-48 , 2, 4.3]} rotation={[0,1.56,0]}  />
                            <Plate id={"plate2"} position={[-5, 0.1, 43]} />
                            <Box id={"box6"} position={[-7, 2, 43]} />


                            <Door placasPresionRequeridas={["plate3"]}  position={[0, 2, 17]}   />
                            <Plate id={"plate3"} position={[-12, 0.1, 28]} />

                            <Door placasPresionRequeridas={["plate4"]}  position={[-12, 3, -8.25]}   />
                            <Plate id={"plate4"} position={[0, 0.1, 0]} />
                            
                            <Fire position={[8.5, 5, 40.5]} />
                            <Fire position={[5, 5, 22.5]} />
                            <Fire position={[-13, 10,-12]} />

                            <Fire position={[2, 10,-32]} />
                            <Fire position={[-5, 10,-32]} />


                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[0, 0, 33.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[1.5, 0, 33.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-1.5, 0, 33.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-1.5, 0, 35.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[0, 0, 35.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[1.5, 0, 35.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-1.5, 0, 37.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[0, 0, 37.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[1.5, 0, 37.5]} />
                            

                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-10.5, 0, -7.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-12, 0, -7.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-13.5, 0, -7.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-10.5, 0, -5.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-12, 0, -5.5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-13.5, 0, -5.5]} />

                            <ShadowAvatar avatarPosition={[0, 15, 47]} />

                            

                            <Tentacle position={[-13, 0, 44]} />
                            <Tentacle position={[0, 0, -5]} />

                            <Tentacle position={[-7.5, 0, 22]} />
                            <Tentacle position={[-7.5, 0, 35]} />

                            <Tentacle position={[-7.5, 0, 0]} />
                            <Tentacle position={[-5.5, 0, 10]} />
                            <Tentacle position={[0, 0, 10]} />
                            <Tentacle position={[7, 0, 2]} />

                            <Door placasPresionRequeridas={["plate5","plate6"]}  position={[0, 2, -42]}   />
                            <Plate id={"plate5"} position={[4, 0.1, -40]} />
                            <Plate id={"plate6"} position={[-4, 0.1, -40]} />

                            <Box id={"box7"} position={[-10, 1, -40]} />
                            <Box id={"box8"} position={[10, 1, -40]} />


                            <Checkpoint position={[-7, 1, 46]} />
                            <Checkpoint position={[0, 1, 42]} />
                            <Checkpoint position={[0, 1, 15]} />
                            <Checkpoint position={[0, 1.5, -15]} />
                            
                            <World />
                            
                        <FinalDoor position={[0, 0, -49]} link="/level4" />

                        </Physics>
                    </Suspense>
                    
                </Canvas>

                <GameUI />
            </div>
        </GameContextProvider>

    )

}

export default Level3;
