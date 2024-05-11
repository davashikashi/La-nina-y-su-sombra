import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/assets/models/Torch/Torch.glb')
  return (
    <group position={props.position} scale={[0.7, 0.7, 0.7]} rotation={props.rotation}>
      <mesh geometry={nodes.Torch_1.geometry} material={materials.Iron} />
      <mesh geometry={nodes.Torch_2.geometry} material={materials.Steel} />
      <mesh geometry={nodes.Torch_3.geometry} material={materials.Wood} />
      <mesh geometry={nodes.Torch_4.geometry} material={materials.Fire} />
    </group>
  )
}

useGLTF.preload('/Torch.glb')