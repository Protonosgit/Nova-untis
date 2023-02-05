import React from "react";

const ContextStore = React.createContext();

const StoreProvider = ({children}) => {
    const [Schoolname,setSchoolname] = React.useState('Select your school');
    const [UntisSession,setUntisSession] = React.useState(null);
    const [ActiveUser,setActiveUser] = React.useState(1);
    const [SchoolInfo,setSchoolInfo] = React.useState([]);

    return(
        <ContextStore.Provider value={{
            Schoolname,setSchoolname,
            SchoolInfo, setSchoolInfo,
            ActiveUser,setActiveUser,
            UntisSession,setUntisSession,

            }}>
            {children}
        </ContextStore.Provider>
    )
}
export {ContextStore, StoreProvider};