import { useEffect, useState } from "react"
import { useGameContext } from "../../context/GameContext"


 const Door = ({id, requiredActivators, position})=>{

    const [isOpen, setIsOpen]= useState(false)
    const {registerDoor, isDoorOpen} = useGameContext()

    useEffect(() => {
        registerDoor(id,requiredActivators)
    },[id,requiredActivators, registerDoor])

    useEffect(()=>{
        setIsOpen(isDoorOpen(id))
    },[isDoorOpen,id])


    return(
        <mesh position={position}>
            <boxGeometry args={[3, 4, 1]} />
            <meshStandardMaterial attach="material" color={isOpen ? 'green' : 'red'} />
        </mesh>
    )
}

export default Door