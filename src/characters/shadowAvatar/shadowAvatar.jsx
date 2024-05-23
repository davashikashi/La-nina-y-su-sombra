import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, Quaternion, Vector3 } from "three";
import { useGameContext } from "../../context/GameContext";
import { KeyboardControls, useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import React, { forwardRef } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import golpea from "../../Sounds/lanzaGolpe.mp3"
import golpeado from "../../Sounds/hitEnemigo.mp3"
import anda from "../../Sounds/shadowWalk.mp3"


const ShadowAvatar = forwardRef((props, ref) => {
    const avatarBodyRef = useRef();
    const avatarRef = useRef();
    // const { avatar, SetAvatar } = useAvatar();

    const handRefCollider = useRef()
    const { isAttacking, setIsAttacking } = useGameContext()
    const { nodes, materials } = useGLTF('/assets/models/shadowAvatar/Shadow.glb')
    const { setShadowAvatar } = useGameContext();
    
    //use states

    const [collisionEndTime, setCollisionEndTime] = useState(null); // Control del temporizador

    //carga modelo
    const characterURL = '/assets/models/shadowAvatar/Shadow.glb'


    const handOffset = new Vector3(0, 0, -0.7)
    const rotationOffset = new Quaternion().setFromEuler(
        new Euler(0, 0, 0) // Rotación para levantar la espada
    );

    const lanzaGolpe = new Audio(golpea)


    //definicion de huesos manos
    const rightHandBone = nodes.RightArmIK

    const andando = new Audio(anda)

    //console.log("huesos", nodes.GirlModel.skeleton)


    //control de teclas
    const handleKeyDown = (event) => {
        if (event.key.toLowerCase() === "f") {
            console.log("con colisiones")
            setIsAttacking(true)
            //console.log("colisiones") // Habilita colisiones
            lanzaGolpe.volume = 0.1;
            lanzaGolpe.play();
            setCollisionEndTime(Date.now() + 1000); // Deshabilitar en 1.5 segundos
        }

        if (event.key.toLowerCase() === "w"
            || event.key.toLowerCase() === "a"
            || event.key.toLowerCase() === "s"
            || event.key.toLowerCase() === "d") {
            andando.loop = true
            andando.volume = 0.2;
            andando.play();
        }


    };

    const handleKeyUp = (event) => {
        if (event.key.toLowerCase() === "w" || event.key.toLowerCase() === "a" || event.key.toLowerCase() === "s" || event.key.toLowerCase() === "d") {
            andando.pause();
            andando.currentTime = 0;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
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
        run: "Running",
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

    // useEffect(() => {
    //     setActualposition(avatarBodyRef.current?.translation())
    //     setPlayerPosition(actualposition)
        
    // },[avatarBodyRef.current?.translation()]);

    useEffect(() => {
        setShadowAvatar(
            avatarBodyRef.current
        )
    }, [avatarBodyRef?.current])

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
    const { health, setHealth } = useGameContext()
    const [isVulnerable, setIsVulnerable] = useState(false);
    const [canTakeDamage, setCanTakeDamage] = useState(true);
    const enemigos = ["tentaculoBody","tentaculoHead","Boar", "Fuego", "rigid caja", "Spikes", "ShadowEnemy"];
    const hitEnemigo = new Audio(golpeado)



    const handleHit = (event) => {
        const nombreEnemigo = event.colliderObject.name;
        if (enemigos.includes(nombreEnemigo) && canTakeDamage) {
            setIsVulnerable(true);
            setCanTakeDamage(false)
        }
    };

    const handleSensorHit = (event) => {
        const nombreEnemigo = event.colliderObject.name;
        if (enemigos.includes(nombreEnemigo) && canTakeDamage) {
            setIsVulnerable(true);
            setCanTakeDamage(false)
        }
    }

    useEffect(() => {
        console.log(health)
        if (health <= 0) {
            console.log("El jugador ha perdido toda su salud y ha muerto.");
        }
    }, [health]);

    useEffect(() => {
        if (isVulnerable) {
            console.log(health)
            hitEnemigo.volume = 0.3;
            hitEnemigo.play();
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
            <Ecctrl ref={avatarBodyRef}
             debug={false} animated onIntersectionEnter={handleSensorHit} onCollisionEnter={handleHit} maxVelLimit={speed} jumpVel={3} sprintMult={1.5} dragDampingC={0.15} position={props.avatarPosition} >
                <EcctrlAnimation
                    characterURL={characterURL}
                    animationSet={animationSet} >
                    <group name="Scene">
                        <group ref={avatarRef} name="Armature" position={[0, -0.9, 0]} rotation={[0, 3.2, 0]}>
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






