import { createContext, useEffect, useRef, useState } from 'react';
import { auth } from '../firebase-config';

export type AuthContextType = {
  isAuth: boolean;
  loginUser?: any;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
});

const AuthProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false);

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
  return <AuthContext.Provider value={{ isAuth, loginUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
