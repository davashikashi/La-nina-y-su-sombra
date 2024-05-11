import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/assets/models/Candle/Candle.glb')
  return (
    <group position={props.position} scale={[0.4, 0.4, 0.4]}>
      <mesh geometry={nodes.Candle_1.geometry} material={materials.Plate} />
      <mesh geometry={nodes.Candle_2.geometry} material={materials.Candle} />
      <mesh geometry={nodes.Candle_3.geometry} material={materials.Thread} />
      <mesh geometry={nodes.Candle_4.geometry} material={materials.Fire} />
    </group>
  )
}

useGLTF.preload('assets/models/Candle/Candle.glb')