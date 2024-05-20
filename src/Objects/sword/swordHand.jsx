import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { pass } from "three/examples/jsm/nodes/Nodes.js";
import { GameContextProvider, useGameContext } from "../../context/GameContext";
import { Euler, Quaternion, Vector3 } from "three";


// Componente para la espada en la mano del personaje
const HandSword = forwardRef((props, ref) => {

    const { nodes, materials } = useGLTF('/assets/models/sword/sword.glb')

    const { isTakingLamp, setIsTakingLamp } = useGameContext(false)
    const { isTakingSword, setIsTakingSword } = useGameContext(true)
   

    const enemigos = ["Boar", "Fuego", "rigid caja"]

    const swordRef = useRef()
    const swordModelRef = useRef()

    const { setIsAttacking } = useGameContext();

    //offset posicion y rotacion
    const swordOffset = new Vector3(0.2, -0.1, -0.1)
    const rotationOffset = new Quaternion().setFromEuler(
        new Euler(0, 0, 0) // Rotación para levantar la espada
    );

    // console.log(props.isAttacking)

    const handleCollisionEnter = (event) => {
        if (props.isCollisionDisable && isTakingSword) {
            console.log("taking ", isTakingSword)
            if (enemigos.includes(event.colliderObject.name)) {
                //console.log("Evento de colisión:", event.colliderObject.name);
                // console.log("Objeto colisionado:", event.colliderObject);

                setIsAttacking(true)
            } else {

                setIsAttacking(false)
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.toLowerCase() === "q") {
                setIsTakingLamp(false);
                setIsTakingSword(true); // La espada está siendo tomada
                // Asegúrate de desactivar la lámpara
                console.log("sword lamp", isTakingLamp)
                console.log("sword sword", isTakingSword)

            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setIsTakingSword]);






    useEffect(() => {

        if (props.rightHandBone && swordModelRef.current) {
            if (isTakingLamp) {

                props.rightHandBone.remove(swordModelRef.current);
                console.log("sword se quita")
            } else {
                props.rightHandBone.add(swordModelRef.current);
                console.log("sword se añade")
            }
        }

    }, [isTakingLamp]);

    useFrame(() => {
        if (isTakingSword) {
            if (swordRef.current) {
                // Obtén la posición y rotación del props.props.rightHandBone
                const worldPosition = props.rightHandBone.getWorldPosition(new Vector3());
                const worldQuaternion = props.rightHandBone.getWorldQuaternion(new Quaternion());

                const realtivePosition = swordOffset.clone().applyQuaternion(worldQuaternion)

                // Ajusta la posición y rotación del rigidbody del HandSword
                const adjustedPosition = new Vector3(
                    worldPosition.x + realtivePosition.x,
                    worldPosition.y + realtivePosition.y,
                    worldPosition.z + realtivePosition.z
                )

                swordRef.current.setTranslation({
                    x: adjustedPosition.x,
                    y: adjustedPosition.y,
                    z: adjustedPosition.z
                });

                const adjustedRotation = worldQuaternion.clone().multiply(rotationOffset);

                swordRef.current.setRotation({
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
                isTakingSword && (
                    <RigidBody
                        name="espada"
                        gravityScale={0}
                        ref={swordRef}
                        type="kinematicPositionBased"
                        colliders={"cuboid"}
                        sensor={true}
                        onIntersectionEnter={handleCollisionEnter}

                    >
                        <group {...props} dispose={null}>
                            <mesh
                                visible={isTakingSword}
                                ref={swordModelRef}
                                geometry={nodes.Sword.geometry}
                                material={materials['Material.001']}
                                rotation={[30, 0, 149.5]}
                                position={[20, 10, 0]}
                                scale={[100, 150, 100]}
                            />
                        </group>
                    </RigidBody>
                )
            }
        </>

    );
})

export default HandSword;