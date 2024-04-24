import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import "./styles.css";
import { Canvas } from "@react-three/fiber";

const root = createRoot(document.getElementById("root"));

root.render(
    <Canvas>
        <Experience/>
    </Canvas>
    
)