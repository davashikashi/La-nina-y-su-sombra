import { useHelper } from "@react-three/drei"
import { useRef } from "react"
import { PointLightHelper } from "three"


export default function Lights() {
    const pointLightRef = useRef(null)
    useHelper(pointLightRef, PointLightHelper)

    return (
        <>
            <ambientLight color={"white"} intensity={0.5} />
            {/* <directionalLight color={"black"} position={[0, 10, 0]} intensity={1} /> */}
            <pointLight
                //ref={pointLightRef}
                castShadow={true}
                position={[-2.5, 2, 47]}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
                ref={pointLightRef}
                castShadow={true}
                position={[2.5, 2, 47]}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight 
                position={[16, 2, 38]}
                castShadow={true}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight 
                position={[6, 2, 38]}
                castShadow={true}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight 
                position={[16, 2, 49]}
                castShadow={true}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight 
                position={[-2, 2, 34]}
                castShadow={true}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight 
                position={[0, 2, 40]}
                castShadow={true}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
        </>

    )
}