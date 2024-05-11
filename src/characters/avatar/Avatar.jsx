
import { KeyboardControls, useAnimations, useGLTF } from "@react-three/drei";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import React, { forwardRef } from "react";


const Avatar = forwardRef((props, ref) =>{
    // const avatarBodyRef = useRef();
    // const avatarRef = useRef();
    // const { avatar, SetAvatar } = useAvatar();

    const { nodes, materials, animations } = useGLTF('/assets/models/avatar/Girl.glb')
    // const { actions } = useAnimations(animations, avatarRef)

    // useEffect(() => {
    //     SetAvatar({
    //         ref: avatarRef.current,
    //         body: avatarBodyRef.current,
    //     })
    // }, [avatarBodyRef.current, avatarRef.current])

    // useEffect(() => {
    //     actions[avatar.animation]?.reset().fadeIn(0.5).play();
    //     return () => {
    //         if (actions[avatar.animation])
    //             actions[avatar.animation].fadeOut(0.5);
    //     }

    // }, [actions, avatar.animation]);

    const characterURL = '/assets/models/avatar/Girl.glb'

    /**
     * Character animation set preset
     */
    const animationSet = {
        idle: "Idle", // Animación de reposo
        walk: "Walk", // Animación de caminar
        run: "Run", 
        jump: "Jump", // Si no tienes animación de salto, usar un valor seguro
        jumpIdle: "Jump",
        jumpLand: "Jump",
        fall: "Idle",
    };

    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] }
    ];

    return (
        <KeyboardControls map={keyboardMap}>
            <Ecctrl animated capsuleHalfHeight={0.3} maxVelLimit={3.5} jumpVel={3} sprintMult={1.5} dragDampingC={0.15} position={props.avatarPosition} ref={ref}>
                <EcctrlAnimation
                    characterURL={characterURL}
                    animationSet={animationSet} >
                    <group name="Scene">
                        <group name="Girl" rotation={[Math.PI / 2, 0, 0]} scale={0.01} position={[0,-0.8,0]} >
                            <skinnedMesh
                                name="GirlModel"
                                geometry={nodes.GirlModel.geometry}
                                material={materials.Material}
                                skeleton={nodes.GirlModel.skeleton}
                            />
                            <primitive object={nodes.mixamorigHips} />
                        </group>
                    </group>
                </EcctrlAnimation>
            </Ecctrl>
        </KeyboardControls>
    )
});

export default Avatar;