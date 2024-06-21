import { useHelper } from "@react-three/drei"
import { useRef } from "react"
import { PointLightHelper } from "three"


export default function Lights4() {
    const pointLightRef = useRef(null)
    useHelper(pointLightRef, PointLightHelper)

    return (
        <>
            <ambientLight color={"white"} intensity={0.5} />
            {/* <directionalLight color={"black"} position={[0, 10, 0]} intensity={1} /> */}
            <pointLight
                //ref={pointLightRef}
                castShadow={false}
                position={[-2.5, 2, 47]}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight

                castShadow={false}
                position={[2.5, 2, 47]}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
                position={[16, 2, 38]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
                position={[6, 2, 38]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
                position={[16, 2, 49]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
                position={[-2, 2, 34]}
                castShadow={false}
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
            <pointLight
                position={[10.5, 2, 43.5]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight

                position={[3, 2, 18]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />

            <pointLight
                
                position={[-3, 2, 18]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
                //ref={pointLightRef}
                position={[0, 2, 25]}
                castShadow={true}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
               
                position={[6, 2, 33]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
               
                position={[14, 2, 33]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
               
                position={[6, 2, 20]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
               
                position={[14, 2, 20]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
                
                position={[-10, 2, 28]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={8}
                decay={2}
            />
            <pointLight
               
                position={[0, 2, 0]}
                castShadow={false}
                intensity={15}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
               
                position={[-15, 2, -5]}
                castShadow={false}
                intensity={30}
                color={"White"}
                distance={100}
                decay={2}
            />
            <pointLight
               
                position={[15, 2, 0]}
                castShadow={false}
                intensity={30}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
               
                position={[10, 2, 8]}
                castShadow={false}
                intensity={30}
                color={"White"}
                distance={10}
                decay={2}
            />
            <pointLight
               
                position={[-5, 3, -12]}
                castShadow={false}
                intensity={30}
                color={"White"}
                distance={20}
                decay={2}
            />
            <pointLight
               
                position={[10, 3, -12]}
                castShadow={false}
                intensity={30}
                color={"White"}
                distance={20}
                decay={2}
            />

        </>

    )
}