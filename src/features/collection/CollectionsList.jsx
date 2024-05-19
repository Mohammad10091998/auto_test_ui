import { useNavigate } from "react-router-dom";
import Collection from "./Collection";
import { useEffect, useState } from "react";
import { useCollection } from "../../contexts/CollectionContext";
import { ArrowPathIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

function CollectionsList() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const { getCollections, deleteCollection } = useCollection();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const popUpAddCollectionModal = () => {
    navigate("/collections/addcollection");
  };

  const handleDelete = async (collectionId) => {
    await deleteCollection(collectionId);

    const collectionSnapshot = await getCollections();
    const collectionList = [];
    collectionSnapshot?.forEach((doc) => {
      // Push each collection's ID and data to the collectionList array
      collectionList.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    // Sort collectionList based on the createdOn field in descending order
    collectionList.sort((a, b) => {
      return b.data.createdOn - a.data.createdOn;
    });
    // Update the state with the collectionList array
    setCollections(collectionList);
  };

  useEffect(() => {
    async function fetchCollection() {
      try {
        setLoading(true);
        const collectionSnapshot = await getCollections();
        const collectionList = [];
        collectionSnapshot?.forEach((doc) => {
          //Push each collection's ID and data to the collectionList array
          collectionList.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        //Sort collectionList based on the createdOn field in descending order
        collectionList.sort((a, b) => {
          return b.data.createdOn - a.data.createdOn;
        });
        //Update the state with the collectionList array
        setCollections(collectionList);
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    }
    fetchCollection();
  }, [getCollections, refresh]);

  return (
    <div className="bg-white border-r h-screen flex flex-col justify-start items-center overflow-y-auto">
      <div className="fixed top-14 z-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRefresh((prev) => !prev)}
            disabled={loading}
            className="py-2.5"
          >
            <ArrowPathIcon
              className={`w-6 h-6 fill-black hover:fill-blue-500 ${
                loading ? "animate-spin duration-500" : ""
              }`}
            />
          </button>
          <button
            type="button"
            onClick={popUpAddCollectionModal}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ml-4"
          >
            add collection
          </button>
        </div>
      </div>

      {collections.length < 1 && !loading && (
        <div>
          <h1 className="px-10 mt-20 font-monospace font-semibold text-green-700">
            start adding collections....
          </h1>
        </div>
      )}
      <div className="overflow-y-auto h-full w-full flex flex-col items-center mb-24 mt-24">
        {/* Collection items */}
        {!loading ? (
          collections.map((item) => (
            <Collection
              key={item.id}
              id={item.id}
              name={item.data.name}
              collectionId={item.data.collectionId}
              deleteCollection={handleDelete}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center rounded-m px-3 py-4 text-sm font-semibold text-black">
            <Cog6ToothIcon className="h-7 w-7 animate-spin fill-green-600 mt-2" />
            <h2 className="pt-1 pl-2">loading collections...</h2>
          </div>
        )}

        {/* Scrollbar styling */}
        <style>
          {`
            /* Track */
            ::-webkit-scrollbar {
              width: 3px;
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 4px;
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}
        </style>
      </div>
    </div>
  );
}
export default CollectionsList;
