import React from "react";

const ContextStore = React.createContext();

const StoreProvider = ({children}) => {
    const [Schoolname,setSchoolname] = React.useState('Select your school');
    const [SchoolInfo,setSchoolInfo] = React.useState([]);

    return(
        <ContextStore.Provider value={{
            Schoolname,setSchoolname,
            SchoolInfo, setSchoolInfo

            }}>
            {children}
        </ContextStore.Provider>
    )
}
export {ContextStore, StoreProvider};