
export default function Floor({geometry, materials}) {
    
    return (
        <>
            <mesh 
                receiveShadow={true}
                geometry={geometry}
                material={materials}/>
        </>
    )
}