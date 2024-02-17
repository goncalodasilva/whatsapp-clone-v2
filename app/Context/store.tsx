
'use client';

import { User } from "firebase/auth";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { Chat, Message } from '../api/database';

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
    chatMessagesMap: Map<string, Message[]>,
    setChatMessagesMap: Dispatch<SetStateAction<Map<string, Message[]>>>,
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    data: null,
    setData: (): DataType | null => null,
    chats: [], 
    setChats: (): Chat[] => [],
    chatMessagesMap: new Map<string, Message[]>(),
    setChatMessagesMap: (): Map<string, Message[]> => new Map<string, Message[]>()
})

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState<null | DataType>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [chatMessagesMap, setChatMessagesMap] = useState<Map<string, Message[]>>(new Map<string, Message[]>());
    
    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData, chats, setChats, chatMessagesMap, setChatMessagesMap }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);