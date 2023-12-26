import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const tokenString = localStorage.getItem('user');
  const tokenObject = JSON.parse(tokenString);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (tokenObject) {
        const userDocRef = doc(db, "users", tokenObject._id);

        if (userDocRef) {
          const unSub = onSnapshot(userDocRef, (doc) => {
            setCurrentUser(doc.data());
            console.log("doc", doc.data());
          });
        } else {
          await setDoc(doc(db, "users", tokenObject._id), {
            uid: tokenObject._id,
            displayName: `${tokenObject.lastName} ${tokenObject.firstName}`,
            email: tokenObject.email,
            photoURL: tokenObject.photo,
          });

          await setDoc(doc(db, "userChats", tokenObject._id), {});

          const newUserDocRef = doc(db, "users", tokenObject._id);
          const unSub = onSnapshot(newUserDocRef, (doc) => {
            setCurrentUser(doc.data());
            console.log("doc", doc.data());
          });

          return () => {
            unSub();
          };
        }
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
