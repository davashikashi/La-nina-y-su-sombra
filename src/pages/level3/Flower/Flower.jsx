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

  // Variables para controlar la animación
  const startTime = useRef(0);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (flowerModelRef.current) {
      // Calcular el desplazamiento vertical para la flotación
      const verticalOffset = floatAmplitude * Math.sin(floatSpeed * time);

      // Aplicar el desplazamiento vertical
      flowerModelRef.current.position.y = props.position[1] + verticalOffset;

      // Calcular la rotación sobre el eje Y
      const rotationAngle = rotationSpeed * time;

      // Aplicar la rotación
      flowerModelRef.current.rotation.y = rotationAngle;
    }
  });
 

  return (
    // <RigidBodyw
    //   ref={flowerBodyRef}
    //   type="kinematicPosition"
    //   colliders={false}
    //   gravityScale={0}
    // >
    //   <CuboidCollider
    //     args={[0.1, 0.2, 0.2]}
    //     position={props.position} // Posición base desde props
    //   />
    // </RigidBody>
      <group ref={flowerModelRef} scale={[6, 6, 6]} position={props.position}>
        <mesh
          geometry={nodes.Flower.geometry}
          material={materials["Material.001"]}
          position={[0, 0, 0]} // Posición relativa del mesh dentro del grupo
          rotation={[Math.PI / 2, 0, 0]} // Rotación inicial del mesh
        />
      </group>
    
  );
}
