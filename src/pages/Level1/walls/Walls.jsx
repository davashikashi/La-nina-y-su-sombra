
export default function Walls({geometry, materials}) {
    
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