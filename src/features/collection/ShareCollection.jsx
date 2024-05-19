import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import Spinner from "../../ui/Spinner";

function ShareCollection() {
  const queryParams = new URLSearchParams(location.search);
  const collectionId = queryParams.get("collectionId");
  const collectionName = queryParams.get("collectionName");

  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const { getUserByEmailAsync } = useAuth();
  const { shareCollection } = useNotification();

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);
      const userRecord = await getUserByEmailAsync(userEmail);
      if (userRecord) {
        await shareCollection(userEmail, collectionId,collectionName);
      } else {
        setError("User not exist");
        setLoading(false);
        return;
      }
      setOpen(false);
      setLoading(false);
      navigate(
        `/collections?collectionId=${collectionId}&collectionName=${collectionName}`
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    navigate(
      `/collections?collectionId=${collectionId}&collectionName=${collectionName}`
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 flex justify-center items-center min-h-screen"
        initialFocus={cancelButtonRef}
        onClose={handleCancel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      {!error ? (
                        <Dialog.Title
                          as="h3"
                          className="sm:ml-1.5 text-base font-semibold leading-6 text-gray-900"
                        >
                          share collection : {collectionName}
                        </Dialog.Title>
                      ) : (
                        <Dialog.Title
                          as="h3"
                          className="sm:ml-1.5 text-lg font-semibold leading-6 text-red-800"
                        >
                          {error}
                        </Dialog.Title>
                      )}
                      <input
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="user email"
                        className="p-2 mt-1 block w-full sm:w-96 rounded-md border-gray-300 shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <div>
                    {loading ? (
                      <Spinner
                        message="sharing collection..."
                        bg="bg-green-300"
                      />
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        onClick={handleSubmit}
                      >
                        Share
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    className="mt-3 mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-300 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ShareCollection;
