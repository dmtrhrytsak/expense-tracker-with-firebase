import { useEffect, useState } from 'react';
import { doc, collection, setDoc } from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';

import { auth } from '../services/firestore/firestore.config';
import { saveUser } from '../services/firestore/firestore.helpers';
import { User } from '../types';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const signInWithCredentials = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { isNewUser } = getAdditionalUserInfo(userCredentials)!;

      if (isNewUser) {
        await saveUser(userCredentials.user.uid);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const signOutFromAccount = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setIsInitializing(true);

        if (currentUser) {
          const user = {
            id: currentUser.uid,
            email: currentUser.email!,
          };

          setUser(user);
        } else {
          setUser(null);
        }

        setIsInitializing(false);
      },
      (error) => {
        alert(error.message);
      }
    );

    return unsubscribe;
  }, []);

  return {
    user,
    isInitializing,
    signInWithCredentials,
    signUpWithEmailAndPassword,
    signOutFromAccount,
  };
};

export default useAuth;
