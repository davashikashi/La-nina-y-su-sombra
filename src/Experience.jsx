import { AvatarProvider } from "./context/AvatarContext";
import RoutesLaNinaYSuSombra from "./routes/RoutesLaNinaYSuSombra";

const Experience = () =>{
    return(
        <AvatarProvider>
            <RoutesLaNinaYSuSombra/>
        </AvatarProvider>
    )
}

export default Experience;