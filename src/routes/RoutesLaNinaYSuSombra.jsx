import { BrowserRouter, Route, Routes } from "react-router-dom"
import Level3 from "../pages/level3/Level3"
import Level2 from "../pages/leveldark/Leveldark.jsx"

export default function RoutesLaNinaYSuSombra(){ 
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/level2" element={<Level2/>} />
            </Routes>
        </BrowserRouter>
    )
}