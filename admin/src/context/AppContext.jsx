import { createContext } from "react";

export const Appcontext = createContext();

const AppContextProvider = (props) => {

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }
  const currency='₹ '
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const slotDateFormat = (slotDate) => {
    const dateArr = slotDate.split('_');

    return dateArr[0] + " " + months[dateArr[1] - 1] + " " + dateArr[2];
  }
  const value = {
    calculateAge,
    slotDateFormat,
    currency
  }

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  )
}

export default AppContextProvider;