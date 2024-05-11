import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { pass } from "three/examples/jsm/nodes/Nodes.js";
import { GameContextProvider, useGameContext } from "../../context/GameContext";
import { Euler, Quaternion, Vector3 } from "three";


// Componente para la espada en la mano del personaje
const LampHand = forwardRef((props, ref) => {

    const { nodes, materials } = useGLTF('/assets/models/sword/sword.glb')
    const { isTakingLamp, setIsTakingLamp } = useGameContext(true)
    const { isTakingSword, setIsTakingSword } = useGameContext(false)
    // console.log(props.isAttacking)

    const lampRef = useRef()
    const lampModelRef = useRef()


    const swordOffset = new Vector3(0.2, -0.1, -0.1)
    const rotationOffset = new Quaternion().setFromEuler(
        new Euler(0, 0, 0) // Rotación para levantar la espada
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.toLowerCase() === "e") {
                setIsTakingSword(false);
                setIsTakingLamp(true); // La lámpara está siendo tomada

                console.log("lamp lamp", isTakingLamp)
                console.log("lamp sword", isTakingSword)
                // Asegúrate de desactivar la espada

            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setIsTakingLamp]);


    useEffect(() => {
        if (props.leftHandBone && lampModelRef.current) {
            if (isTakingSword) {

                props.leftHandBone.remove(lampModelRef.current);
                console.log("lamp se quita")
            } else {
                props.leftHandBone.add(lampModelRef.current);
                console.log("lamp se añade")
            }
        }
    }, [isTakingSword]);

    // useEffect(() => {
    //     if (lampModelRef.current) {
    //         lampModelRef.current.scale.set(isTakingLamp ? 10 : 0, isTakingLamp ? 10 : 0, isTakingLamp ? 10 : 0);
    //     }
    // }, [lampModelRef.current, isTakingLamp]);

    useFrame(() => {

        if (isTakingLamp) {

            if (lampRef.current) {
                // Obtén la posición y rotación del rightHandBone
                const worldPosition = props.leftHandBone.getWorldPosition(new Vector3());
                const worldQuaternion = props.leftHandBone.getWorldQuaternion(new Quaternion());

                const realtivePosition = swordOffset.clone().applyQuaternion(worldQuaternion)

                // Ajusta la posición y rotación del rigidbody del HandSword
                const adjustedPosition = new Vector3(
                    worldPosition.x + realtivePosition.x,
                    worldPosition.y + realtivePosition.y,
                    worldPosition.z + realtivePosition.z
                )

                lampRef.current.setTranslation({
                    x: adjustedPosition.x,
                    y: adjustedPosition.y,
                    z: adjustedPosition.z
                });

                const adjustedRotation = worldQuaternion.clone().multiply(rotationOffset);

                lampRef.current.setRotation({
                    x: adjustedRotation.x,
                    y: adjustedRotation.y,
                    z: adjustedRotation.z,
                    w: adjustedRotation.w,
                });

            }
        }
    })


    return (
        <>
            {
                isTakingLamp && (
                    <RigidBody
                        name="lampara"
                        gravityScale={0}
                        ref={lampRef}
                        type="kinematicPositionBased"
                        colliders={"cuboid"}
                        sensor={true}
                    >
                        <group {...props} dispose={null}>
                            <mesh
                                visible={true}
                                ref={lampModelRef}
                                rotation={[0, 0, 0]}
                                position={[20, 10, 0]}
                                scale={[10, 15, 10]}
                            >
                                <boxGeometry args={[1, 1, 1]} />
                                <meshBasicMaterial color="red" />

                            </mesh>
                        </group>
                    </RigidBody>
                )
            }
        </>

    );
})

export default LampHand;