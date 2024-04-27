import { Environment, Sparkles } from '@react-three/drei';
import { Color } from 'three';

export default function MapEnvironments() {
    return <>
        <Environment
            files={"assets/hdris/small_dark_cave.hdr"} 
            preset={null}
            background={true}
            ground={{
                height:20,
                scale: 500,
                radius: 500
            }
            }
        />
        {/* <Sparkles
            color={new Color ("#FFFF")} 
            count={100}
            size={15}
            fade={false}
            speed={5}
            scale={50}
        /> */}
    </>
}