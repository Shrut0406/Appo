import { createContext } from "react";
import { doctors } from "../assets/assets";
export const ApppContext= createContext()


const AppContextProvider =(props)=>{

    const value={
        doctors
    }

    return(
        <ApppContext.Provider value={value}>
            {props.children}
        </ApppContext.Provider>
    )

}
export default AppContextProvider; 