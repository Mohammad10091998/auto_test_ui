import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const signUp = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    //Update display name
    await updateProfile(user, {
      displayName: name,
    });

    await addDoc(collection(firestore, "User"), {
      name,
      email,
      createdOn: new Date(),
    });
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const passwordlessLogin = async (email) => {
    await sendSignInLinkToEmail(auth,email,{
      url:'http://localhost:5173/login',
      handleCodeInApp : true,
    });
    window.localStorage.setItem('emailForSignIn', email);
  }

  const logOut = async () => {
    await signOut(auth);
  };

  async function getUserByEmailAsync(email) {
    try {
      const userQuery = query(
        collection(firestore, "User"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        // If there are matching users, return the first one
        return querySnapshot.docs[0];
      } else {
        // If no matching user found
        return null;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const resetpassword = async (email) => {
    await sendPasswordResetEmail(auth,email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
    getUserByEmailAsync,
    passwordlessLogin,
    resetpassword
  };

  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
