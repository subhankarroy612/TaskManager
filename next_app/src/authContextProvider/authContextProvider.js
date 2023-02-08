import { createContext, useState } from "react";


export const authContext = createContext();

export default function authContextProvider({ children }) {

    const [isAuth, setAuth] = useState(false)

    return <authContext.Provider value={{isAuth, setAuth}}>{children}</authContext.Provider>
}