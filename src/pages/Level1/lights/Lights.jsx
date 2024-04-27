import { Color, Light } from "three";
const Lights = () => {

    return<>
        <ambientLight 
            color={new Color("#154360")} 
            intensity={3.5} 
        />
        <directionalLight
            castShadow={true} 
            position={[2, 10, 0]}
            color={new Color("154360")}
            intensity={0.5}
        />
        <pointLight
            castShadow={true}
            position={[-6, 2, -29]}
            color={new Color("#154360")}
            intensity={1000}
        />
        {/* <hemisphereLight
            position={[2, 40, -2]}
            skyColor={new Color("#154360")}
            groundColor={new Color("#154360")}
            intensity={0.3}
        /> */}
    </>
}

export default Lights;