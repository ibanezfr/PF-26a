import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,

  // sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

// Hook personalizado useAuth
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no auth context provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // await sendEmailVerification(auth.currentUser);
    return credentials;
  };

  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  };

  const resetPass = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPass,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
