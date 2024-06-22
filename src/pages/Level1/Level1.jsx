import Map1 from "./world/Map1";
import MapEnvironments from "./environments/MapEnvironments";
import Lights from "./lights/Lights";
import { BakeShadows, OrbitControls } from "@react-three/drei";
import { Perf } from 'r3f-perf';
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Avatar from "../../characters/avatar/Avatar";
import Boar from "../../characters/Boar/Boar";
import Fire from "../../characters/fire/fire";
import ShadowEnemy from "../../characters/ShadowEnemy/ShadowEnemy";
import Torch from "../../Objects/Torch/Torch";
import Flower from "../../Objects/Flower/Flower";
import Candle from "../../Objects/Candle/Candle";
import FinalDoor from "../../Objects/FinalDoor/FinalDoor";
import { useRef } from "react";
import Texts from "./Texts/Texts";
import { GameContextProvider } from "../../context/GameContext";
import GameUI from "../../UI/UI";
import ShadowAvatar from "../../characters/shadowAvatar/shadowAvatar";
import Door from "../../Objects/Door/Door";
import Plate from "../../Objects/Plate/Plate";
import Box from "../../Objects/Box/Box";
import Checkpoint from "../../Objects/Checkpoint/Checkpoint";
import { useAuth } from "../../context/AuthContext";
// import Logout from "../../logout/Logout";


const Level1 = () => {
     //     const avatarRef = useRef();
     const auth = useAuth();

     return (
          <GameContextProvider>
               <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

                    <Canvas shadows={true}>
                         {/* <Perf position="top" /> */}
                         <BakeShadows />
                         <Suspense fallback={null}>
                              <Lights />
                              <MapEnvironments />
                              {/* <OrbitControls makeDefault /> */}


                              <Torch position={[-7.28, 2, -12]} rotation={[0, 1.5, 0]} />
                              <Torch position={[-7.28, 2, 0]} rotation={[0, 1.5, 0]} />
                              <Torch position={[7.28, 2, -5]} rotation={[0, 4.7, 0]} />
                              <Torch position={[-7.28, 2, 68]} rotation={[0, 1.5, 0]} />
                              <Torch position={[7.28, 2, 78]} rotation={[0, 4.7, 0]} />
                              <Torch position={[-7.28, 2, 88]} rotation={[0, 1.5, 0]} />
                              <Torch position={[-35, 2, -27.18]} rotation={[0, 6.5, 0]} />
                              <Torch position={[-23, 2, -11]} rotation={[0, 5.5, 0]} />
                              <Torch position={[0, 3, -47.25]} rotation={[0, 0, 0]} />
                              <Torch position={[12.95, 2, -39]} rotation={[0, 4.9, 0]} />
                              <Torch position={[-13.3, 2, -36]} rotation={[0, 1.5, 0]} />
                              <Torch position={[-9, 2, -58.75]} rotation={[0, 3.1, 0]} />
                              <Torch position={[-25, 2, -61.3]} rotation={[0, 0, 0]} />
                              <Torch position={[-35.3, 2, -83]} rotation={[0, 1.5, 0]} />
                              <Torch position={[-15, 2, -85.3]} rotation={[0, 0, 0]} />
                              <Torch position={[4, 2, -66.7]} rotation={[0, 3.1, 0]} />
                              <Torch position={[18, 2, -66.7]} rotation={[0, 3.1, 0]} />
                              <Torch position={[3, 3, -89.3]} rotation={[0, 0, 0]} />
                              <Torch position={[31, 2, -85.3]} rotation={[0, 0, 0]} />
                              <Torch position={[31.3, 2, -65]} rotation={[0, 4.7, 0]} />
                              <Torch position={[16, 2, -0.7]} rotation={[0, 3.1, 0]} />
                              <Torch position={[23.3, 2, -11.5]} rotation={[0, 4.7, 0]} />
                              <Candle position={[7.3, 0, 45]} />
                              <Candle position={[-7.5, 0, 25]} />
                              <Candle position={[13, 0, 53]} />
                              <Candle position={[27, 0, 32]} />
                              <Texts color="white" Position={[0, 4, 90]} Textto="¡Bienvenido a la primera mazmorra!" />

                              <Texts color="white" Position={[0, 4, 75]} Textto="Los Fuegos no se pueden atacar
                               e intentaran atacarte si te ven" rotation={[0, 0, 0]} />
                              <Texts color="white" Position={[6, 1.5, 18]} Textto="Sigue las flores!" fontSize={0.3} rotation={[0, -1.2, 0]} />
                              <Texts color="white" Position={[0, 4, -33]} Textto="Aprovecha cada instante para atacar con F" fontSize={0.8} rotation={[0, 0, 0]} />
                              <Texts color="white" Position={[0, 4, -45]} Textto="Encuentra las dos placas de presion
                     en el laberinto para abrir
                     el camino a la puerta de salida" fontSize={0.6} rotation={[0, 0, 0]} />
                              <Texts color="white" Position={[0, 2, -51]} Textto="Mucha Suerte!" fontSize={0.6} rotation={[0, 0, 0]} />
                              <Texts color="white" Position={[15, 4, -3]} Textto="Cambia de tamaño con Q"
                                   fontSize={0.6} rotation={[0, 3, 0]} />
                              <Texts color="white" Position={[0, 4, -96]} Textto="Felicidades!
                      Has llegado al final del Nivel 1!"
                                   fontSize={0.6} rotation={[0, 0, 0]} />

                              <Physics debug={false} timestep="vary">
                                   <Map1 />
                                   <Flower position={[0, 1, 65]} />
                                   <Flower position={[6, 1, 18]} />
                                   <Flower position={[20, 1, 52]} />
                                   <Flower position={[-6, 1, -6]} />
                                   <Flower position={[-34, 1, -26]} />
                                   <Flower position={[12, 1, -36]} />
                                   <Flower position={[16, 1, -12]} />
                                   <Flower position={[25, 1, -69]} />
                                   <Flower position={[-31, 1, -77]} />
                                   <Flower position={[7, 1, -79]} />

                                   <Door placasPresionRequeridas={["plate1"]} position={[0, 2, -21.7]} />
                                   <Box id={"caja21"} position={[-34, 1, -23]} />

                                   <Plate id={"plate1"} position={[-34, 0.1, -26]} />

                                   <Door placasPresionRequeridas={["plate2","plate3"]} position={[3, 2, -90.2]} />
                                   <Plate id={"plate2"} position={[15, 0.1, -70]} />
                                   <Box id={"caja1"} position={[10, 1, -70]} />

                                   <Plate id={"plate3"} position={[-18, 0.1, -80]} />
                                   <Box id={"caja2"} position={[-15, 1, -80]} />

                                   <ShadowAvatar avatarPosition={[0, 15, 97]} />

                                   {/* <Boar position={[8, 1, -36]} avatarReference={avatarRef}/> */}
                                   <Fire position={[-3, 3, 45]} />
                                   <Fire position={[-3, 3, 48]} />
                                   <Fire position={[-3, 3, 40]} />
                                   <ShadowEnemy position={[-3, 3, -40]} boundsPosition={[0, 1, 35]} boundsArgs={[7.9, 1, 20]} rotation={[0, 1, 0]} />
                                   
                                   
                                   
                                   <Checkpoint position={[0,1,90]}/>
                                   <Checkpoint position={[0,1,20]}/>
                                   <Checkpoint position={[0,1,-30]}/>
                                   <Checkpoint position={[0,1,20]}/>



                                   {/* <ShadowEnemy position={[15, 3, 40]} avatarReference={avatarRef}/> */}
                                   <FinalDoor position={[0, 0.1, -98]} link="/level2"/>
                              </Physics>
                              

                         </Suspense>
                         {/* <GameUI /> */}
                    </Canvas>
                    <GameUI />
               </div>
          </GameContextProvider>
     )
}

export default Level1;