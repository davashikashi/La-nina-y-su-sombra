import { Environment } from "@react-three/drei";
import Sparkle from "../Sparkles/Sparkle";



export default function Environments() {

    return (
        <>
            <Environment
                preset={null}
                background={true}
                files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
                path="/assets/cubemaps/night/"
            />
            <Sparkle Position={[3, 0.3, 24]} />
            <Sparkle Position={[-8, 0.3, 42]} />
            <Sparkle Position={[-16, 2, 38]} />
            <Sparkle Position={[-11, 1, 42]} />
        </>
    )
}