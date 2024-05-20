import { useEffect, useState } from "react"
import { useGameContext } from "../../context/GameContext"


const Door = ({ palancasRequeridas, placasPresionRequeridas ,position }) => {

    const { palancas, placasPresion } = useGameContext();

    // Función para determinar si la puerta está abierta o cerrada
    const isPuertaAbierta = () => {
        // Verificar si todas las palancas requeridas están activadas
        // for (const palancaId of palancasRequeridas) {
        //     if (!palancas[palancaId]) {
        //         return false;
        //     }
        // }

        // Verificar si todas las placas de presión requeridas están activadas
        for (const placaPresionId of placasPresionRequeridas) {
            if (!placasPresion[placaPresionId]) {
                return false;
            }
        }

        return true;
    };

    return (
        <mesh position={position}>
            <boxGeometry args={[3, 4, 1]} />
            <meshStandardMaterial attach="material" color={isPuertaAbierta() ? "green" : "red"} />
        </mesh>
    )
}

export default Door