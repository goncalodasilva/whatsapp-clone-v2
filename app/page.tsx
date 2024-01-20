'use client'

import { useRouter } from 'next/navigation';
import { useGlobalContext } from './Context/store';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getUserFromCache } from './local/utils';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Message, getLatestMessages, getUserChats } from './api/database';

export default function Home() {
  const { userId, setUserId, setData } = useGlobalContext();
  const [chatMessages, setChatMessages] = useState(new Map<string, Message[]>());

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
    if (userId) {
      // clean chats and messages
      setChatMessages(new Map() as Map<string, Message[]>);
      // get user chats
      // get chats last 50 messages
      // put messages in hashmap
      getUserChats(userId)
        .then(chats => chats.forEach(chat => getLatestMessages(chat)
          .then(msgs => {
            const newChatMessages = new Map(chatMessages)
            newChatMessages.set(chat.id, msgs);
            console.log('chatMessages', chatMessages)
            console.log('newChatMessages', newChatMessages)
            setChatMessages(newChatMessages);
          })
          ))
          .catch(e => console.error(e));
        }
  }, [userId])
  

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
            <div className='w-2/3 border-2 border-green-500 p-4 rounded-r-lg'>
              <ChatArea />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
