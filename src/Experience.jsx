import { MeshBasicNodeMaterial } from "three/examples/jsm/nodes/Nodes.js";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Experience = () => {
    const boxRef = useRef(null);

    useFrame((state,delta) => {
        boxRef.current.rotation.x +=1*delta;
        boxRef.current.rotation.y +=1.5*delta;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <OrbitControls makeDefault/>
            
            <mesh ref={boxRef}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="purple" />
            </mesh>
        </>
    )

}

export default Experience;