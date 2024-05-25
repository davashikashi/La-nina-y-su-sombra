import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Floor from "../floor/Floor";
import Walls from "../walls/Walls";
import { useGameContext } from '../../../context/GameContext';
import golpeado from "../../../Sounds/hitEnemigo.mp3";
import cancion from "../../../Sounds/Main Theme.mp3";

export default function Map2(props) {
  const { nodes, materials } = useGLTF('/assets/models/world/Map2.glb');
  const { shadowAvatar, setHealth } = useGameContext();

  const hitEnemigoRef = useRef(new Audio(golpeado));
  const cancionThemeRef = useRef(new Audio(cancion));

  useEffect(() => {
    const cancionTheme = cancionThemeRef.current;
    cancionTheme.loop = true;
    cancionTheme.volume = 0.15;

    const playAudio = () => {
      cancionTheme.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    };

    document.addEventListener('click', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
      cancionTheme.pause();
    };
  }, [shadowAvatar]);

  const handleFalling = (event) => {
    console.log(event.colliderObject.name);
    if (event.colliderObject.name === "character-capsule-collider") {
      const hitEnemigo = hitEnemigoRef.current;
      hitEnemigo.volume = 0.3;
      hitEnemigo.play();
      setHealth(prevHealth => prevHealth - 3);
    }
  };

  return (
    <group {...props} dispose={null}>
      <group>
        <RigidBody type="fixed" colliders="trimesh">
          <Walls
            geometry={nodes.Walls.geometry}
            materials={materials.wallMaterial}
          />
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh">
          <CuboidCollider onIntersectionEnter={handleFalling} position={[50, -3, 0]} sensor={true} args={[50, 0.1, 20]} />
          <Floor
            geometry={nodes.Floor.geometry}
            materials={materials.floorMaterial} />
        </RigidBody>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/world/Map2.glb');
