import React, { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.init";

export const MyContext = createContext(null);
//email register
const emailRegister = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
//email login
const emailLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
//google login
const googleProvider = new GoogleAuthProvider();
const googleLogin = () => {
  return signInWithPopup(auth, googleProvider);
};
//pass reset
const passReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};
//signout
const logOut = () => {
  return signOut(auth);
};
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const contextData = {
    emailRegister,
    user,
    setUser,
    googleLogin,
    emailLogin,
    passReset,
    logOut,
    loading,
    setLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return <MyContext value={contextData}>{children}</MyContext>;
};

export default ContextProvider;