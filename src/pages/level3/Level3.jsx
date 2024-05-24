
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
import { OrbitControls } from "@react-three/drei";
import Lamp from "../../Objects/Lamp/Lamp";
import ShadowAvatar from "../../characters/shadowAvatar/shadowAvatar";
import Door from "../../Objects/Door/Door";
import Plate from "../../Objects/Plate/Plate";
import GameUI from "../../UI/UI";
import Tentacle from "../../characters/tentacle/tentacle";
import Spikes from "../../Objects/Spikes/Spikes";
import ShadowEnemy from "../../characters/ShadowEnemy/ShadowEnemy";
import Map2 from "../level2/world/Map2";




const Level3 = () => {

    return (

        <GameContextProvider>
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

                <Canvas shadows={true} camera={{ position: [0, 20, 49] }} >
                    {/* <Perf position="top-left" /> */}
                    <Suspense fallback={null}>
                        <Lights />
                        <Environments />
                        <Texts Position={[0, 7, 40]} Textto={"Reto Final"} color={"white"} />

                        <Physics debug={true} timeStep="vary">

                            <World />

                            <Box position={[0, 1, 4]} />
                            <Box position={[0, 1, 6]} />
                            <Box position={[4, 2.5, -7]} />
                            <Box position={[-7.5, 2.5, -6]} />
                            <Box position={[-7.5, 2.5, 19.5]} />
                            <Box position={[0, 2, 12]} />
                            {/* <Boar avatarReference={avatarRef} position={[-5, 2.5, 6]} />
                        <Boar avatarReference={avatarRef} position={[5, 2.5, 10]} />
                        <Boar avatarReference={avatarRef} position={[5.5, 2.5, 48.5]} />
                        <Flower position={[0, 1, 40]} /> */}
                            <Flower position={[0, 1, 30]} />
                            <Flower position={[0, 1, 0]} />


                            <Flower position={[0, 1, -3]} />
                            <Flower position={[1, 1, 0]} />
                            <Flower position={[0, 1, -4]} />
                            <Flower position={[2, 1, 0]} />
                            <Flower position={[3, 1, 0]} />
                            <Flower position={[-1, 1, 0]} />
                            <Flower position={[-2, 1, 0]} />
                            <Flower position={[-3, 1, 0]} />

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
                            <Door placasPresionRequeridas={["plate1", "plate2"]} position={[0, 2, 4.3]} />
                            <Spikes placasPresionRequeridas={["plate1"]} position={[-4, 0, 7]} />
                            <Plate id={"plate1"} position={[-2, 0.1, 10]} />
                            <Plate id={"plate2"} position={[-2, 0.1, 8]} />
                            <Fire position={[0, 5, 0]} />
                            <ShadowAvatar avatarPosition={[0, 10, -2]} />
                            <ShadowEnemy position={[-5, 3, -5]} boundsPosition={[0, 1, 35]} boundsArgs={[7.9, 1, 20]} rotation={[0, 1, 0]} />
                            <Tentacle position={[10, 0, 5]} />
                            <Tentacle position={[5, 0, -5]} />

                        </Physics>
                    </Suspense>
                </Canvas>

                <GameUI />
            </div>
        </GameContextProvider>

    )

}

export default Level3;
