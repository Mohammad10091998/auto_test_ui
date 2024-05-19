import {
  PencilSquareIcon,
  TrashIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

const typeColors = {
  custom_get: "#00BCD4",   
  custom_post: "#4CAF50",   
  custom_put: "#FF9800",    
  custom_delete: "#F44336", 
  system_get: "#00BCD4",    
  system_post: "#4CAF50",   
  system_put: "#FF9800",    
  system_delete: "#F44336", 
};

const viewApiType = {
  custom_get: "manual get test",   
  custom_post: "manual post test",   
  custom_put: "manual put test",    
  custom_delete: "manual delete test", 
  system_get: "automated get test",    
  system_post: "automated post test",   
  system_put: "automated put test",    
  system_delete: "automated delete test", 
}


function TestingAPI({ id, apiType, name, collectionId, collectionName, deleteApiById }) {
  const getTypeColor = (type) => typeColors[type] || "black"; // Default to black if type not found in mapping
  const getApiType = (type) => viewApiType[type] 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      await deleteApiById(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(
      `/addapi/${apiType}/${apiType}?collectionId=${collectionId}&collectionName=${collectionName}&apiId=${id}`
    );
  };

  const testApi = () => {
    navigate(`/apitesting/?collectionId=${collectionId}&collectionName=${collectionName}&apiId=${id}`);
  }

  return (
    <div className="flex justify-between h-12 border-b pt-3  w-full">
      
      {error && <p>{error}</p>}
      <div className="flex items-center w-3/5">
        <p
          className={`py-1 px-4 font-monspace font-bold mx-4 w-48  shadow-lg`}
          style={{color: `${getTypeColor(apiType)}`}}
        >
          {getApiType(apiType)}
        </p>

        <p className="ml-10 whitespace-nowrap overflow-hidden truncate">{name}</p>
      </div>
      <div className="flex justify-around w-2/5">
        <button type="button" onClick={() => handleEdit(id)} className="">
          <PencilSquareIcon
            className="h-4 w-4 fill-blue-800 hover:fill-blue-600"
            aria-hidden="true"
          />
        </button>
        {!loading ? (
          <button onClick={() => handleDelete(id)} type="button" className="">
            <TrashIcon
              className="h-4 w-4 fill-red-700 hover:fill-red-500"
              aria-hidden="true"
            />
          </button>
        ) : (
          <Spinner color="red-600" height={5} width={5} />
        )}
        <button type="button" onClick={testApi}>
          <Cog6ToothIcon
            className="h-6 w-6 fill-cyan-700 hover:fill-cyan-600"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

TestingAPI.propTypes = {
  id:PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  apiType:PropTypes.string.isRequired,
  collectionId : PropTypes.string.isRequired,
  collectionName : PropTypes.string.isRequired,
  deleteApiById :PropTypes.func.isRequired,
};


export default TestingAPI;
