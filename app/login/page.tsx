'use client'

import Image from "next/image"

import SignInButton from "./SignInButton"
import { useEffect } from "react";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";


const Login = () => {
    const { userId, data } = useGlobalContext();
    const router = useRouter();

    useEffect(() => {
        if (userId && data) {
            router.push('/');
        }
    }, [userId, data, router]);
        
    return (
            <div className="p-24 m-5 h-full w-full grid place-items-center bg-[rgb(75,198,96)] rounded-lg shadow-md">
                <Image className="object-contain h-24 mb-10"
                    src="/whatsapp-logo.webp"
                    alt=""
                    width={100}
                    height={100}
                />
                <h1 className="text-xl font-bold text-green-800">Sign in to WhatsApp</h1>
                <SignInButton />              
            </div>

    )
}

export default Login