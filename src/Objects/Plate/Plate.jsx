import { useEffect, useState } from "react"
import { useGameContext } from "../../context/GameContext"
import { RigidBody } from "@react-three/rapier"
import activar from "../../Sounds/plate.mp3"
import { useTexture } from "@react-three/drei"

const Plate = ({id,position}) => {
    const [isActivate,setIsActivate] = useState(false)
    const { placasPresion, togglePlacaPresion } = useGameContext();
    const plateSound = new Audio(activar)


    const TexturePath = "assets/textures/plate/"

    // Cargar la textura
    const propsPlateTexture = useTexture({
        map: TexturePath + "painted_concrete_diff_1k.jpg",
        normalMap: TexturePath + "painted_concrete_nor_gl_1k.jpg",
        roughnessMap: TexturePath + "painted_concrete_rough_1k.jpg",
        diplacementMap: TexturePath + "painted_concrete_disp_1k.jpg"
    })
  
    const handleIntersection = (event) => {
        if(event.colliderObject.name === "rigid caja"){
            togglePlacaPresion(id, true);
            setIsActivate(true)
            plateSound.play()
            console.log("placa activada")
            
        }
    };

    const handleIntersectionExit = (event) => {
        if(event.colliderObject.name === "rigid caja"){
            togglePlacaPresion(id, false);
            setIsActivate(false)
            plateSound.play()
            console.log("placa desactivada")
            
        }
        
      };

    useEffect(() => {
        setIsActivate(placasPresion[id])
    }, [placasPresion])


    return(
        <RigidBody
            onIntersectionEnter={handleIntersection}
            onIntersectionExit={handleIntersectionExit}
            position={position}
            type="fixed"
            sensor={true}
        >
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 0.1, 2]} />
                <meshStandardMaterial {...propsPlateTexture} />
            </mesh>
        </RigidBody>
    )
}


export default Plate