import { FirebaseError } from "firebase/app";
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig"
import { Email } from "@mui/icons-material";

export const signInPopUp = async (setUser: Function) => {
    let user: User | null = null;
    signInWithPopup(auth, provider)
        .then((result: UserCredential) => {
            user = result.user;
            setUser(user);
        })
        .catch((error: FirebaseError) => {
            console.error(error.code, error.message)
        });

    return user;
}
export const createAccountEmail = async (email: string, password: string, setUser: Function) => {
    let user: User | null = null;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            user = userCredential.user;
            // TODO: create user in db OR do it on firebase side
            setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error: ${errorCode} - ${errorMessage}`, error);
            // ..
        });
        return user;
    }
    
    export const signInEmail = async (email: string, password: string, setUser: Function) => {
        let user: User | null = null;
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error: ${errorCode} - ${errorMessage}`, error);
        });
        return user;
}