import { Children, createContext,useContext } from "react";

const UserContext=createContext();

export const UsercontextProvider=({Children})=>{
    return <UserContext.Provider value={{user:"xyz"}}>{Children}</UserContext.Provider>
}


export const UserData=useContext(UserContext)