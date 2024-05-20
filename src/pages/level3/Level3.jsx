
import World from "./world/World";
import Environments from "./Environment/Environments";
import Lights from "./Lights/Lights";
import Texts from "./Text/Texts";
import Box from "../../Objects/Box/Box";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Boar from "../../characters/Boar/Boar";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Flower from "../../Objects/Flower/Flower";
import Fire from "../../characters/fire/fire";
import Avatar from "../../characters/avatar/Avatar";
import Sword from "../../Objects/sword/sword";
import { GameContextProvider } from "../../context/GameContext";
import { OrbitControls } from "@react-three/drei";
import Lamp from "../../Objects/Lamp/Lamp";
import shadowAvatar from "../../characters/shadowAvatar/shadowAvatar";
import ShadowAvatar from "../../characters/shadowAvatar/shadowAvatar";




const Level3 = () => {

    //level3 será el director de orquesta entre componentes



    return (

        <Canvas shadows={true} camera={{ position: [0, 20, 49] }} >
            <Perf position="top-left" />
            <Suspense fallback={null}>
                <Lights />
                <Environments />
                <Texts Position={[0, 7, 40]} Textto={"Reto Final"} color={"white"} />
                <GameContextProvider>
                    <Physics debug={true} timeStep="vary">
                        <Box position={[0, 1, 4]} />
                        <Box position={[0, 1, 6]} />
                        <Box position={[4, 2.5, -7]} />
                        <Box position={[-7.5, 2.5, -6]} />
                        <Box position={[-7.5, 2.5, 19.5]} />
                        <Box position={[0, 2, 12]} />
                        <Boar avatarReference={avatarRef} position={[-5, 2.5, 6]} />
                        <Boar avatarReference={avatarRef} position={[5, 2.5, 10]} />
                        <Boar avatarReference={avatarRef} position={[5.5, 2.5, 48.5]} />
                        <Flower position={[0, 1, 40]} />
                        <Flower position={[0, 1, 30]} />
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
                        <ShadowAvatar avatarPosition={[0,10,0]}/>
                        <World />
                    </Physics>

                </GameContextProvider>

            </Suspense>
        </Canvas>

    )

}

export default Level3;

{/* <Box position={[0, 1, 6]} />
                    <Box position={[4, 2.5, -7]} />
                    <Box position={[-7.5, 2.5, -6]} />
                    <Box position={[-7.5, 2.5, 19.5]} />
                    <Box position={[0, 2, 12]} />
                    <Boar position={[-5, 10, 6]} />
                    <Boar position={[5, 2.5, 10]} />
                    <Boar position={[5.5, 2.5, 48.5]} />
                    <Flower position={[0, 1, 40]} />
                    <Flower position={[0, 1, 30]} />
                    <Flower position={[0, 1, 35]} />
                    <Flower position={[5, 1, 25]} />
                    <Flower position={[-5, 1, 25]} />
                    <Flower position={[5, 1, 48]} />
                    <Flower position={[-5, 1, 48]} />
                    <Flower position={[-10, 1, 48]} />
                    <Flower position={[-10, 1, 0]} />
                    <Flower position={[0, 1, 10]} />
                    <Flower position={[8, 1, 10]} />
                    <Fire position={[-12, 1, -2]} />
                    <Fire position={[-12, 1, 28]} />
                    <Fire position={[10, 1, 20]} />
                    <Fire position={[10, 1, 35]} /> */}