import Map1 from "./world/Map1";
import MapEnvironments from "./environments/MapEnvironments";
import Lights from "./lights/Lights";
import { BakeShadows, OrbitControls } from "@react-three/drei";
import { Perf } from 'r3f-perf';
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";


const Level1 = () => {
        
    return (
        <Canvas shadows={true}>
            <Perf position="top-left" />
            <BakeShadows />
            <OrbitControls makeDefault />
            <Suspense fallback={null}>
                <Lights />
                <MapEnvironments />
                <Physics>
                        <Map1 />
                </Physics>
            </Suspense>
        </Canvas>
    ) 
}

export default Level1;