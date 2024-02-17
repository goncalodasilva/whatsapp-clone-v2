
import { FormEvent, FormEventHandler, useState } from "react";
import { createAccountEmail, signInEmail } from "../api/auth";
import { useGlobalContext } from "../Context/store";
import { User } from "firebase/auth";
import { setUserInCache } from "../local/utils";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { login_button } from "../components/styles";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type Errors = {
    email: string | null;
    password: string | null;
}
interface SignOrCreateAccountWithEmailProps {
    isCreate: boolean;
}

const SignOrCreateAccountWithEmail: React.FC<SignOrCreateAccountWithEmailProps> =
    ({ isCreate }) => {
        const router: AppRouterInstance = useRouter();

        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [errors, setErrors] = useState<Errors>({ email: null, password: null });


        const { setUserId, setData } = useGlobalContext();

        const setUser = (user: User) => {
            setUserId(user.uid);
            setData({ user: user });
            setUserInCache(user);
        }

        const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setErrors({ email: null, password: null });
            setEmail(e.target.value);
        };

        const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setErrors({ email: null, password: null });
            setPassword(e.target.value);
        };

        const handleForm = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (isCreate) {
                await createAccountEmail(email, password, setUser);
            } else {
                await signInEmail(email, password, setUser);
            }
            router.push('/');
        }

        return (
            <div>
                <form
                    className="flex flex-col justify-center items-center h-full m-5"
                    onSubmit={handleForm}>
                    <TextField
                        className="bg-slate-100"
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        className="bg-slate-100"
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <br />
                    <Button className={login_button}
                        variant="contained"
                        size="large"
                        type="submit"
                        startIcon={<MailOutlineIcon />}>
                        {!isCreate ? (<p>Log in</p>) : (<p>Create Account</p>)}
                    </Button>
                </form>
                <br />
                {!isCreate ?
                    (
                        <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0', color: 'white' }}>
                            You don &apos t have an account yet? <Link href="/createAccountWithEmail">Create account with email</Link>
                        </p>
                    ) : (<br />)
                }
            </div>
        )
    }

export default SignOrCreateAccountWithEmail