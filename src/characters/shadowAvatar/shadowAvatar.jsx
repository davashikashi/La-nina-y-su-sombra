import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, Quaternion, Vector3 } from "three";
import { useGameContext } from "../../context/GameContext";
import { KeyboardControls, useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import React, { forwardRef } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";



const ShadowAvatar = forwardRef((props, ref) => {
    // const avatarBodyRef = useRef();
    // const avatarRef = useRef();
    // const { avatar, SetAvatar } = useAvatar();

    const handRefCollider = useRef()
    const { isAttacking, setIsAttacking } = useGameContext()
    const { nodes, materials } = useGLTF('/assets/models/shadowAvatar/Shadow.glb')
    //use states

    const [collisionEndTime, setCollisionEndTime] = useState(null); // Control del temporizador

    //carga modelo
    const characterURL = '/assets/models/shadowAvatar/Shadow.glb'


    const handOffset = new Vector3(0.2, 0, -0.1)
    const rotationOffset = new Quaternion().setFromEuler(
        new Euler(0, 0, 0) // Rotación para levantar la espada
    );

    

    //definicion de huesos manos
    const rightHandBone = nodes.RightArmIK

    //console.log("huesos", nodes.GirlModel.skeleton)


    //control de teclas
    const handleKeyDown = (event) => {
        if (event.key.toLowerCase() === "f") {
            console.log("con colisiones")
            setIsAttacking(true)
            //console.log("colisiones") // Habilita colisiones
            setCollisionEndTime(Date.now() + 1000); // Deshabilitar en 1.5 segundos
        }


    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (collisionEndTime && Date.now() > collisionEndTime) {
                console.log("sin colisiones")
                setIsAttacking(false);
                setCollisionEndTime(null);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [collisionEndTime]);


    //keyboards y animationsets

    const animationSet = {
        idle: "Idle", // Animación de reposo
        walk: "Walking", // Animación de caminar
        run: "Walking",
        jump: "Jump", // Si no tienes animación de salto, usar un valor seguro
        jumpIdle: "Jump",
        jumpLand: "Jump",
        fall: "Idle",
        action4: "Attacking",
    }


    const [speed, setSpeed] = useState(3.5);

    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] },
        { name: "action4", keys: ["KeyF"] }//tecla para atacar
    ]

    /////////////////////////////////////////////////////////////////////////////////////////////////////


    useFrame(() => {

        if (handRefCollider.current) {
            // Obtén la posición y rotación del props.props.rightHandBone
            const worldPosition = rightHandBone.getWorldPosition(new Vector3());
            const worldQuaternion = rightHandBone.getWorldQuaternion(new Quaternion());

            const realtivePosition = handOffset.clone().applyQuaternion(worldQuaternion)

            // Ajusta la posición y rotación del rigidbody del HandSword
            const adjustedPosition = new Vector3(
                worldPosition.x + realtivePosition.x,
                worldPosition.y + realtivePosition.y,
                worldPosition.z + realtivePosition.z
            )

            handRefCollider.current.setTranslation({
                x: adjustedPosition.x,
                y: adjustedPosition.y,
                z: adjustedPosition.z
            });

            const adjustedRotation = worldQuaternion.clone().multiply(rotationOffset);

            handRefCollider.current.setRotation({
                x: adjustedRotation.x,
                y: adjustedRotation.y,
                z: adjustedRotation.z,
                w: adjustedRotation.w,
            });

        }

    })
    ////////////////////////////////////////////////////////////////
    const {health,setHealth} = useGameContext()
    const [isVulnerable, setIsVulnerable] = useState(false);
    const [canTakeDamage, setCanTakeDamage] = useState(true);
    const enemigos = ["Boar", "Fuego", "rigid caja"];



    const handleHit = (event) => {
        const nombreEnemigo = event.colliderObject.name;
        if (enemigos.includes(nombreEnemigo) && canTakeDamage) {
            setIsVulnerable(true);
            setCanTakeDamage(false)
        }
    };

    useEffect(() => {
        console.log(health)
        if (health <= 0) {
            console.log("El jugador ha perdido toda su salud y ha muerto.");
        }
    }, [health]);

    useEffect(() => {
        if (isVulnerable) {
            console.log(health)
            setHealth(prevHealth => prevHealth - 1);
            setIsVulnerable(false);
            
            setTimeout(() => {
                // Esta línea de código se ejecutará después de 3000 milisegundos (3 segundos)
                setCanTakeDamage(true);
                // Esta línea de código se ejecutará después de 3000 milisegundos (3 segundos)
                //
                console.log("Ha pasado 3 segundos");
            }, 3000);
        }
    }, [canTakeDamage]);




    return (
        <KeyboardControls map={keyboardMap}>
            <Ecctrl animated onCollisionEnter={handleHit} capsuleHalfHeight={0.3} maxVelLimit={speed} jumpVel={3} sprintMult={1.5} dragDampingC={0.15} position={props.avatarPosition} ref={ref}>
                <EcctrlAnimation
                    characterURL={characterURL}
                    animationSet={animationSet} >
                    <group name="Scene">
                        <group name="Armature" position={[0,-0.7,0]} rotation={[0, 3.2, 0]}>
                            <group name="Shadow">
                                <skinnedMesh
                                    name="Shadow_1"
                                    geometry={nodes.Shadow_1.geometry}
                                    material={materials.ShadowBody}
                                    skeleton={nodes.Shadow_1.skeleton}
                                />
                                <skinnedMesh
                                    name="Shadow_2"
                                    geometry={nodes.Shadow_2.geometry}
                                    material={materials.ShadowEyes}
                                    skeleton={nodes.Shadow_2.skeleton}
                                />
                            </group>
                            <primitive object={nodes.LowerBody} />
                            <primitive object={nodes.RightArmIK} />
                            <primitive object={nodes.HeadIK} />
                            <primitive object={nodes.FingerAIK} />
                            <primitive object={nodes.FingerBIK} />
                            <primitive object={nodes.FingerCIK} />
                            <primitive object={nodes.LeftArmIK} />
                            <primitive object={nodes.FingerFIK} />
                            <primitive object={nodes.FingerEIK} />
                            <primitive object={nodes.FingerDIK} />
                            <RigidBody name="puño" ref={handRefCollider} type="kinematicPosition" colliders="false">
                                <CuboidCollider
                                    name="puñocollider"
                                    sensor={true}
                                    // onIntersectionEnter={handleCollisionEnter}
                                    position={[0, 0, 0.5]}
                                    args={[0.1, 0.2, 0.3]}
                                />
                            </RigidBody>

                        </group>
                    </group>
                </EcctrlAnimation>
            </Ecctrl>
        </KeyboardControls>
    )
});

export default ShadowAvatar;






