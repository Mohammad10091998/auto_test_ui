import { useLocation, useNavigate } from "react-router-dom";
import TestingAPI from "./TestingAPI";
import { useEffect, useState } from "react";
import { useAPI } from "../../contexts/APICollectionContext";
import Loader from "../../ui/Loader";

function TestingAPIList() {
  const [apiList, setApiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionId = queryParams.get("collectionId");
  const collectionName = queryParams.get("collectionName");
  const { getApisByCollectionId, deleteApiById } = useAPI();

  useEffect(() => {
    async function fetchApisByCollectionId() {
      try {
        setLoading(true);
        const apiSnapshot = await getApisByCollectionId(collectionId);
        const apiCurrentList = [];
        apiSnapshot?.forEach((doc) => {
          apiCurrentList.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // Sort the list based on time
        apiCurrentList.sort((a, b) => {
          return b.data.createdOn - a.data.createdOn;
        });
        setApiList(apiCurrentList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections: ", error);
        setLoading(false);
      }
    }
    fetchApisByCollectionId();
  }, [collectionId, getApisByCollectionId,refresh]);

  const popUpChooseAnApiToAdd = () => {
    navigate(
      `/chooseapi?collectionId=${collectionId}&collectionName=${collectionName}`
    );
  };

  const handleDelete = async (id) => {
    await deleteApiById(id);
    setRefresh(prev => !prev);
  };

  return (
    <div className="bg-slate-100 overflow-y-auto max-w-screen-xl">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center">
          <div className="flex justify-center items-center p-4 fixed top-10 z-10">
            <div>
              <h1 className="h-10 font-semibold font-mono p-2 ml-6 mr-10">
                {collectionName}
              </h1>
            </div>

            {collectionId ? (
              <div className="mb-2 mt-2">
                <button
                  type="button"
                  onClick={popUpChooseAnApiToAdd}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Add Your API
                </button>
              </div>
            ) : (
              <h1 className="font-bold">
                please select a collection to view your apis
              </h1>
            )}
          </div>
        </div>
      )}
      {apiList.length > 0 && ( // Render APIs only if the list is not empty
        <div className="overflow-y-auto h-full w-full flex flex-col items-center mb-12 mt-24 sm:mt-18">
          {/* Map over the array  */}
          {apiList.map(({ id, data }, index) => (
            <div
              key={id}
              className={`w-full ${
                index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
              }`}
            >
              <TestingAPI
                id={id}
                {...data}
                collectionId={collectionId}
                collectionName={collectionName}
                deleteApiById={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestingAPIList;
