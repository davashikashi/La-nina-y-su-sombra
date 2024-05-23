import { Color, Light } from "three";
const Lights = () => {

    return<>
        <ambientLight 
            color={new Color("#154360")} 
            intensity={10} 
        />
        {/* <directionalLight
            castShadow={true} 
            position={[0, 2, 0]}
            color={new Color("#154360")}
            intensity={2}
        /> */}
        <pointLight
            castShadow={true}
            position={[15.8, 2.8, -3]}
            rotation={[0, 1.5, 0]}
            color={new Color("#ff7700")}
            intensity={80}
        />
    </>
}

export default Lights;