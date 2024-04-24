import { Sparkles } from "@react-three/drei";


export default function Sparkle({ Position }) {


    return (
        <Sparkles
            color={"white"}
            count={5}
            size={10}
            scale={1}
            position={Position}
        />
    )
}