import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react";
export const ApppContext = createContext()


const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const currencySymbol = '₹';
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);
    
    const loadUserProfile=async()=>{
        try {
            const {data}=await axios.post(backendUrl+'api/user/get-profile',{}, {headers: {token}});
            if(data.success){
                setUserData(data.user);
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
 
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + 'api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors);
                // toast.success("Data fetched")
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getDoctorsData();
    }, [])
 
    useEffect(()=>{
        if(token){
            loadUserProfile();
        }
        else{
            setUserData(false);
        }
    },[token]);

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfile
    }

    return (
        <ApppContext.Provider value={value}>
            {props.children}
        </ApppContext.Provider>
    )

}
export default AppContextProvider; 