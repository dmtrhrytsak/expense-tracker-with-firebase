import { createContext, useContext } from 'react';

import useAuth from '../hooks/useAuth';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  isInitializing: boolean;
  signInWithCredentials: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOutFromAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitializing: true,
  signInWithCredentials: async (email: string, password: string) => {},
  signUpWithEmailAndPassword: async (email: string, password: string) => {},
  signOutFromAccount: async () => {},
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
