import { createContext } from "react";
import { doctors } from "../assets/assets";
export const ApppContext= createContext()


const AppContextProvider =(props)=>{


    const currencySymbol = '₹';

    const value={
        doctors,currencySymbol
    }

    return(
        <ApppContext.Provider value={value}>
            {props.children}
        </ApppContext.Provider>
    )

}
export default AppContextProvider; 