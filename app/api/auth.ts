import { FirebaseError } from "firebase/app";
import { User, UserCredential, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
    console.log('create')
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        user = userCredential.user;
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
    console.log('sign in')

}