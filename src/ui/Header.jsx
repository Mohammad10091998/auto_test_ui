import {
  BellIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import { useState } from "react";
import Notification from "./Notification";

function Header() {
  const { currentUser } = useAuth();
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let collectionId = queryParams.get("collectionId");
  const collectionName = queryParams.get("collectionName");
  const [openNotification, setOpenNotification] = useState(false);

  const closeNotification = () => {
    setOpenNotification(false);
  };

  return (
    <div>
      <div className="bg-slate-500 z-20 fixed top-0 left-0 right-0 w-full">
        <div className=" px-2 sm:px-6 lg:px-1 ">
          <div className="relative flex h-12 items-center justify-between max-w-screen-2xl 2xl:mx-auto">
            <div className="flex items-center">
              <div className="space-x-4 flex">
                <div className="flex">
                  <Link
                    to="/"
                    className="text-black text-xl font-bold font-monospace hover:text-slate-300 rounded-md px-3 py-2 flex items-center"
                  >
                    aut
                    <Cog6ToothIcon
                      className="h-5 w-5 mt-1 animate-spin shadow-lg"
                      aria-hidden="true"
                    />
                    Test
                  </Link>
                </div>
                <Link
                  to={
                    collectionId && collectionName
                      ? `/collections?collectionId=${collectionId}&collectionName=${collectionName}`
                      : "/collections"
                  }
                  className="text-black text-xl font-serif rounded-md px-3 py-2 hover:text-slate-300"
                >
                  collections
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-evenly sm:mx-5">
              <div>
                <Link
                  to={!currentUser ? "/login" : "/logout"}
                  className="text-black text-xl font-serif rounded-md px-3 py-2 hover:text-slate-300 mr-10"
                >
                  {currentUser ? (
                    <Avatar name={currentUser.displayName} />
                  ) : (
                    <ArrowRightStartOnRectangleIcon
                      className="h-8 w-8"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </div>

              <button
                onClick={() => setOpenNotification(true)}
                type="button"
                className="flex h-10 w-10 justify-center items-center relative rounded-full bg-slate-200  text-gray-400 hover:text-white hover:bg-white focus:outline-none"
              >
                <BellIcon className="h-6 w-6 fill-slate-600 hover:fill-slate-700" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification
        closeNotification={closeNotification}
        isOpen={openNotification}
      />
    </div>
  );
}

export default Header;
