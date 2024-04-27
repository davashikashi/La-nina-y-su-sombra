import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import "./styles.css";
import { Loader } from "@react-three/drei";

const root = createRoot(document.getElementById("root"));

root.render(<>
  <Experience/>
  <Loader />
  </>
)
