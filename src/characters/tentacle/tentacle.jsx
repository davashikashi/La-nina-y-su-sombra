import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameContext } from "../../context/GameContext";
import { Vector3, Quaternion, Object3D } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import hit from "../../Sounds/hit.mp3";
import morir from "../../Sounds/morirEnemigo.mp3";

export default function Tentacle(props) {
    const bodyRefCollider = useRef();
    const tentacleModel = useRef();
    const headRef = useRef();
    const { scene, materials, animations } = useGLTF("/assets/models/tentacle/tentacle.glb");
    const [move, setMove] = useState(false);
    const [inArea, setInArea] = useState(false);
    const [attacking, setAttacking] = useState(false);
    const { shadowAvatar, isAttacking, setIsAttacking } = useGameContext();
    const [referencesExist, setReferencesExist] = useState(true);

    // Clonar la escena para evitar modificar la original
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);

    // Configurar animaciones
    const { actions } = useAnimations(animations, tentacleModel.current);

    const mid = nodes.Mid;
    const chest = nodes.Chest;
    const midoffset = new Vector3(0, 0, 0);
    const chestoffset = new Vector3(0, 0.7, 0);

    const dañoDe = ["puñocollider"];
    const [visible, setVisible] = useState(true);
    const health = useRef(3);

    const Hit = new Audio(hit);
    const dead = new Audio(morir);


    const startAttackAnimation = () => {
        if (tentacleModel.current && actions["Attack.001"] && actions["Idle.002"]) {
            actions["Idle.002"].stop();
            actions["Attack.001"].reset().play();
            setTimeout(() => {
                setMove(false);
            }, 950);
            setTimeout(() => {
                setAttacking(false);
            }, 2500);
        }
    };

    const stopAttackAnimation = () => {
        if (tentacleModel.current && actions["Attack.001"] && actions["Idle.002"]) {
            setMove(true);
            actions["Attack.001"].stop();
            actions["Idle.002"].reset().play();
            setTimeout(() => {
                setAttacking(true);
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
            actions["Attack.001"].stop();
            actions["Idle.002"].play();
        }
    }, [attacking, inArea, actions]);

    const handleIntersection = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            setMove(true);
            setAttacking(true);
            setInArea(true);
        }
    };

    const handleIntersectionExit = (event) => {
        if (event.colliderObject.name === "character-capsule-collider") {
            setMove(false);
            setAttacking(false);
            setInArea(false);
        }
    };

    useFrame(() => {
        if (mid && referencesExist &&bodyRefCollider.current && shadowAvatar) {
            const midPosition = mid.getWorldPosition(new Vector3());
            const midQuaternion = mid.getWorldQuaternion(new Quaternion());
            const headPosition = chest.getWorldPosition(new Vector3());
            const headQuaternion = chest.getWorldQuaternion(new Quaternion());

            const offsetPosition = midPosition.add(midoffset.clone().applyQuaternion(midQuaternion));
            const headoffsetPosition = headPosition.add(chestoffset.clone().applyQuaternion(headQuaternion));

            bodyRefCollider.current.setTranslation(offsetPosition);
            bodyRefCollider.current.setRotation(midQuaternion);

            headRef.current.setTranslation(headoffsetPosition);
            headRef.current.setRotation(headQuaternion);

            if (move) {
                const currentPosition = mid.getWorldPosition(new Vector3());
                const avatarPosition = shadowAvatar.translation();
                const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
                const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);
                tentacleModel.current.rotation.y = targetRotationY;
            }
        }
    });

    const handleHit = (event) => {
        if (isAttacking && dañoDe.includes(event.colliderObject.name)) {
            Hit.volume = 0.3;
            Hit.play();
            setIsAttacking(false);
            health.current = Math.max(health.current - 1, 0);
        }
    };

    useEffect(() => {
        if (health.current <= 0) {
            dead.volume = 0.4;
            dead.play();
            setReferencesExist(false);
            setVisible(false);
        }
    }, [health.current]);


    return (
        <>
            {visible && (
                <>

                    <group scale={[1, 0.7, 1]} ref={tentacleModel} name="Scene" position={props.position}>
                        <group name="Armature">
                            <skinnedMesh
                                name="Tentacle"
                                geometry={nodes.Tentacle.geometry}
                                material={materials['Material.001']}
                                skeleton={nodes.Tentacle.skeleton}
                            />
                            <primitive object={nodes.Base} />
                            <RigidBody ref={bodyRefCollider} type="KinematicPositionBased" lockRotations={true} lockTranslations={true} gravityScale={0} colliders={false}>
                                <CuboidCollider name="tentaculoBody" onIntersectionEnter={handleHit} args={[0.25, 1, 0.3]} />
                            </RigidBody>
                            <RigidBody ref={headRef} type="KinematicPositionBased" sensor={true} lockRotations={true} lockTranslations={true} gravityScale={0} colliders={false}>
                                <CuboidCollider name="tentaculoHead" args={[0.2, 1, 0.4]} />
                            </RigidBody>
                            <RigidBody position={[0,2,0]} lockRotations={true} lockTranslations={true} gravityScale={0} colliders={false} sensor={true} onIntersectionExit={handleIntersectionExit}
                                onIntersectionEnter={handleIntersection}>
                                <CuboidCollider
                                    args={[3, 2, 3]}
                                />
                            </RigidBody>

                        </group>
                    </group>
                </>
            )}
        </>
    );
}

// Precarga del modelo
useGLTF.preload("/assets/models/tentacle/tentacle.glb");
