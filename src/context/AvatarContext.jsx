import { createContext, useContext, useState } from "react";

export const avatarContext = createContext();

export const useAvatar = () =>{
    const context = useContext(avatarContext);

    if(!context){
        console.error("Error creando avatar context");
        return
    }

    return context;
};

export function AvatarProvider({ children }){
    const [avatar,SetAvatar] = useState({
        ref: null,
        body:null,
    })

    return(
        <avatarContext.Provider value={{avatar,SetAvatar}}>
            {children}
        </avatarContext.Provider>
    )
}