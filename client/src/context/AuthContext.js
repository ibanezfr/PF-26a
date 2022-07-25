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
    const credentials = createUserWithEmailAndPassword(auth, email, password);
    // await sendEmailVerification(auth.currentUser);
    return credentials;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPass = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
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
