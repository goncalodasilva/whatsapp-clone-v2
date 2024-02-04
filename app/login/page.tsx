'use client'

import Image from "next/image"

import SignInButton from "./SignInButton"
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import { signInEmail } from "../api/auth";
import { User } from "firebase/auth";
import SignOrCreateAccountWithEmail from "./SignOrCreateAccountWithEmail";
import { login_container } from "../components/styles";


const Login = () => {
    const { userId, data } = useGlobalContext();
    const router = useRouter();

    useEffect(() => {
        if (userId && data) {
            router.push('/');
        }
    }, [userId, data, router]);

    return (
        <div className={login_container}>
            <Image className="object-contain h-24 mb-10"
                src="/logo-500.png"
                alt=""
                width={100}
                height={100}
            />
            <h1 className="text-xl font-bold text-slate-100">Sign in to WhatsApp</h1>
            <SignOrCreateAccountWithEmail isCreate={false} />
            <hr style={{ width: '50px', margin: '16px 0' }}></hr>
            <br />
            <p>Or</p>
            <SignInButton />
        </div>

    )
}

export default Login