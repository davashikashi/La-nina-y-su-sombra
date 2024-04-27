import { BrowserRouter, Route, Routes } from "react-router-dom"
import Level3 from "../pages/level3/Level3"
import Level1 from "../pages/Level1/Level1"

export default function RoutesLaNinaYSuSombra(){ 
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/level3" element={<Level3/>} />
                <Route path="/level1" element={<Level1/>} />
            </Routes>
        </BrowserRouter>
    )
}