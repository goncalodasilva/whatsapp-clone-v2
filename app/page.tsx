'use client'

import { useRouter } from 'next/navigation';
import { useGlobalContext } from './Context/store';
import { useEffect } from 'react';
import { User } from 'firebase/auth';
import { getUserFromCache } from './local/utils';

export default function Home() {
  const { userId, setUserId, setData } = useGlobalContext();

  const router = useRouter();
  
  useEffect(() => {
    const cachedUser: User | null  = getUserFromCache();
    if (!userId) {
      if (cachedUser) {
        setUserId(cachedUser.uid);
        setData({ user: cachedUser })
      } else {
        router.push('/login')
      }
    } 
  }, [userId, router, setData, setUserId])

  return (
    <div>
        <span>
          Hello world!
        </span>
    </div>
  )
}
