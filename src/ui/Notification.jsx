import PropTypes from "prop-types";
import {
  XMarkIcon,
  CheckBadgeIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { useNotification } from "../contexts/NotificationContext";
import { useEffect, useState } from "react";

function Notification({ closeNotification, isOpen }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { getAllNotification, acceptCollectionRequest, deleteNotification } =
    useNotification();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchNotification() {
      try {
        setLoading(true);
        setError("");
        const notificationSnapshot = await getAllNotification();
        const notificationList = [];
        notificationSnapshot?.forEach((doc) => {
          notificationList.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        //Sort collectionList based on the createdOn field in descending order
        notificationList.sort((a, b) => {
          return b.data.createdOn - a.data.createdOn;
        });
        //Update the state with the collectionList array
        setNotifications(notificationList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNotification();
  }, [getAllNotification, refresh]);

  const acceptCollection = async (id, collectionId) => {
    try {
      setIsAccepting(true);
      await deleteNotification(id);
      await acceptCollectionRequest(collectionId);
      setRefresh(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAccepting(false);
    }
  };

  const denyCollection = async (id) => {
    try {
      setIsDeleting(false);
      await deleteNotification(id);
      setRefresh(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`w-80 sm:w-96 fixed top-12 right-0 z-50 bg-indigo-300 max-h-screen overflow-y-auto transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="">
        {error && <p className="text-red-600 text-center">{error}</p>}
        <div className="flex justify-between">
         

          <div className="group relative flex justify-center">
            <button
              type="button"
              onClick={closeNotification}
              className="m-4 py-2.5 px-5 "
            >
              <XMarkIcon
                className={`w-7 h-7 fill-white hover:fill-blue-500 }`}
              />
            </button>
            <span className="absolute top-12 scale-0 rounded p-2 text-xs text-white group-hover:scale-100">
              close
            </span>
          </div>

          <div className="group relative flex justify-center">
            <button
              type="button"
              onClick={() => setRefresh(prev => !prev)}
              disabled={loading}
              className="m-4 py-2.5 px-5 "
            >
              <ArrowPathIcon
                className={`w-7 h-7 fill-white hover:fill-blue-500 ${
                  loading ? "animate-spin duration-500" : ""
                }`}
              />
            </button>
            <span className="absolute top-12 scale-0 rounded p-2 text-xs text-white group-hover:scale-100">
              refresh
            </span>
          </div>
        </div>
        {notifications?.length == 0 && (
          <p className="text-blue-600 text-center p-4">
            Oops you do not have new notifications. try refreshing !!!
          </p>
        )}
        <div className="">
          {notifications.map((notif, index) => (
            <div
              key={notif.id}
              className={`flex items-center justify-around ${
                index % 2 == 0 ? "bg-indigo-100" : "bg-indigo-50"
              } w-full`}
            >
              <h1 className="m-1 w-1/3">
                {notif.data.senderName} shared {notif.data.collectionName}
              </h1>
              <button
                disabled={loading}
                onClick={() =>
                  acceptCollection(notif.id, notif.data.collectionId)
                }
                className="flex hover:bg-white p-2 rounded-lg"
              >
                <CheckBadgeIcon
                  className={`w-5 h-5 m-1 fill-green-600 hover:fill-green-400 ${
                    isAccepting && "animate-pulse"
                  }`}
                />
                {isAccepting ? (
                  <p className="animate-pulse">accepting...</p>
                ) : (
                  <p>accept</p>
                )}
              </button>
              <button
                disabled={loading}
                onClick={() => denyCollection(notif.id)}
                className="flex hover:bg-white p-2 rounded-lg}"
              >
                <XCircleIcon
                  className={`w-5 h-5 m-1 fill-red-600 hover:fill-red-400 ${
                    isDeleting && "animate-pulse"
                  } `}
                />
                {isDeleting ? (
                  <p className="animate-pulse">declining...</p>
                ) : (
                  <p>decline</p>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Notification.propTypes = {
  closeNotification: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Notification;
