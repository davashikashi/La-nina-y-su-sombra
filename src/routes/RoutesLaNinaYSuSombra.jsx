import { BrowserRouter, Route, Routes } from "react-router-dom"
import Level3 from "../pages/level3/Level3"

export default function RoutesLaNinaYSuSombra(){ 
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/level3" element={<Level3/>} />
            </Routes>
        </BrowserRouter>
    )
}