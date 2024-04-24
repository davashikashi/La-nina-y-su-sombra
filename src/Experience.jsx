import { OrbitControls, Text3D } from "@react-three/drei";
import World from "./world/World";
import Environments from "./Environment/Environments";
import Lights from "./Lights/Lights";
import Texts from "./Text/Texts";
import Box from "./Box/Box";



const Experience = () => {

    return (
        <>
            <OrbitControls target={[0, 2, 42]} />
            <Lights />
            <Environments />
            <Texts Position={[0, 5, 40]} Textto={"Reto Final"} color={"white"} />
            <Texts Position={[0, 5, 35]} Textto={"segundo Reto Final"} color={"red"} />
            <World />
        </>
    )

}

export default Experience;