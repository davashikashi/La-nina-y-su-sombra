import { Color, Light } from "three";
const Lights = () => {

    return<>
        <ambientLight 
            color={new Color("#154360")} 
            intensity={.5} 
        />
        {/* <directionalLight
            castShadow={true} 
            position={[0, 2, 0]}
            color={new Color("#154360")}
            intensity={0.2}
        /> */}
        <pointLight
            castShadow={true}
            position={[32, 4, -6.8]}
            rotation={[0, 1.5, 0]}
            color={new Color("#ff7700")}
            intensity={100}
        />
    </>
}

export default Lights;