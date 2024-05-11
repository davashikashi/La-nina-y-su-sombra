import { Text, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useGameContext } from "../../context/GameContext";

export default function Sword(props) {
    const { nodes, materials } = useGLTF('/assets/models/sword/sword.glb');
    const [isVisible, setIsVisible] = useState(false);
    const { isTakingSword, setIsTakingSword } = useGameContext(); // Para saber si la espada está recogida o no
    const { actualObject, setActualObject } = useGameContext()
    const [isDead, setIsDead] = useState(false);

    const handlePointerEnter = () => {
        setIsVisible(true); // Cuando el puntero entra, muestra el texto
    };

    const handlePointerLeave = () => {
        setIsVisible(false); // Cuando el puntero sale, oculta el texto
    };

    const handleOnClick = () => {
        setIsTakingSword(true)
      //  setIsTakingLamp(false) // Cuando se hace click, se recoge la espada
        setActualObject('sword') // Se cambia el objeto actual a la espada
        setIsDead(true) // Cuando
    }

    if (isDead) {
        return null
    }

    return (
        <>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sword.geometry}
                material={materials['Material.001']}
                rotation={[80, 90, 0]}
                position={props.position}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onClick={handleOnClick}
            />

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
