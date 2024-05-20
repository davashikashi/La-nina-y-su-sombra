import { useEffect, useState } from "react"
import { useGameContext } from "../../context/GameContext"
import { RigidBody } from "@react-three/rapier"
const Plate = ({id,position}) => {
    const {registerActivator,setActivatorState} = useGameContext()
    const [isActivate,setIsActivate] = useState(false)

    useEffect(() => {
        registerActivator(id)
    },[id,registerActivator])

    const handleCollisionEnter = (event )=>{
        const objectName = event.colliderObject.name
        if(objectName === "rigid caja"){
            setIsActivate(true)
            setActivatorState(id,true)
        }
    }

    const handleCollisionExit = (event )=>{
        const objectName = event.colliderObject.name
        if(objectName === "rigid caja"){
            setIsActivate(false)
            setActivatorState(id,false)
        }
    }


    return(
        <RigidBody
            onIntersectionEnter={handleCollisionEnter}
            onIntersectionExit={handleCollisionExit}
            position={position}
            type="fixed"
            sensor={true}
        >
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color={isActivate ? 'red' : 'gray'} />
            </mesh>
        </RigidBody>
    )
}


export default Plate