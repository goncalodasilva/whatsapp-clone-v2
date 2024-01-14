import { FirebaseError } from "firebase/app";
import { User, UserCredential, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig"

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