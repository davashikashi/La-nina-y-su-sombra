
import RoutesLaNinaYSuSombra from "./routes/RoutesLaNinaYSuSombra";
import AuthProvider from "./context/AuthContext"

const Experience = () => {
    return (
        <AuthProvider>
            <RoutesLaNinaYSuSombra />
        </AuthProvider>
        

    )
}

export default Experience;