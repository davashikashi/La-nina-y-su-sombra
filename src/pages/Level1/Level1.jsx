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
import { useRef } from "react";


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
                <Physics debug={true} timestep="vary">
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
                        <Boar position={[-5, 1, -31]}/>
                        <ShadowEnemy position={[-5, 3, 41]} avatarReference={avatarRef}/>
                        <ShadowEnemy position={[15, 3, 40]} avatarReference={avatarRef}/>
                        <Map1 />
                </Physics>
            </Suspense>
        </Canvas>
    ) 
}

export default Level1;