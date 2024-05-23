import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, Shadow } from '@react-three/drei'
import { RigidBody, CuboidCollider, RapierCollider, CapsuleCollider} from '@react-three/rapier'
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { Quaternion, Vector3 } from "three";
import { Euler } from "three";

export default function Model(props) {
    
  const ShadowEnemyBodyRef = useRef();
  const ShadowEnemyModelRef = useRef();
  const avatarReference = props.avatarReference;

  const { scene, materials, animations } = useGLTF('/assets/models/shadowEnemy/ShadowEnemy.glb')
  const { actions } = useAnimations(animations, ShadowEnemyModelRef);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const [isIdle, setIsIdle] = useState(true);

  // Para el movimiento de persecucion
  const [chaseDistance, setChaseDistance] = useState(6.5); //Distancia de persecución
  const chaseSpeed = 5; //Velocidad de persecución

  // Para el Soplido
  const blowDistance = 2.3; //Distancia de soplido

  const [isChasing, setIsChasing] = useState(false); //Estado de persecución
  const [isBlowing, setIsBlowing] = useState(false); //Estado de soplido

  useFrame((_, delta) => {
        const avatarPosition = avatarReference.current?.translation(); 
        const currentPosition = ShadowEnemyBodyRef.current?.translation(); // Obtener la posición actual            
        const currentPositionVector = new Vector3(currentPosition.x,
                 currentPosition.y, currentPosition.z);

        // console.log("X position: ", avatarPosition.x + "Z position: " + avatarPosition.z);
        if (avatarPosition) {
        const distanceToAvatar = currentPositionVector.distanceTo(avatarPosition);

        if (distanceToAvatar <= chaseDistance) {
            setIsChasing(true);
        } else {
            setIsChasing(false);
        }

        if (avatarPosition.z > 16 && avatarPosition.z < 58 && !isBlowing){
          setChaseDistance(6.5);
        }

        if (distanceToAvatar <= blowDistance) {
            setIsBlowing(true);
        }

        if (isChasing) {
          if (avatarPosition.z <= 16 || avatarPosition.z >= 58){

            setChaseDistance(0);

          }else{
              const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
              const chaseDistanceDelta = chaseDirection.multiplyScalar(chaseSpeed * delta);
              const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);
              ShadowEnemyBodyRef.current?.setTranslation(chasePosition, true);
              
            }
        }
        // Si tenemos la posición del avatar y estamos persiguiendo
        if (avatarPosition && isChasing) {
            // Calcular la dirección hacia la que debe mirar la sombra
            const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();

            // Calcular la rotación necesaria en radianes
            const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);

            // Aplicar la rotación al cuerpo rígido
            ShadowEnemyBodyRef.current.rotation.y = targetRotationY;
            ShadowEnemyModelRef.current.rotation.y = targetRotationY;
        }
    }
  });

  useEffect(() => {
    if (isIdle) {
      actions.Idle.play(); // Reproducir la animación Idle
    } else {
      actions.Idle.stop(); // Detener la animación Idle si la sombra no está quieta
    }

    if (isChasing) {
      actions.ShadowWalking.play(); // Reproducir la animación de persecución
    } else {
      actions.ShadowWalking.stop(); // Detener la animación de persecución
    }

    if (isBlowing) {
        actions.ShadowBlowing.play(); // Reproducir la animación de soplido
        setChaseDistance(0); // Detener la persecución

        setTimeout(() => {
          setIsBlowing(false); // Detener el soplido después de 1 segundo 
          setChaseDistance(6.5); // Volver a activar la persecución   
      }, 1600);
    } else {
        actions.ShadowBlowing.stop(); // Detener la animación de soplido
    }
  }, [isIdle, isChasing, isBlowing, actions]);

  return (
    <RigidBody ref={ShadowEnemyBodyRef} type="kinematicVelocityBased" 
    colliders="hull" position={props.position} 
    enabledRotations={[false, false, false]}
    name="ShadowEnemy">
      {/* < /> */}
        <group ref={ShadowEnemyModelRef}>
            <group name="Scene">
                <group name="Armature">
                <group name="ShadowEnemy">
                    <skinnedMesh
                    name="ShadowEnemy_1"
                    geometry={nodes.ShadowEnemy_1.geometry}
                    material={materials.ShadowMaterial}
                    skeleton={nodes.ShadowEnemy_1.skeleton}
                    />
                    <skinnedMesh
                    name="ShadowEnemy_2"
                    geometry={nodes.ShadowEnemy_2.geometry}
                    material={materials.ShadowEyeMaterial}
                    skeleton={nodes.ShadowEnemy_2.skeleton}
                    />
                </group>
                <primitive object={nodes.Spine0} />
                <primitive object={nodes.FrontLegIK} />
                <primitive object={nodes.RightLegIK} />
                <primitive object={nodes.LeftLegIK} />
                <primitive object={nodes.BackLegIK} />
                <primitive object={nodes.SpineIK} />
                </group>
            </group>
        </group>
    </RigidBody>
  )
}
