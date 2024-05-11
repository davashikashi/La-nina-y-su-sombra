import { Text, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useGameContext } from "../../context/GameContext";

export default function Lamp(props) {
    const { nodes, materials } = useGLTF('/assets/models/sword/sword.glb');
    const [isVisible, setIsVisible] = useState(false);
    const { isTakingLamp, setIsTakingLamp } = useGameContext(); // Para saber si la espada está recogida o no
    const { actualObject, setActualObject } = useGameContext()
    const { isTakingSword, setIsTakingSword } = useGameContext(); 
    const [isDead, setIsDead] = useState(false);

    const handlePointerEnter = () => {
        setIsVisible(true); // Cuando el puntero entra, muestra el texto
    };

    const handlePointerLeave = () => {
        setIsVisible(false); // Cuando el puntero sale, oculta el texto
    };

    const handleOnClick = () => {
        setIsTakingLamp(true) // Cuando se hace click, se recoge la espada
        setActualObject("lamp")
        setIsDead(true)

    }

    if (isDead) {
        return null
    }

    return (
        <>
            <mesh
                castShadow
                receiveShadow
                rotation={[0,0,0]}
                position={props.position}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onClick={handleOnClick}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshBasicMaterial color="green" />

            </mesh>

            <Text
                visible={isVisible}
                font="/assets/fonts/Young Man.otf"
                position={props.position}
                color={"white"}
                fontSize={0.5}
                maxWidth={5} // Ancho máximo del texto
                lineHeight={1} // Espaciado entre líneas
                letterSpacing={0.02} // Espaciado entre caracteres
            >
                Click para recoger la espada
            </Text>

        </>
    );
}
