
import { useGLTF, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function Boar(props) {

    const { nodes, materials } = useGLTF("/assets/models/Boar/Boar.glb")


    return (
        <RigidBody type="dynamic" colliders="cuboid">
            <group name="BoarArmature" position={props.position} >
                <skinnedMesh
                    name="Boar"
                    geometry={nodes.Boar.geometry}
                    material={materials['Material.001']}
                    skeleton={nodes.Boar.skeleton}
                >
                    <meshStandardMaterial
                        {...materials['Material.001']} // Aplicar las propiedades del material cargado
                        transparent={false} // Asegurarse de que no sea transparente
                        depthWrite={true} // Garantiza que el Z-buffer se actualice
                        depthTest={true} // Habilita el Z-buffer para comprobar la profundidad
                    />
                </skinnedMesh>
                <primitive object={nodes.Back} />
                <primitive object={nodes.Buttock} />
                <primitive object={nodes.BackRightForeLeg} />
                <primitive object={nodes.FrontRightForeLeg} />
                <primitive object={nodes.BackLeftForeLeg} />
                <primitive object={nodes.FrontLeftForeLeg} />
            </group>
        </RigidBody>


    )
}

useGLTF.preload('/Boar.glb')