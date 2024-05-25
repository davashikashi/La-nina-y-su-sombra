import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../context/GameContext"
import { RigidBody } from "@react-three/rapier";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import door from "../../Sounds/doorMove.mp3"


const Door = ({ palancasRequeridas, placasPresionRequeridas, position, rotation }) => {


    const TexturePath = "assets/textures/door/"
    const doorRotation = rotation || [0, 0, 0]

    // Cargar la textura
    const propsDoorTexture = useTexture({
        map: TexturePath + "wooden_garage_door_diff_1k.jpg",
        normalMap: TexturePath + "wooden_garage_door_nor_gl_1k.jpg",
        roughnessMap: TexturePath + "wooden_garage_door_rough_1k.jpg",
        diplacementMap: TexturePath + "wooden_garage_door_disp_1k.jpg"
    })

    const { palancas, placasPresion } = useGameContext();
    const rigidBodyRef = useRef();
    const initialPosition = useRef(new Vector3());
    const previousPosition = useRef(initialPosition.current.clone());
    const doorMove = useRef(new Audio(door));

    const isPuertaAbierta = () => {
        for (const placaPresionId of placasPresionRequeridas) {
            if (!placasPresion[placaPresionId]) {
                return false;
            }
        }
        return true;
    };

    useFrame(() => {
        if (rigidBodyRef.current) {
            const currentPosition = new Vector3().copy(
                rigidBodyRef.current.translation()
            );
            const targetPosition = initialPosition.current.clone();

            if (isPuertaAbierta() ? true : false) {
                targetPosition.y += 3;
            } else if (currentPosition.y > initialPosition.current.y) {
                targetPosition.y = initialPosition.current.y;
            }

            // Comprobar si la posición ha cambiado desde el frame anterior
            const positionChanged = !targetPosition.equals(previousPosition.current);

            // Reproducir el sonido solo si la posición ha cambiado
            if (positionChanged) {
                doorMove.current.volume = 0.5;
                doorMove.current.currentTime = 0; // Reiniciar la reproducción si ya está en curso
                doorMove.volume = 0.2;
                doorMove.current.play();
            }

            // Actualizar la posición del frame anterior
            previousPosition.current = targetPosition.clone();

            // Interpolación para un movimiento suave
            const newPosition = currentPosition.lerp(targetPosition, 0.05);
            rigidBodyRef.current.setTranslation(newPosition, true);
        }
    });

    useEffect(() => {
        // Limpiar el audio al desmontar el componente
        return () => {
            doorMove.current.pause();
            doorMove.current.currentTime = 0;
        };
    }, []);


    return (
        <RigidBody
            type="kinematicVelocityBased"
            gravityScale={0}
            lockRotations={true}
            lockTranslations={true}// Bloquear el movimiento lineal en el eje Z
            colliders={"cuboid"}
            ref={rigidBodyRef}
            rotation={doorRotation}
        >
            <mesh position={position}>
                <boxGeometry args={[3, 4, 0.3]} />
                <meshStandardMaterial {...propsDoorTexture} />
            </mesh>
        </RigidBody>
    )
}

export default Door