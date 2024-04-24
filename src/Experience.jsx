import { OrbitControls } from "@react-three/drei";
import Map1 from "./world/Map1";

const Experience = () => {

    return (
        <>
            <ambientLight />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls makeDefault />
            <Map1 />
        </>
    )

}

export default Experience;