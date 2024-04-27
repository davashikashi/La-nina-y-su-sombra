import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { Suspense } from "react"
import Darkworld from "./leveldark/Leveldark"
import { OrbitControls } from "@react-three/drei"

const Level2 = () => {

    return (
        <Canvas>
            <Suspense>
                <Perf position="top-left" />
                <OrbitControls makeDefault />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <Darkworld />
            </Suspense>
        </Canvas>
    )
}

export default Level2;