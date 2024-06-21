import { Environment } from "@react-three/drei";




export default function Environment4() {

    return (
        <>
            <Environment
                preset={null}
                background={true}
                files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
                path="/assets/cubemaps/night/"
            />
        </>
    )
}