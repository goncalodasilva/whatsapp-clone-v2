
'use client';

import { User } from "firebase/auth";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
    user: User
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data: DataType | null,
    setData: Dispatch<SetStateAction<DataType | null>>
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    data: null,
    setData: (): DataType | null => null 
})

export const GlobalContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState<null | DataType>(null);
    
    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);