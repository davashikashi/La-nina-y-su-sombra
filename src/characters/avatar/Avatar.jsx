import { KeyboardControls, useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation, useGame } from "ecctrl";
import HandSword from "../../Objects/sword/swordHand";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, Quaternion, Vector3 } from "three";
import { useGameContext } from "../../context/GameContext";
import LampHand from "../../Objects/Lamp/LampHand";

// Supongamos que tienes un sistema de gestión de animaciones

export default function Avatar(props) {

    const { nodes, materials } = useGLTF('/assets/models/avatar/Girl.glb')
    //use states

    const [isCollisionDisable, setIsCollisionDisable] = useState(false); // Estado para colisiones
    const [collisionEndTime, setCollisionEndTime] = useState(null); // Control del temporizador

    //carga modelo
    const characterURL = '/assets/models/avatar/Girl.glb'

    //uso de contexto
    const { isAttacking, setIsAttacking } = useGameContext()
    const { actualObject, setActualObject } = useGameContext("sword")
    const { isTakingSword, isTakingLamp, setIsTakingSword, setIsTakingLamp } = useGameContext()



    //definicion de huesos manos
    const rightHandBone = nodes.GirlModel.skeleton.bones.find(
        (bone) => bone.name === 'mixamorigRightHand'
    );

    const leftHandBone = nodes.GirlModel.skeleton.bones.find(
        (bone) => bone.name === 'mixamorigLeftHand'
    );

    //console.log("huesos", nodes.GirlModel.skeleton)


    //control de teclas
    const handleKeyDown = (event) => {
        if (event.key.toLowerCase() === "f") {
            setIsAttacking(true)
            handleCollision(isAttacking)
            //console.log("colisiones") // Habilita colisiones
            setCollisionEndTime(Date.now() + 1000); // Deshabilitar en 1.5 segundos
        }

        
    };

    //funciones auxiliares
    const handleCollision = (isAttacking) => {
        if (isAttacking && !isCollisionDisable) {
            setIsAttacking(true)
            setCollisionEndTime(Date.now() + 1000); // Deshabilitar en 1 segundo
        }
    };
    //useEffects

    useEffect(() => {
        if (collisionEndTime && Date.now() > collisionEndTime) {
            setIsAttacking(false);
            setIsCollisionDisable(true);
            setCollisionEndTime(null);
        }
    }, [collisionEndTime]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    //useFrame
    useFrame(() => {
        

        if (isTakingSword) {
            if (collisionEndTime && Date.now() > collisionEndTime) {
                setIsAttacking(false)
                //console.log("esperando") // Deshabilita colisiones // Restablece el temporizador
            }
        }


    });


    //keyboards y animationsets

    const animationSet = {
        idle: "Idle", // Animación de reposo
        walk: "Walk", // Animación de caminar
        run: "Run",
        jump: "Jump", // Si no tienes animación de salto, usar un valor seguro
        jumpIdle: "Jump",
        jumpLand: "Jump",
        fall: "Idle",
        action4: "Attack",
    }


    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] },
        { name: "action4", keys: ["KeyF"] }//tecla para atacar
    ]

    return (
        <KeyboardControls map={keyboardMap} >
            <Ecctrl
                animated capsuleRadius={0.29} capsuleHalfHeight={0.3} maxVelLimit={3.5} jumpVel={3} sprintMult={1.5} dragDampingC={0.15} position={[0, 10, 0]}>
                <EcctrlAnimation
                    characterURL={characterURL}
                    animationSet={animationSet} >
                    <group name="Scene">
                        <group name="Girl" rotation={[Math.PI / 2, 0, 0]} scale={0.01} position={[-0.1, -0.85, 0]} >
                            <skinnedMesh
                                name="GirlModel"
                                geometry={nodes.GirlModel.geometry}
                                material={materials["Material.001"]}
                                skeleton={nodes.GirlModel.skeleton}
                            />
                            <primitive object={nodes.mixamorigHips} />
                            <HandSword  rightHandBone={rightHandBone} isCollisionDisable={isCollisionDisable} />
                            <LampHand  leftHandBone={leftHandBone}  />

                        </group>
                    </group>
                </EcctrlAnimation>
            </Ecctrl>
        </KeyboardControls>
    )
}



// s