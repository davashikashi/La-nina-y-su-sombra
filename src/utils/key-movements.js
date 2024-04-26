import { useMemo } from "react"

export default function useMovements(){
    const MOVEMENTS = {
        forward: "forward",
        backward: "backward",
        leftward: "leftward",
        rightward: "rightward",
        jump: "jump",
        exit: "exit",
        run: "run",
    }

    const map = useMemo(() => {
        return [
            {name: MOVEMENTS.forward, keys: ["ArrowUp","KeyW"]},
            {name: MOVEMENTS.backward, keys: ["ArrowDown","KeyS"]},
            {name: MOVEMENTS.leftward, keys: ["ArrowLeft","KeyA"]},
            {name: MOVEMENTS.rightward, keys: ["ArrowRight","KeyD"]},
            {name: MOVEMENTS.jump, keys: ["Space"]},
            {name: MOVEMENTS.exit, keys: ["Escape"]},
            {name: MOVEMENTS.run, keys: ["Shift"]},
        ]
    }, []);

    return map;
}