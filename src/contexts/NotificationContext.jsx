import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";
const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();

  const shareCollection = async (userEmail, collectionId,collectionName) => {
    await addDoc(collection(firestore, "UserNotification"), {
      userEmail,
      collectionId,
      collectionName,
      senderName : currentUser?.displayName,
      createdOn: new Date(),
    });
  };

  const getAllNotification = async () => {
    try {
      if(!currentUser){
        throw new Error('Login to see your notifications')
      }
      const notificationQuery = await query(
        collection(firestore, "UserNotification"),
        where("userEmail", "==", currentUser?.email)
      );
      const notificationsSnapshot = await getDocs(notificationQuery);

      return notificationsSnapshot;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const acceptCollectionRequest = async (collectionId) => {
    await addDoc(collection(firestore, "UserCollection"), {
      userName: currentUser?.displayName,
      userId: currentUser?.uid,
      collectionId,
      createdOn: new Date(),
    });
  };

  const deleteNotification = async (id) => {
    try {
      await deleteDoc(doc(firestore, "UserNotification", id));
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  const value = {
    shareCollection,
    getAllNotification,
    acceptCollectionRequest,
    deleteNotification,
  };

  return (
    <div>
      <NotificationContext.Provider value={value}>
        {children}
      </NotificationContext.Provider>
    </div>
  );
}
NotificationProvider.propTypes = {
  children: PropTypes.node, // Children should be a valid React node
};
