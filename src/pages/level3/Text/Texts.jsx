import { Text } from "@react-three/drei";
import { useRef, useState } from "react";

export default function Texts(props) {
    const TextRef = useRef()

    const randomColor = () => {
        // Generar un color aleatorio
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };

    const handleClick = (event) => {
        console.log(event)
        // Actualizar el estado del color al hacer clic
        console.log("color",event.object.color)
        event.stopPropagation()
        event.object.material.color.set(randomColor())
    };

    return (
        <Text ref={TextRef} rotateY={props.rotateY} visible={props.visible} onClick={(event) => handleClick(event)} font="/assets/fonts/Young Man.otf" color={props.color} position={props.Position}>
            {props.Textto}
        </Text>
    )


}