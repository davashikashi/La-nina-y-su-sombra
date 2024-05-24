
import { useGameContext } from "../../context/GameContext"
import { RigidBody, CuboidCollider} from "@react-three/rapier";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import { useRef, useEffect, useState } from 'react'
import golpeado from "../../Sounds/hitEnemigo.mp3"
import { useGLTF, useAnimations } from '@react-three/drei'

const Spikes = ({ palancasRequeridas, placasPresionRequeridas, position }) => {
  const rigidBodyRef = useRef()
  const { nodes, materials, animations } = useGLTF('/assets/models/spikes/Spikes.glb')
//   const { actions } = useAnimations(animations, spikesModel)
  const { palancas, placasPresion } = useGameContext();
  const spikesInitialPosition = useRef(new Vector3());
  const spikesPreviousPosition = useRef(spikesInitialPosition.current.clone());

  const { health, setHealth } = useGameContext()
  const [isVulnerable, setIsVulnerable] = useState(false);
  const [canTakeDamage, setCanTakeDamage] = useState(true);

  const hitEnemigo = new Audio(golpeado)

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
            targetPosition.y -= 3;
        } else if (currentPosition.y > spikesInitialPosition.current.y) {
            targetPosition.y = spikesInitialPosition.current.y;
        }

        // Actualizar la posición del frame anterior
        spikesPreviousPosition.current = targetPosition.clone();

        // Interpolación para un movimiento suave
        const newPosition = currentPosition.lerp(targetPosition, 0.02);
        rigidBodyRef.current.setTranslation(newPosition, true);

        if (isVulnerable && canTakeDamage) {
            console.log(health)
            hitEnemigo.volume = 0.3;
            hitEnemigo.play();
            setHealth(prevHealth => prevHealth - 1);
            setIsVulnerable(false);

            setTimeout(() => {
                setIsVulnerable(true);
                console.log("Ha pasado 2 segundos");
                console.log(canTakeDamage)
            }, 2000);
        }     

        
    }
});

const handleIntersection = (event) => {
    if (event.colliderObject.name === "character-capsule-collider") {
        setIsVulnerable(true);
        setCanTakeDamage(true)
          

    }
}

const handleIntersectionExit = (event) => {
    if (event.colliderObject.name === "character-capsule-collider") {
        setIsVulnerable(false);
        setCanTakeDamage(false)

    }
}


// useEffect(() => {
//     if (isVulnerable) {
//         console.log(health)
//         hitEnemigo.volume = 0.3;
//         hitEnemigo.play();
//         setHealth(prevHealth => prevHealth - 1);
//         setIsVulnerable(false);

//         setTimeout(() => {
//             // Esta línea de código se ejecutará después de 3000 milisegundos (3 segundos)
//             setCanTakeDamage(true);
//             // Esta línea de código se ejecutará después de 3000 milisegundos (3 segundos)
//             //
//             console.log("Ha pasado 3 segundos");
//         }, 2000);
//     }
// }, [canTakeDamage]);


  return (
    <RigidBody type="kinematicVelocityBased"
            name="Spikes"
            gravityScale={0}
            lockRotations={true}
            lockTranslations={true}
            colliders="cuboid"
            ref={rigidBodyRef}
            >
        <group name="Scene" scale={[0.7, 0.7, 0.7]} position={position} >
            <mesh name="Platform" geometry={nodes.Platform.geometry} material={materials.Rock} />
            <mesh name="Spikes" geometry={nodes.Spikes.geometry} material={materials.Steel} />
        </group>
        <CuboidCollider onIntersectionEnter={handleIntersection} onIntersectionExit={handleIntersectionExit}
         sensor={true} args={[0.7, 1.4, 0.7]} 
         position={[position[0], 1, position[2]]}
         name="SpikeSensor"/>

        
    </RigidBody>
  )
}

export default Spikes
