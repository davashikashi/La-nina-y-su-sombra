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
    const { shadowAvatar, isAttacking, setIsAttacking, tentaclePositions, setTentaclePositions } = useGameContext();
    const [referencesExist, setReferencesExist] = useState(true);
    const [health, setHealth] = useState(3);

    // Clonar la escena para evitar modificar la original
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);
    const { addTentacle, removeTentacle } = useGameContext();

    // Configurar animaciones
    const { actions } = useAnimations(animations, tentacleModel.current);

    const mid = nodes.Mid;
    const chest = nodes.Chest;
    const midoffset = new Vector3(0, 0, 0);
    const chestoffset = new Vector3(0, 0.7, 0);

    const dañoDe = ["puñocollider"];
    const [visible, setVisible] = useState(true);

    const Hit = new Audio(hit);
    const dead = new Audio(morir);


    useEffect(() => {
        addTentacle(props.id, tentacleModel.current, visible, health)
    }, [tentacleModel?.current, addTentacle, props.id])



    const startAttackAnimation = () => {
        if (tentacleModel.current && actions["Attack.001"] && actions["Idle.002"]) {
            actions["Idle.002"].stop();
            actions["Attack.001"].play();
            setTimeout(() => {
                setMove(false);
            }, 950);
            setTimeout(() => {
                actions["Attack.001"].stop();
                setAttacking(false);
            }, 2500);
        }
    };

    useEffect(() => {
        
        if(tentaclePositions){
          for (const [id, position] of Object.entries(tentaclePositions)){
            if (id === props.id){
              setVisible(tentaclePositions[id].visible)
              setHealth(tentaclePositions[id].health)
            }
          }
        }
        
    }, [tentaclePositions])

    const stopAttackAnimation = () => {
        if (tentacleModel.current && actions["Attack.001"] && actions["Idle.002"]) {
            setMove(true);

            actions["Idle.002"].play();
            setTimeout(() => {
                
                setAttacking(true);
            }, 3000);
        }
    };

    useEffect(() => {
        if (inArea) {
            //console.log("ataca", attacking)
            if (attacking) {
                startAttackAnimation();
            } else {
                stopAttackAnimation();
            }
        }
        else if (actions["Idle.002"] && actions["Attack.001"]) {
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
        if (mid && referencesExist && bodyRefCollider.current && shadowAvatar) {
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
            setHealth(prevHealth => prevHealth - 1)
        }
    };

    const setTentacleHealth = (id, health) => {
        setTentaclePositions(prevTentaclePositions => ({
          ...prevTentaclePositions,
          [id]: {
            ...prevTentaclePositions[id],
            health: health
          }
        }));
      };

    useEffect(() => {
        if (health <= 0) {
            dead.volume = 0.4;
            dead.play();
            removeTentacle(props.id, false)
            setReferencesExist(false);          
            setVisible(false);
        } else if (health) {
            console.log("TT: ", tentaclePositions)
            for (const [id, positions] of Object.entries(tentaclePositions)){
              if (id === props.id){
                setTentacleHealth(id, health)
              }
            }
          }
    }, [health]);


    return (
        <>
            {visible && (
                <>
                    <CuboidCollider
                        args={[3, 2, 3]}
                        position={props.position}
                        onIntersectionExit={handleIntersectionExit}
                        onIntersectionEnter={handleIntersection}
                        sensor={true}
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
                            <RigidBody ref={bodyRefCollider} type="KinematicPositionBased" lockRotations={true} lockTranslations={true} gravityScale={0} colliders={false}>
                                <CuboidCollider name="tentaculoBody" onIntersectionEnter={handleHit} args={[0.25, 1, 0.3]} />
                            </RigidBody>
                            <RigidBody ref={headRef} type="KinematicPositionBased" sensor={true} lockRotations={true} lockTranslations={true} gravityScale={0} colliders={false}>
                                <CuboidCollider name="tentaculoHead" args={[0.2, 1, 0.4]} />
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
