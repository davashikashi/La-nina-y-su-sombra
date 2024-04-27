
export default function Pillar({geometry, materials}) {
    
    return (
        <>
            <mesh 
                receiveShadow={true}
                castShadow={true}
                geometry={geometry}
                material={materials}/>
        </>
    )
}