import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import PropTypes from "prop-types";

const APICollectionContext = createContext();
export function useAPI() {
  return useContext(APICollectionContext);
}

export function APICollectionContextProvider({ children }) {
  const { currentUser } = useAuth();

  const createAPI = async (apiDetail, apiType, collectionId) => {
    const newAPIObj = {
      ...apiDetail,
      apiType,
      collectionId,
      createdBy: currentUser?.displayName,
      createdById: currentUser?.uid,
      createdOn: new Date(),
    };

    try {
      const docRef = await addDoc(collection(firestore, "ApiCollection"), {
        ...newAPIObj,
      });
      return docRef.id;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateAPI = async (apiId, apiDetail, apiType, collectionId) => {
    const newAPIObj = {
      ...apiDetail,
      apiType,
      collectionId,
      createdBy: currentUser?.displayName,
      createdById: currentUser?.uid,
      createdOn: new Date(),
    };
    try {
      // Add a new document in collection "cities"
      await setDoc(doc(firestore, "ApiCollection", apiId), {
        ...newAPIObj,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const getApisByCollectionId = async (collectionId) => {
    try {
      if (collectionId) {
        const apiCollectionquery = await query(
          collection(firestore, "ApiCollection"),
          where("collectionId", "==", collectionId)
        );
        const apiCollections = await getDocs(apiCollectionquery);
        return apiCollections;
      }

      return null;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const getApiById = async (id) => {
    const docRef = doc(firestore, "ApiCollection", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      
    }
  };

  const deleteApiById = async (id) => {
    
    await deleteDoc(doc(firestore, "ApiCollection", id));
  };

  const value = {
    createAPI,
    getApisByCollectionId,
    getApiById,
    deleteApiById,
    updateAPI,
  };
  return (
    <div>
      <APICollectionContext.Provider value={value}>
        {children}
      </APICollectionContext.Provider>
    </div>
  );
}

APICollectionContextProvider.propTypes = {
  children: PropTypes.node,
};
