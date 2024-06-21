import { useGLTF, useTexture } from "@react-three/drei"
import { RigidBody, vec3 } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import { RepeatWrapping, Vector3 } from "three"
import { useGameContext } from "../../context/GameContext"
import morir from "../../Sounds/morirEnemigo.mp3"
import { useFrame } from "@react-three/fiber"
import { socket } from "../../socket/socket-manager"; // Importa el socket

export default function Box(props) {

    const { nodes } = useGLTF("/assets/models/Box/Box.glb")
    const cajaBodyRef = useRef()
    const { addCaja } = useGameContext()


    const TexturePath = "/assets/textures/crate/"

    const propsBoxTexture = useTexture({
        map: TexturePath + "Cratebpr_diffuseOriginal.jpg",
        normalMap: TexturePath + "Cratebpr_normal.jpg",
        roughnessMap: TexturePath + "Cratebpr_smoothness.jpg",
        diplacementMap: TexturePath + "Cratebpr_height.jpg"
    })

    //se hace el tiling de las texturas
    propsBoxTexture.map.repeat.set(1, 1);
    propsBoxTexture.map.wrapS = propsBoxTexture.map.wrapT = RepeatWrapping;

    propsBoxTexture.normalMap.repeat.set(1, 1);
    propsBoxTexture.normalMap.wrapS = propsBoxTexture.normalMap.wrapT = RepeatWrapping;

    propsBoxTexture.roughnessMap.repeat.set(1, 1);
    propsBoxTexture.roughnessMap.wrapS = propsBoxTexture.roughnessMap.wrapT = RepeatWrapping;

    propsBoxTexture.diplacementMap.repeat.set(1, 1);
    propsBoxTexture.diplacementMap.wrapS = propsBoxTexture.diplacementMap.wrapT = RepeatWrapping;

    useEffect(() => {
        addCaja(props.id, cajaBodyRef.current);
    }, [addCaja, props.id]);

    // Escucha actualizaciones desde el servidor
    useEffect(() => {
        const handleUpdatePosition = (data) => {
            if (data.id === props.id) {
                const newPosition = new Vector3().fromArray(data.position);
                cajaBodyRef.current?.setTranslation(newPosition, true);
            }
        };

        socket.on("updateBoxPosition", handleUpdatePosition);

        return () => {
            socket.off("updateBoxPosition", handleUpdatePosition);
        };
    }, [props.id]);

    // Envía las actualizaciones de posición al servidor cuando la caja se mueve
    const sendPositionUpdate = () => {
        if (cajaBodyRef.current) {
            const newPosition = cajaBodyRef.current.translation();
            socket.emit("updateBoxPosition", { id: props.id, position: newPosition.toArray() });
        }
    };


    return (
        <RigidBody
            ref={cajaBodyRef}
            name="rigid caja"
            type="dynamic"
            colliders="cuboid"
            density={0.5}
            linearDamping={0.1}
            angularDamping={0.1}
            position={props.position}
            enabledRotations={[false, false, false]}
            enabledTranslations={props.movement ? [true,true,false] : [false,true,true]}
            angularFactor={[0, 0, 0]}
        >
            <group>
                <mesh castShadow={true} geometry={nodes.Box.geometry}  >
                    <meshStandardMaterial {...propsBoxTexture} />
                </mesh>
            </group>

        </RigidBody>


    )
}

useGLTF.preload('/Box.glb')