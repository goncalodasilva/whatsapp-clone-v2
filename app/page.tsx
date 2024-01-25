'use client'

import { useRouter } from 'next/navigation';
import { useGlobalContext } from './Context/store';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getUserFromCache } from './local/utils';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Chat, Message, getLatestMessages, getUserChats } from './api/database';

export default function Home() {
  const { userId, setUserId, setData } = useGlobalContext();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatMessages, setChatMessages] = useState<Map<string, Message[]>>(new Map<string, Message[]>());

  const router = useRouter(); 

  useEffect(() => {
    const cachedUser: User | null = getUserFromCache();
    if (!userId) {
      if (cachedUser) {
        setUserId(cachedUser.uid);
        setData({ user: cachedUser });
      } else {
        router.push('/login');
      }
    }
  }, [userId, router, setData, setUserId])

  useEffect(() => {
    console.log('useEffect Chatmessages')
    if (userId) {
      // clean chats and messages
      setChatMessages(new Map() as Map<string, Message[]>);
      getUserChats(userId)
        .then(chats => {
          setChats(() => chats);
          chats.forEach(chat => getLatestMessages(chat)
          .then(msgs => {
            setChatMessages(prevChatMessages => {
              const newChatMessages = new Map(prevChatMessages);
              newChatMessages.set(chat.id, msgs);
              return newChatMessages;
            });
          })
          )})
          .catch(e => console.error(e));
        }
      }, [userId])
      
      useEffect(() => {
        console.log('new messages', chatMessages)

      }, [chatMessages])

  return (
    <div className='grid place-items-center h-screen bf-gray-300'>
      <div className='flex border-2 border-red-500 -mt-12 h-[90vh] w-[90vw] shadow-lg'>

        {!userId ? (
          <Loading />
        ) : (
          <div className='flex w-full rounded-lg'>
            <div className='w-1/3 border-2 border-blue-500 p-4 rounded-l-lg'>
              <Sidebar />
            </div>
            <div className='w-2/3 border-2 bg-green-800 p-4 rounded-r-lg'>
              <ChatArea chatId={'PentqdTlzC3kUdAzeSSn'} chatMessagesMap={[chatMessages, setChatMessages]} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
