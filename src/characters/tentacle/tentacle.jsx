import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { ConvexHullCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { useGameContext } from "../../context/GameContext";
import { Vector3 } from "three";


export default function Tentacle(props) {
    const tentacleRigid = useRef();
    const tentacleModel = useRef();
    const { scene, materials, animations } = useGLTF("/assets/models/tentacle/tentacle.glb");
    const [attack, setAttack] = useState(false);
    const { avatar } = useGameContext();

    // Clonar la escena para evitar modificar la original
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);

    // Configurar animaciones
    const { actions } = useAnimations(animations, tentacleModel);





    useEffect(() => {
        if (attack && avatar && tentacleRigid) {
            // Obtener la posición del avatar y del tentáculo
            const avatarPosition = avatar.translation();
            const tentaclePosition = tentacleRigid.current.translation();

            

            // Detener la animación Idle y reproducir la animación de ataque
            actions["Idle.002"].stop();
            actions["Attack.001"].play();
        } else {
            // Si attack es false, detener la animación de ataque y reproducir la animación Idle
            actions["Attack.001"].stop();
            actions["Idle.002"].play();
        }
    }, [attack, avatar, tentacleRigid?.current]);




    const handleIntersection = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            console.log("jugador entra area")
            setAttack(true)

        }
    }
    const handleIntersectionExit = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            console.log("jugador sale area")
            setAttack(false)

        }
    }

    useEffect(() => {
        console.log(attack)
    }, [attack])



    return (
        <>
            <CuboidCollider onIntersectionExit={handleIntersectionExit} onIntersectionEnter={handleIntersection} sensor={true} args={[3, 2, 3]} />
            <RigidBody
                ref={tentacleRigid}
                colliders={"hull"}
                type="KinematicVelocityBased"
                position={props.position}
                lockRotations={[true, false, true]}
                scale={[1, 1, 1]} // Mantén la escala del RigidBody constante
            >

                <group ref={tentacleModel} name="Scene">
                    <group name="Armature">
                        <skinnedMesh
                            name="Tentacle"
                            geometry={nodes.Tentacle.geometry}
                            material={materials['Material.001']}
                            skeleton={nodes.Tentacle.skeleton}
                        />
                        <primitive object={nodes.Bone} />
                    </group>
                </group>


            </RigidBody>
        </>

    );
}

// Precarga del modelo
useGLTF.preload("/assets/models/tentacle/tentacle.glb");
