import { TrashIcon,ShareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Collection({ name, collectionId, deleteCollection }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteCollection(collectionId);
    setIsDeleting(false);
  };
  const openApiCollection = () => {
    navigate(`/collections?collectionId=${collectionId}&collectionName=${name}`);
  }
  const shareCollection = () => {
    navigate(`/collections/sharecollection/?collectionId=${collectionId}&collectionName=${name}`);
  }

  return (
    <div className="h-12 p-2  flex items-center justify-between w-full ">
      {/* Apply custom style to truncate long names */}
      <button
      onClick={openApiCollection}
        className="font-mono whitespace-nowrap overflow-hidden truncate rounded-lg hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-white  "
        style={{ maxWidth: "250px" }}
      >
        {name}
      </button>
      <div className="flex">
        <button
          onClick={handleDelete}
          type="button"
          className="relative p-1 text-black hover:text-slate-400 focus:outline-none"
        >
          {!isDeleting ? (
            <TrashIcon
              className="h-4 w-4 fill-red-700 hover:fill-red-500"
              aria-hidden="true"
            />
          ) : (
            <Spinner color="red-600" height={5} width={5} />
          )}
        </button>
        <button
        onClick={shareCollection} 
        className="px-1 sm:px-5">
          <ShareIcon className="w-5 h-5 fill-blue-600 bg-slate-50 shadow-md rounded-lg hover:fill-blue-500" />
        </button>
      </div>
    </div>
  );
}

Collection.propTypes = {
  name: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired, 
  deleteCollection : PropTypes.func.isRequired
};
export default Collection;
