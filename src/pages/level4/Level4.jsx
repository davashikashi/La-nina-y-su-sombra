import Box from "../../Objects/Box/Box";
import { Physics } from "@react-three/rapier";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Flower from "../../Objects/Flower/Flower";
import Fire from "../../characters/fire/fire";
import Avatar from "../../characters/avatar/Avatar";
import { GameContextProvider } from "../../context/GameContext";
import { OrbitControls, Text } from "@react-three/drei";
import ShadowAvatar from "../../characters/shadowAvatar/shadowAvatar";
import Door from "../../Objects/Door/Door";
import Plate from "../../Objects/Plate/Plate";
import GameUI from "../../UI/UI";
import Tentacle from "../../characters/tentacle/tentacle";
import Spikes from "../../Objects/Spikes/Spikes";
import FinalDoor from "../../Objects/FinalDoor/FinalDoor";
import Checkpoint from "../../Objects/Checkpoint/Checkpoint";
import { socket } from "../../socket/socket-manager"; // Importa el socket
import World4 from "./world/world4";
import Lights4 from "./Lights/Lights4";
import Environment4 from "./Environment/Environment4";
import Sparkle from "../level3/Sparkles/Sparkle";




const Level4 = () => {



    return (

        <GameContextProvider>
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

                <Canvas shadows={true} camera={{ position: [0, 20, 49] }} >
                    {/* <Perf position="top-left" /> */}
                    <OrbitControls makeDefault />
                    <Suspense fallback={null}>
                        <Lights4 />
                        <Environment4 />
                        <Sparkle position={[4, 6, -47]} />
                        {/* <Texts  Position={[0, 4, 44.8]} Textto={"Bienvenido al nivel 3"} color={"white"} />
                        <Texts  Position={[0, 3, 44.8]} Textto={"Ya sabes que hacer!"} color={"white"} />
                         */}
                        <Physics debug={false} timeStep="vary">

                            {//primera sala
                            }
                            <Door placasPresionRequeridas={["plate1", "plate2", "plate3"]} position={[-15, 2, -25.3]} />
                            <Door placasPresionRequeridas={["plate1", "plate2", "plate3"]} position={[15, 2, -25.3]} />
                            <Plate id={"plate1"} position={[0, 0.1, -30]} />
                            <Plate id={"plate2"} position={[4, 0.1, -30]} />
                            <Plate id={"plate3"} position={[4, 2.1, -20]} />
                            <Box id={"box1"} movement={false} position={[0, 1, -33]} />
                            <Box id={"box2"} movement={false} position={[4, 1, -27]} />
                            <Box id={"box3"} movement={false} position={[-4, 1, -30]} />
                            <Box id={"box4"} movement={true} position={[0, 3, -20]} />

                            {
                                //segunda sala
                            }
                            <Door placasPresionRequeridas={["plate4"]} position={[-15, 6, -0.3]} />
                            <Plate id={"plate4"} position={[18, 0.1, -20]} />
                            <Box id={"box5"} movement={false} position={[18, 3, -15]} />


                            <Door placasPresionRequeridas={["plate5"]} position={[15, 2, -0.3]} />
                            <Plate id={"plate5"} position={[-10, 0.1, -3]} />
                            <Box id={"box6"} movement={false} position={[-10, 3, -6]} />

                            {
                                //tercera sala
                            }

                            <Door placasPresionRequeridas={["plate6"]} position={[15, 2, 11.3]} />
                            <Door placasPresionRequeridas={["plate6"]} position={[-15.5, 2, 5.3]} rotation={[0, 1.57, 0]} />
                            <Plate id={"plate6"} position={[-18, 4.1, 8.3]} />
                            <Box id={"box7"} movement={false} position={[-18, 5, 6]} />

                            <Door placasPresionRequeridas={["plate7"]} position={[-15.5, 2, 10.3]} rotation={[0, 1.57, 0]} />
                            <Door placasPresionRequeridas={["plate7"]} position={[-15.5, 2, 0.3]} rotation={[0, 1.57, 0]} />
                            <Plate id={"plate7"} position={[-18, 4.1, 13.3]} />

                            <Door placasPresionRequeridas={["plate8"]} position={[15, 2, 19.3]} />
                            <Plate id={"plate8"} position={[-18, 4.1, 18.3]} />


                            <Door placasPresionRequeridas={["plate9"]} position={[-15.5, 6, -10.3]} rotation={[0, 1.57, 0]} />
                            <Plate id={"plate9"} position={[15, 0.1, 23.3]} />
                            <Box id={"box8"} movement={true} position={[18, 3, 23.3]} />

                            <Door placasPresionRequeridas={["plate9", "plate10"]} position={[-15.5, 6, 25.3]} />
                            <Plate id={"plate10"} position={[-7, 0.1, 19]} />
                            <Box id={"box9"} movement={false} position={[-7, 3, 22.3]} />


                            {
                                //enemigos
                            }

                            <Tentacle position={[15, 0, -18]} />
                            <Tentacle position={[12, 0, -7]} />
                            <Tentacle position={[-12, 0, -7]} />
                            <Tentacle position={[15, 0, 15]} />
                            <Tentacle position={[-5, 0, 19]} />
                            <Tentacle position={[-5, 0, 12]} />
                            <Tentacle position={[-14, 4, 19]} />
                            <Tentacle position={[-14, 4, 10]} />

                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-15, 0, -18]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-17, 0, -18]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-13, 0, -18]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-19, 0, -18]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[-11, 0, -18]} />


                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[15, 0, 5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[17, 0, 5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[19, 0, 5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[13, 0, 5]} />
                            <Spikes alternating={true} placasPresionRequeridas={["plate1"]} position={[11, 0, 5]} />


                            <Checkpoint position={[0, 1, -40]} />
                            <Checkpoint position={[15, 1, -22]} />
                            <Checkpoint position={[-15, 5, 2]} />
                            <Checkpoint position={[-18, 5, 28]} />

                            {
                                //faltan las flores
                            }


                            <Flower position={[-1, 1, 22]} />
                            <Flower position={[-3, 1, 22]} />
                            <Flower position={[-5, 1, 22]} />
                            <Flower position={[-1, 1, 24]} />
                            <Flower position={[-3, 1, 24]} />
                            <Flower position={[-5, 1, 24]} />

                            
                            <Flower position={[-1, 1, 5]} />
                            <Flower position={[-3, 1, 5]} />
                            <Flower position={[-5, 1, 5]} />
                            <Flower position={[-1, 1, 3]} />
                            <Flower position={[-3, 1, 3]} />
                            <Flower position={[-5, 1, 3]} />



                            <Flower position={[5, 1, -5]} />
                            <Flower position={[3, 1, -5]} />
                            <Flower position={[7, 1, -5]} />
                            <Flower position={[5, 1, -8]} />
                            <Flower position={[3, 1, -8]} />
                            <Flower position={[7, 1, -8]} />
                            <Flower position={[5, 1, -11]} />
                            <Flower position={[3, 1, -11]} />
                            <Flower position={[7, 1, -11]} />


                            <Flower position={[-5, 1, -5]} />
                            <Flower position={[-3, 1, -5]} />
                            <Flower position={[-7, 1, -5]} />
                            <Flower position={[-5, 1, -8]} />
                            <Flower position={[-3, 1, -8]} />
                            <Flower position={[-7, 1, -8]} />
                            <Flower position={[-5, 1, -11]} />
                            <Flower position={[-3, 1, -11]} />
                            <Flower position={[-7, 1, -11]} />

                            <Flower position={[5, 1, -34]} />
                            <Flower position={[-5, 1, -34]} />


                            <ShadowAvatar avatarPosition={[0, 15, -45]} />

                            <Avatar avatarPosition={[6, 10, -47]} />
                            {/* <ShadowAvatar avatarPosition={[15, 15, 50]} />  */}

                            <World4 />

                            <FinalDoor position={[15, 4.1, 60]} link="/congrats"/>


                        </Physics>
                    </Suspense>

                </Canvas>

                <GameUI />
            </div>
        </GameContextProvider>

    )

}

export default Level4;
