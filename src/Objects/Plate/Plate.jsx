import { useEffect, useState } from "react"
import { useGameContext } from "../../context/GameContext"
import { RigidBody } from "@react-three/rapier"
const Plate = ({id,position}) => {
    const [isActivate,setIsActivate] = useState(false)
    const { placasPresion, togglePlacaPresion } = useGameContext();
    
  
    const handleIntersection = (event) => {
        if(event.colliderObject.name === "rigid caja"){
            togglePlacaPresion(id, true);
            setIsActivate(true)
        }
    };

    const handleIntersectionExit = (event) => {
        if(event.colliderObject.name === "rigid caja"){
            togglePlacaPresion(id, false);
            setIsActivate(false)
        }
        
      };


    return(
        <RigidBody
            onIntersectionEnter={handleIntersection}
            onIntersectionExit={handleIntersectionExit}
            position={position}
            type="fixed"
            sensor={true}
        >
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color={isActivate ? 'yellow' : 'gray'} />
            </mesh>
        </RigidBody>
    )
}


export default Plate