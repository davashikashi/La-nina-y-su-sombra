import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameContext } from "../../context/GameContext";
import { Vector3, Quaternion, Object3D } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export default function Tentacle(props) {
    const bodyRefCollider = useRef();
    const tentacleModel = useRef();
    const headRef = useRef();
    const { scene, materials, animations } = useGLTF("/assets/models/tentacle/tentacle.glb");
    const [move, setMove] = useState(false);
    const [inArea, setInArea] = useState(false);
    const [attacking, setAttacking] = useState(false); // Nuevo estado para controlar si el tentáculo está atacando
    const { avatar } = useGameContext();

    // Clonar la escena para evitar modificar la original
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);

    // Configurar animaciones
    const { actions } = useAnimations(animations, tentacleModel.current);

    const mid = nodes.Mid;
    const chest = nodes.Chest;
    const midoffset = new Vector3(0, 0, 0); // Define el midoffset aquí
    const chestoffset = new Vector3(0, 0.7, 0); // Define el midoffset aquí



    if (!inArea && tentacleModel.current && actions["Idle.002"]) {
        actions["Idle.002"].play();
    }


    const startAttackAnimation = () => {

        if (tentacleModel.current && actions["Attack.001"] && actions["Idle.002"]) {
            actions["Idle.002"].stop();
            actions["Attack.001"].reset().play();
            setTimeout(() => { // Establecer attacking en false después de x tiempo
                setMove(false)
            }, 950);
            setTimeout(() => {
                setAttacking(false); // Establecer attacking en false después de x tiempo
            }, 2500);
        }


    };

    const stopAttackAnimation = () => {

        if (tentacleModel.current && actions["Attack.001"] && actions["Idle.002"]) {
            setMove(true)
            actions["Attack.001"].stop();
            actions["Idle.002"].reset().play();
            // Establecer attacking en false cuando termina la animación de ataque
            setTimeout(() => { // Establecer attacking en false después de x tiempods 
                setAttacking(true)
            }, 1000);

        }
    };


    useEffect(() => {
        if (inArea) {
            if (attacking) {
                startAttackAnimation();
            } else {
                stopAttackAnimation();
            }
        } else if (actions["Idle.002"] && actions["Attack.001"]) {
            console.log(actions)
            actions["Attack.001"].stop();
            actions["Idle.002"].play()
        }
    }, [attacking, inArea])


    const handleIntersection = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            console.log("jugador entra area");
            setMove(true);
            setAttacking(true);
            setInArea(true);
        }
    };

    const handleIntersectionExit = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            console.log("jugador sale area");
            setMove(false);
            setAttacking(false);
            setInArea(false);
        }
    };

    useFrame(() => {
        if (mid && bodyRefCollider.current && avatar) {
            // Obtener la posición y rotación del hueso 'mid'
            const midPosition = mid.getWorldPosition(new Vector3());
            const midQuaternion = mid.getWorldQuaternion(new Quaternion());
            const headPosition = chest.getWorldPosition(new Vector3());
            const headQuaternion = chest.getWorldQuaternion(new Quaternion());

            // Aplicar el midoffset a la posición del hueso
            const offsetPosition = midPosition.add(midoffset.clone().applyQuaternion(midQuaternion));

            // Aplicar el midoffset a la posición del hueso
            const headoffsetPosition = headPosition.add(chestoffset.clone().applyQuaternion(headQuaternion));

            // Sincronizar la posición y rotación del collider con el hueso 'mid' y aplicar el midoffset
            bodyRefCollider.current.setTranslation(offsetPosition);
            bodyRefCollider.current.setRotation(midQuaternion);

            headRef.current.setTranslation(headoffsetPosition);
            headRef.current.setRotation(headQuaternion);

            if (move) { // Evitar la rotación mientras está atacando

                const currentPosition = mid.getWorldPosition(new Vector3());

                // Obtener la posición del avatar
                const avatarPosition = avatar.translation();

                // Calcular la dirección hacia la que debe mirar el tentáculo
                const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

                // Calcular la rotación necesaria en radianes
                const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);

                // Aplicar la rotación al modelo del tentáculo
                tentacleModel.current.rotation.y = targetRotationY;



            }
        }
    });


    return (
        <>
            <CuboidCollider
                onIntersectionExit={handleIntersectionExit}
                onIntersectionEnter={handleIntersection}
                position={props.position}
                sensor={true}
                args={[3, 2, 3]}
            />
            <group scale={[1, 0.7, 1]} ref={tentacleModel} name="Scene" position={props.position}>
                <group name="Armature">
                    <skinnedMesh
                        name="Tentacle"
                        geometry={nodes.Tentacle.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Tentacle.skeleton}
                    />
                    <primitive object={nodes.Base} />
                    <CuboidCollider name="tentaculoBody" ref={bodyRefCollider} args={[0.25, 1, 0.3]} />
                    <CuboidCollider name="tentaculoHead" sensor={true} ref={headRef} args={[0.2, 1, 0.4]} />
                </group>
            </group>
        </>
    );
}

// Precarga del modelo
useGLTF.preload("/assets/models/tentacle/tentacle.glb");
