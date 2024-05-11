import { Color, Light } from "three";
const Lights = () => {

    return<>
        <ambientLight 
            color={new Color("#154360")} 
            intensity={3.5} 
        />
        <directionalLight
            castShadow={true} 
            position={[0, 2, 0]}
            color={new Color("#154360")}
            intensity={0.2}
        />
        <pointLight
            castShadow={false}
            position={[-6.8, 4, 0]}
            color={new Color("#ff7700")}
            intensity={100}
        />

        <pointLight
            castShadow={false}
            position={[-6.8, 4, -12]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[6.8, 4, -5]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-6.8, 4, 68]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[6.8, 4, 78]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-6.8, 4, 88]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-34.8, 3.8, -27,18]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-23, 3.8, -11]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={true}
            position={[12.95, 3.8, -39]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[0, 4.8, -47]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={true}
            position={[-13.3, 3.8, -36]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-9, 3.8, -58.75]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-25, 3.8, -61.3]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-35.3, 3.8, -83]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[-15, 3.8, -85.3]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[4, 3.8, -66.7]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[18, 3.8, -66.7]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[3, 4.8, -89.3]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[31, 3.8, -85.3]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[31.3, 3.8, -65]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[16, 3.8, -0.7]}
            color={new Color("#ff7700")}
            intensity={100}
        />
        <pointLight
            castShadow={false}
            position={[23.3, 3.8, -11.5]}
            color={new Color("#ff7700")}
            intensity={100}
        />
    </>
}

export default Lights;