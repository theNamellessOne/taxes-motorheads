"use client";

import { Session, User } from "lucia";
import { ReactNode, createContext, useContext } from "react";

type AuthContextType = {
  session?: Session | null;
  user?: User | null;
};

const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (
  props: AuthContextType & { children: ReactNode },
) => {
  return (
    <AuthContext.Provider value={{ session: props.session, user: props.user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
