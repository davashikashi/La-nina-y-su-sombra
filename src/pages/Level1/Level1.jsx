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


const Level1 = () => {
    const avatarRef = useRef();

    return (
        <Canvas shadows={true}>
            <Perf position="top-left" />
            <BakeShadows />
            <Suspense fallback={null}>
                <Lights />
                <MapEnvironments />
                {/* <OrbitControls makeDefault /> */}
                <Torch position={[-7.28, 2, -12]} rotation={[0, 1.5, 0]}/>
                <Torch position={[-7.28, 2, 0]} rotation={[0, 1.5, 0]}/>
                <Torch position={[7.28, 2, -5]} rotation={[0, 4.7, 0]}/>
                <Torch position={[-7.28, 2, 68]} rotation={[0, 1.5, 0]}/>
                <Torch position={[7.28, 2, 78]} rotation={[0, 4.7, 0]}/>
                <Torch position={[-7.28, 2, 88]} rotation={[0, 1.5, 0]}/>
                <Torch position={[-35, 2, -27.18]} rotation={[0, 6.5, 0]}/>
                <Torch position={[-23, 2, -11]} rotation={[0, 5.5, 0]}/>
                <Torch position={[0, 3, -47.25]} rotation={[0, 0, 0]}/>
                <Torch position={[12.95, 2, -39]} rotation={[0, 4.9, 0]}/>
                <Torch position={[-13.3, 2, -36]} rotation={[0, 1.5, 0]}/>
                <Torch position={[-9, 2, -58.75]} rotation={[0, 3.1, 0]}/>
                <Torch position={[-25, 2, -61.3]} rotation={[0, 0, 0]}/>
                <Torch position={[-35.3, 2, -83]} rotation={[0, 1.5, 0]}/>
                <Torch position={[-15, 2, -85.3]} rotation={[0, 0, 0]}/>
                <Torch position={[4, 2, -66.7]} rotation={[0, 3.1, 0]}/>
                <Torch position={[18, 2, -66.7]} rotation={[0, 3.1, 0]}/>
                <Torch position={[3, 3, -89.3]} rotation={[0, 0, 0]}/>
                <Torch position={[31, 2, -85.3]} rotation={[0, 0, 0]}/>
                <Torch position={[31.3, 2, -65]} rotation={[0, 4.7, 0]}/>
                <Torch position={[16, 2, -0.7]} rotation={[0, 3.1, 0]}/>
                <Torch position={[23.3, 2, -11.5]} rotation={[0, 4.7, 0]}/>
                <Candle position={[7.3, 0, 45]}/>
                <Candle position={[-7.5, 0, 25]}/>
                <Candle position={[13, 0, 53]}/>
                <Candle position={[27, 0, 32]}/>
                <Texts color="white" Position={[0, 4, 90]} Textto="¡Bienvenido a la primera mazmorra!"/>
                <Texts color="white" Position={[0, 4, 80]} Textto="Recoge la lampara
                la necesitaras"/>
                <Texts color="white" Position={[0, 4, 75]} Textto="Los enemigos de sombra
                intentaran apagar tu lampara" rotation ={[0, 0, 0]}/>
                <Texts color="white" Position={[0, 4, 70]} Textto="En zonas oscuras 
                perderas velocidad"/>
                <Texts color="white" Position={[0, 4, 65]} Textto="Si tu lampara esta apagada y esta
                oscuro perderas vida"/>
                <Texts color="white" Position={[7.3, 1, 45]} Textto="Puedes recargar tu lampara
                en las velas" fontSize={0.3} rotation={[0, -1.2, 0]}/>
                <Texts color="white" Position={[6, 1.5, 18]} Textto="Sigue las flores!" fontSize={0.3} rotation={[0, -1.2, 0]}/>
                <Texts color="white" Position={[0, 4, -20]} Textto="Busca la espada para derrotar
                al jabali!" fontSize={1} rotation={[0, 0, 0]}/>
                <Texts color="white" Position={[0, 4, -33]} Textto="Haz que choque contra
                los pilares o las paredes para
                aprovechar mientras esta aturdido" fontSize={0.8} rotation={[0, 0, 0]}/>
                <Texts color="white" Position={[0, 4, -45]} Textto="Encuentra las dos palancas
                en el laberinto para abrir
                el camino a la puerta de salida" fontSize={0.6} rotation={[0, 0, 0]}/>
                <Texts color="white" Position={[0, 2, -51]} Textto="Mucha Suerte!" fontSize={0.6} rotation={[0, 0, 0]}/>
                <Texts color="white" Position={[15, 4, -5]} Textto="Ataca con la tecla F" fontSize={0.6} rotation={[0, 3, 0]}/>
                <Texts color="white" Position={[15, 4, -3]} Textto="Cambia entre espada y lampara con Q y E"
                 fontSize={0.6} rotation={[0, 3, 0]}/>
                 <Texts color="white" Position={[0, 4, -96]} Textto="Felicidades!
                 Has llegado al final del Nivel 1!"
                 fontSize={0.6} rotation={[0, 0, 0]}/>
                <GameContextProvider>
                  <Physics debug={false} timestep="vary">

                          <Flower position={[0, 1, 65]}/>
                          <Flower position={[6, 1, 18]}/>
                          <Flower position={[20, 1, 52]}/>
                          <Flower position={[-6, 1, -6]}/>
                          <Flower position={[-34, 1, -26]}/>
                          <Flower position={[12, 1, -36]}/>
                          <Flower position={[16, 1, -12]}/>
                          <Flower position={[25, 1, -69]}/>
                          <Flower position={[-31, 1, -77]}/>
                          <Flower position={[7, 1, -79]}/>
                          <Fire position={[-8, 1, -59]} avatarReference={avatarRef}/>
                          <Fire position={[-1, 1, -61]} avatarReference={avatarRef}/>
                          <Fire position={[4, 1, -67]} avatarReference={avatarRef}/>
                          <Fire position={[18, 1, -67]} avatarReference={avatarRef}/>
                          <Fire position={[-19, 1, -79]} avatarReference={avatarRef}/>
                          <Fire position={[-19, 1, -85]} avatarReference={avatarRef}/>
                          <Fire position={[-35, 1, -83]} avatarReference={avatarRef}/>
                          <Fire position={[31, 1, -77]} avatarReference={avatarRef}/>
                          <Fire position={[23, 1, -87]} avatarReference={avatarRef}/>
                          <Avatar avatarPosition={[0, 1, 98]} ref={avatarRef}/>
                          <Boar position={[8, 1, -36]} avatarReference={avatarRef}/>
                          <ShadowEnemy position={[-5, 3, 41]} avatarReference={avatarRef}/>
                          <ShadowEnemy position={[15, 3, 40]} avatarReference={avatarRef}/>
                          <Map1 />
                  </Physics>
              </GameContextProvider>
              <FinalDoor position={[0, 0, -100]} avatarReference={avatarRef}/>
            </Suspense>
        </Canvas>
    )
}

export default Level1;