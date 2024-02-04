
'use client';

import { User } from "firebase/auth";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { Chat } from '../api/database';

type DataType = {
    user: User
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data: DataType | null,
    setData: Dispatch<SetStateAction<DataType | null>>,
    chats: Chat[],
    setChats: Dispatch<SetStateAction<Chat[]>>,
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    data: null,
    setData: (): DataType | null => null,
    chats: [], 
    setChats: (): Chat[] => []
})

export const GlobalContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState<null | DataType>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    
    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData, chats, setChats }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);