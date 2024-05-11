import { Text } from "@react-three/drei";
import { useRef, useState } from "react";

export default function Texts(props) {
    const TextRef = useRef()

    return (
        <Text ref={TextRef} font="/assets/fonts/Young Man.otf" color={props.color}
         position={props.Position} rotation={props.rotation} fontSize={props.fontSize}>
            {props.Textto}
        </Text>
    )


}