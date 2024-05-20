import { createContext, useContext } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import PropTypes from 'prop-types';
import { firestore } from "../firebase";

const CollectionContext = createContext();

export function useCollection() {
  return useContext(CollectionContext);
}
// Function to generate a unique ID using a timestamp and a random number
const generateUniqueId = () => {
  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Generate a random number
  const randomNumber = Math.floor(Math.random() * 10000);

  // Concatenate the timestamp and random number to create the unique ID
  const uniqueId = `${timestamp}${randomNumber}`;

  return uniqueId;
};

export function CollectionContextProvider({ children }) {
  const { currentUser } = useAuth();

  const createCollection = async (name) => {
    const collectionId = generateUniqueId();
    await addDoc(collection(firestore, "Collection"), {
      name,
      createdBy: currentUser?.displayName,
      createdById: currentUser?.uid,
      createdOn: new Date(),
      collectionId,
    });

    await addDoc(collection(firestore, "UserCollection"), {
      userName: currentUser?.displayName,
      userId: currentUser?.uid,
      collectionId,
      createdOn: new Date(),
    });
  };

  const getCollections = async () => {
    try {
      const userCollectionquery = await query(
        collection(firestore, "UserCollection"),
        where("userId", "==", currentUser?.uid)
      );
      const userCollections = await getDocs(userCollectionquery);

      const collectionIds = userCollections.docs.map(
        (doc) => doc.data().collectionId
      );
      

      if (collectionIds?.length > 0) {
        const collectionsQuery = await query(
          collection(firestore, "Collection"),
          where("collectionId", "in", collectionIds)
        );
        const collectionsSnapshot = await getDocs(collectionsQuery);
        return collectionsSnapshot;
      }

      return null;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      // Get user collection query using userId and collectionId
      const userCollectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", currentUser?.uid),
        where("collectionId", "==", collectionId)
      );

      // Get documents from user collection
      const querySnapshot = await getDocs(userCollectionQuery);

      // Iterate over each document and delete it
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  const value = {
    createCollection,
    getCollections,
    deleteCollection,
  };

  return (
    <div>
      <CollectionContext.Provider value={value}>
        {children}
      </CollectionContext.Provider>
    </div>
  );
}
CollectionContextProvider.propTypes = {
  children: PropTypes.node // Children should be a valid React node
};