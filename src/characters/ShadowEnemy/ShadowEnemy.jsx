import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, Shadow } from '@react-three/drei'
import { RigidBody, CuboidCollider, RapierCollider, ConeCollider } from '@react-three/rapier'
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { Quaternion, Vector3 } from "three";
import { Euler } from "three";
import { useGameContext } from '../../context/GameContext';
import hit from "../../Sounds/hit.mp3"
import morir from "../../Sounds/morirEnemigo.mp3"
import { reference } from 'three/examples/jsm/nodes/Nodes.js';
import { set } from 'firebase/database';

export default function Model(props) {

  const ShadowEnemyBodyRef = useRef();
  const ShadowEnemyModelRef = useRef();
  const {addShadow , removeShadow} = useGameContext()

  const { shadowAvatar, isAttacking, setIsAttacking, shadowPositions, setShadowPositions } = useGameContext();

  const { scene, materials, animations } = useGLTF('/assets/models/shadowEnemy/ShadowEnemy.glb')
  const { actions } = useAnimations(animations, ShadowEnemyModelRef);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  // const spine = nodes.FrontLeg0; // Obtener el nodo de la columna vertebral
  // const spineOffset = new Vector3(0, 0, 0);

  const [isIdle, setIsIdle] = useState(true);

  // Para el movimiento de persecucion
  const [chaseDistance, setChaseDistance] = useState(6.5); //Distancia de persecución
  const chaseSpeed = 5; //Velocidad de persecución

  // Para el Soplido
  const blowDistance = 2.3; //Distancia de soplido

  const [isChasing, setIsChasing] = useState(false); //Estado de persecución
  const [isBlowing, setIsBlowing] = useState(false); //Estado de soplido
  const [inArea, setInArea] = useState(false);
  const [outOfBounds, setOutOfBounds] = useState(true);
  const [referenceExists, setReferenceExists] = useState(true)

  useFrame((_, delta) => {

    if (shadowAvatar && ShadowEnemyBodyRef.current && referenceExists) {

      if (isChasing && !outOfBounds) {
        const avatarPosition = shadowAvatar?.translation();
        const currentPosition = ShadowEnemyBodyRef.current?.translation();
        const currentPositionVector = new Vector3(currentPosition?.x,
          currentPosition?.y, currentPosition?.z);
        const distanceToAvatar = currentPositionVector.distanceTo(avatarPosition);

        if (distanceToAvatar <= blowDistance) {
          setIsBlowing(true);
        }

        const chaseDirection = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
        const chaseDistanceDelta = chaseDirection.multiplyScalar(chaseSpeed * delta);
        const chasePosition = new Vector3().addVectors(currentPosition, chaseDistanceDelta);
        ShadowEnemyBodyRef.current?.setTranslation(chasePosition, true);

        const directionToTarget = new Vector3().subVectors(avatarPosition, currentPosition).normalize();
        const targetRotationY = Math.atan2(directionToTarget.x, directionToTarget.z);
        const targetQuaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), targetRotationY);
        ShadowEnemyBodyRef.current.setRotation(targetQuaternion);
        // ShadowEnemyModelRef.current.rotation.y = targetRotationY;
      }
    }
  });

  useEffect(() => {
    if (isIdle) {
      actions.Idle.play(); // Reproducir la animación Idle
    } else {
      actions.Idle.stop(); // Detener la animación Idle si la sombra no está quieta
    }

    if (isChasing && !outOfBounds) {
      actions.ShadowWalking.play(); // Reproducir la animación de persecución
    } else {
      actions.ShadowWalking.stop(); // Detener la animación de persecución
    }

    if (isBlowing) {
      actions.ShadowBlowing.play(); // Reproducir la animación de soplido
      setIsChasing(false) // Detener la persecución

      setTimeout(() => {
        setIsBlowing(false); // Detener el soplido después de 1 segundo
      }, 1600);

    } else {
      actions.ShadowBlowing.stop(); // Detener la animación de soplido
    }

    if (!isBlowing && inArea) {
      setIsChasing(true);
    }
  }, [isIdle, isChasing, isBlowing, actions, inArea]);

  const handleIntersection = (event) => {
    if (event.colliderObject.name === "character-capsule-collider") {
      setInArea(true);
      if (outOfBounds) {
        setIsChasing(true);
      }
    }
  }

  const handleIntersectionExit = (event) => {
    if (event.colliderObject.name === "character-capsule-collider" || outOfBounds) {
      setIsChasing(false);
      setInArea(false);
    }
  }

  const handleOutOfBounds = (event) => {
    if (event.colliderObject.name === "character-capsule-collider") {
      setOutOfBounds(false);
    }
  }
  const handleOutOfBoundsExit = (event) => {
    if (event.colliderObject.name === "character-capsule-collider") {
      setOutOfBounds(true);
    }
  }

  const dañoDe = ["puñocollider"];
  const [visible, setVisible] = useState(true)

  const [health, setHealth] = useState(3);

  const Hit = new Audio(hit)
  const dead = new Audio(morir)

  const handleHit = (event) => {
    if (isAttacking && dañoDe.includes(event.colliderObject.name)) {
      Hit.volume = 0.3
      Hit.play()
      setIsAttacking(false)
      setHealth(prevHealth => prevHealth - 1)
      //console.log("Health:", health.current);
    }
  };

  const setShadowHealth = (id, health) => {
    setShadowPositions(prevShadowPositions => ({
      ...prevShadowPositions,
      [id]: {
        ...prevShadowPositions[id],
        health: health
      }
    }));
  };

  useEffect(() => {
    //console.log(health.current)
    if (health <= 0) {
      dead.volume = 0.4
      dead.play()
      removeShadow(props.id, false)
      setReferenceExists(false)
      setVisible(false)
    } else if (health) {
      for (const [id, valor] of Object.entries(shadowPositions)){
        if (id === props.id){
          setShadowHealth(id, health)
        }
      }
    }
  }, [health]);

  useEffect(() => {
    addShadow(props.id, ShadowEnemyBodyRef.current, visible, health)
  }, [ShadowEnemyBodyRef?.current, addShadow, props.id])

  useEffect(() => {
        
    if(shadowPositions){
      for (const [id, position] of Object.entries(shadowPositions)){
        if (id === props.id){
          setVisible(shadowPositions[id].visible)
          setHealth(shadowPositions[id].health)
          console.log("Position: ", ShadowEnemyBodyRef.current?.translation())
        }
      }
    }
    
}, [shadowPositions])




  return (
    <>
        <RigidBody onIntersectionEnter={handleHit} ref={ShadowEnemyBodyRef} type="kinematicVelocityBased"
          colliders="hull" position={props.position}
          enabledRotations={[false, true, false]}
          name="ShadowEnemy"
          rotation={props.rotation}
          // canSleep={visible ? false : true}
          mass={visible ? 1 : 0}
          gravityScale={0.1}
           >
            {visible &&(
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
                  <CuboidCollider onIntersectionEnter={handleIntersection}
                    onIntersectionExit={handleIntersectionExit}
                    sensor={true} args={[3, 1, 4]}
                    position={[0, 1, 2.5]}
                    name="ShadowSensor" />
                </group>
              </group>
            </group>
            )}
        </RigidBody>
        <CuboidCollider onIntersectionEnter={handleOutOfBounds}
          onIntersectionExit={handleOutOfBoundsExit}
          args={props.boundsArgs} position={props.boundsPosition} sensor={true} />
    </>
  )
}
