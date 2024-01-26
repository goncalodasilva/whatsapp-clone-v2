
import { User } from "firebase/auth"
import { Button } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { useGlobalContext } from "../Context/store"
import { setUserInCache } from "../local/utils"
import { signInPopUp } from "../api/auth"
import { login_button } from "../components/styles";

const SignInButton = () => {
    const { setUserId, setData } = useGlobalContext();
    
    const setUser = (user: User) => {
        setUserId(user.uid);
        setData({ user: user });
        setUserInCache(user);
    }

    const signIn = () => {
        signInPopUp(setUser);
    }
    return (
        <div>
            <Button
                className={login_button}
                variant="contained"
                onClick={signIn}
                startIcon={<GoogleIcon />}>
                Sign in
            </Button>
        </div>
    )
}

export default SignInButton