
import { User } from "firebase/auth"
import { Button } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { useGlobalContext } from "../Context/store"
import { setUserInCache } from "../local/utils"
import { signInPopUp } from "../api/auth"

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
                className="mt-12 text-white hover:bg-white hover:text-green-700 bg-green-700 h-10 rounded-lg"
                variant="contained"
                onClick={signIn}
                startIcon={<GoogleIcon />}>
                Sign in
            </Button>
        </div>
    )
}

export default SignInButton