import { User } from "firebase/auth";

export const setUserInCache = (user: User) => {
    if (typeof sessionStorage === undefined) {
        return;
    }
    const dataStr = JSON.stringify(user);
    sessionStorage.setItem(process.env.NEXT_PUBLIC_USER_OBJ || '', dataStr);
}

export const removeUserFromCache = () => {
    if (typeof sessionStorage === undefined) {
        return;
    }
    sessionStorage.removeItem(process.env.NEXT_PUBLIC_USER_OBJ || '');
}

export const getUserFromCache = (): User | null => {
    if (typeof sessionStorage === undefined) {
        return null;
    }
    const userStr: string | null = sessionStorage.getItem(process.env.NEXT_PUBLIC_USER_OBJ || '');
    const user: User | null = userStr ? JSON.parse(userStr) as User : null;
    return user;
}