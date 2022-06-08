import {createContext, useEffect, useRef, useState} from 'react';
import {auth} from '../firebase-config';
import {User} from '@firebase/auth-types'


export type AuthContextType = {
    isAuth: boolean | null;
    loginUser?: (username: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
});

const AuthProvider = ({children}: any) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(false);
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
            }
        })
        if (user)
            setIsAuth(true)
        return () => {
            unsubscribe();
        }
    }, [user]);


    const loginUser = async (username: string, password: string) =>
        new Promise<void>(async (resolve, reject) => {
            try {
                const result = await auth.signInWithEmailAndPassword(username, password);

                setIsAuth(true);
                resolve();
            } catch (error) {
                reject('Geslo ali uporabniško ime je napačno');
            }
        });
    return <AuthContext.Provider value={{isAuth, loginUser}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
