import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useRef } from "react";
import { Quaternion, Vector3 } from "three";

export default function Flower(props) {
  const { nodes, materials } = useGLTF("/assets/models/Flower/Flower.glb");

  const flowerBodyRef = useRef();
  const flowerModelRef = useRef();

  // Parámetros para el movimiento de flotación y rotación
  const floatAmplitude = 0.2; // Amplitud del movimiento hacia arriba y hacia abajo
  const floatSpeed = 1; // Velocidad del movimiento de flotación
  const rotationSpeed = 0.5; // Velocidad de rotación sobre el eje Y

  useFrame((state, delta) => {
    // Obtener el tiempo transcurrido desde el inicio de la animación
    const time = state.clock.getElapsedTime();

    // Movimiento hacia arriba y hacia abajo con una función seno
    const yOffset = Math.sin(time * floatSpeed) * floatAmplitude;

    // Nueva posición para el RigidBody cinemático
    const newRigidBodyPosition = new Vector3(
      props.position[0],
      props.position[1] + yOffset,
      props.position[2]
    );

    // Aplicar la nueva posición al RigidBody
    flowerBodyRef.current.setNextKinematicTranslation(newRigidBodyPosition);

    // Aplicar rotación suave al RigidBody
    const currentRotation = flowerBodyRef.current.rotation();
    const newRotation = new Quaternion().copy(currentRotation)
    newRotation.y += rotationSpeed * delta;

    flowerBodyRef.current.setNextKinematicRotation(newRotation);

    // Aplicar el mismo movimiento al modelo de la flor
    flowerModelRef.current.position.y = newRigidBodyPosition.y;
    flowerModelRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <RigidBody
      ref={flowerBodyRef}
      type="kinematicPositionBased"
      colliders={false}
      gravityScale={0}
    >
      <CuboidCollider
        args={[0.1, 0.2, 0.2]}
        position={props.position} // Posición base desde props
      />
      <group ref={flowerModelRef} scale={[6, 6, 6]} position={props.position}>
        <mesh
          geometry={nodes.Flower.geometry}
          material={materials["Material.001"]}
          position={[0, 0, 0]} // Posición relativa del mesh dentro del grupo
          rotation={[Math.PI / 2, 0, 0]} // Rotación inicial del mesh
        />
      </group>
    </RigidBody>
  );
}
