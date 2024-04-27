import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../../context/AvatarContext";
import { useAnimations, useGLTF } from "@react-three/drei";

export default function Avatar(props) {
    const avatarBodyRef = useRef();
    const avatarRef = useRef();
    const { avatar, SetAvatar } = useAvatar();

    const { nodes, materials, animations } = useGLTF('/assets/models/avatar/Girl.glb')
    const { actions } = useAnimations(animations, avatarRef)

    useEffect(() => {
        SetAvatar({
            ref: avatarRef.current,
            body: avatarBodyRef.current,
        })
    }, [avatarBodyRef.current, avatarRef.current])

    useEffect(() => {
        actions[avatar.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[avatar.animation])
                actions[avatar.animation].fadeOut(0.5);
        }

    }, [actions, avatar.animation]);

    return (
        <RigidBody ref={avatarBodyRef} type="dynamic" colliders={false} position={[0, 2, 45]}>
             <CuboidCollider  args={[0.3, 0.6, 0.3]} position={[0,0.6,0]}/>
            <group ref={avatarRef} name="Scene">
                <group name="Armature" scale={0.01}>
                    <skinnedMesh
                        name="Girl001"
                        geometry={nodes.Girl.geometry}
                        material={materials.Material}
                        skeleton={nodes.Girl.skeleton}
                    />
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </RigidBody>

    )
}