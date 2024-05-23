
import { useGameContext } from "../../context/GameContext"
import { RigidBody } from "@react-three/rapier";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Spikes = ({ palancasRequeridas, placasPresionRequeridas, position }) => {
  const rigidBodyRef = useRef()
  const { nodes, materials, animations } = useGLTF('/assets/models/spikes/Spikes.glb')
//   const { actions } = useAnimations(animations, spikesModel)
  const { palancas, placasPresion } = useGameContext();
  const spikesInitialPosition = useRef(new Vector3());
  const spikesPreviousPosition = useRef(spikesInitialPosition.current.clone());

  const health = useRef(100);

  const spikesDown = () => {
    for (const placaPresionId of placasPresionRequeridas) {
        if (!placasPresion[placaPresionId]) {
            return false;
        }
    }
    return true;
};

useFrame(() => {
    if (rigidBodyRef.current) {
        const currentPosition = new Vector3().copy(
            rigidBodyRef.current.translation()
        );
        const targetPosition = spikesInitialPosition.current.clone();

        if (spikesDown() ? true : false) {
            targetPosition.y -= 2;
        } else if (currentPosition.y > spikesInitialPosition.current.y) {
            targetPosition.y = spikesInitialPosition.current.y;
        }

        // Actualizar la posición del frame anterior
        spikesPreviousPosition.current = targetPosition.clone();

        // Interpolación para un movimiento suave
        const newPosition = currentPosition.lerp(targetPosition, 0.02);
        rigidBodyRef.current.setTranslation(newPosition, true);
    }
});


  return (
    <RigidBody type="kinematicVelocityBased"
            name="Spikes"
            gravityScale={0}
            lockRotations={true}
            lockTranslations={true}
            colliders={"cuboid"}
            ref={rigidBodyRef} >
        <group name="Scene" scale={[0.7, 0.7, 0.7]} positon={position}>
            <mesh name="Platform" geometry={nodes.Platform.geometry} material={materials.Rock} />
            <mesh name="Spikes" geometry={nodes.Spikes.geometry} material={materials.Steel} />
        </group>
    </RigidBody>
  )
}

export default Spikes
