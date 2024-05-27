import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAPI } from "../../contexts/APICollectionContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { customPostPutSchema } from "./schemas";

export default function CustomPostPutForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPayloadView, setIsPayloadView] = useState(true);
  const [showModal, setShowModal] = useState(null); // State variable to view payload

  let { apiType } = useParams();
  const { createAPI, getApiById, updateAPI } = useAPI();
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let collectionId = queryParams.get("collectionId");
  const collectionName = queryParams.get("collectionName");
  let apiId = queryParams.get("apiId");

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      url: "",
      payloadPairs: [{ key: "", value: "" }],
      headerPairs: [],
    },
    validationSchema: customPostPutSchema,
    onSubmit: async (values, action) => {
      try {
        setLoading(true);
        setError("");

        if (apiId) {
          await updateAPI(apiId, values, apiType, collectionId);
        } else {
          await createAPI(values, apiType, collectionId);
        }
        navigate(
          `/collections?collectionId=${collectionId}&collectionName=${collectionName}`
        );
      } catch (err) {
        setError(err.message);
        console.log("Error creating api");
      }
      setError("");
      action.resetForm();
    },
  });

  useEffect(() => {
    async function fetchApiById(apiId) {
      try {
        setLoading(true);
        const data = await getApiById(apiId);
        setValues({
          name: data?.name || "",
          url: data?.url || "",
          payloadPairs: data?.payloadPairs || [],
          headerPairs: data?.headerPairs || [],
        });

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    if (apiId) {
      fetchApiById(apiId);
    }
  }, [apiId, getApiById, setValues]);

  //Param functions
  const handlePayloadNameChange = (index, value) => {
    const updatedpayloadPairsPairs = [...values.payloadPairs];
    updatedpayloadPairsPairs[index]["key"] = value;
    setFieldValue("payloadPairs", updatedpayloadPairsPairs);
  };

  const handlePayloadValuesChange = (index, value) => {
    const updatedpayloadPairsPairs = [...values.payloadPairs];
    updatedpayloadPairsPairs[index]["value"] = value;
    setFieldValue("payloadPairs", updatedpayloadPairsPairs);
  };

  const addPayloadPair = () => {
    const newPayloadPairs = [...values.payloadPairs];
    const lastPayloadValue =
      newPayloadPairs.length > 0
        ? newPayloadPairs[newPayloadPairs.length - 1].value
        : "";
    newPayloadPairs.push({ key: "", value: lastPayloadValue });
    setFieldValue("payloadPairs", newPayloadPairs);
  };

  const removePayloadPair = (index) => {
    const updatedpayloadPairsPairs = [...values.payloadPairs];
    updatedpayloadPairsPairs.splice(index, 1);
    setFieldValue("payloadPairs", updatedpayloadPairsPairs);
  };

  //Header functions
  const handleHeaderKeyChange = (index, value) => {
    const updateHeaderPairs = [...values.headerPairs];
    updateHeaderPairs[index]["key"] = value;
    setFieldValue("headerPairs", updateHeaderPairs);
  };

  const handleHeaderValueChange = (index, value) => {
    const updateHeaderPairs = [...values.headerPairs];
    updateHeaderPairs[index]["value"] = value;
    setFieldValue("headerPairs", updateHeaderPairs);
  };
  const addHeaderPair = () => {
    setFieldValue("headerPairs", [
      ...values.headerPairs,
      { key: "", value: "" },
    ]);
  };

  const removeHeaderPair = (index) => {
    const updatedHeaderPairs = [...values.headerPairs];
    updatedHeaderPairs.splice(index, 1);
    setFieldValue("headerPairs", updatedHeaderPairs);
  };

  return (
    <div className="flex flex-col py-16 bg-slate-100">
      <div className="sm:mx-auto sm:w-full">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Manual Testing of {apiType === "custom_post" ? "Post" : "Put"} Api 
        </h2>
      </div>
      {error && (
        <p className="text-center font-semibold mt-2 text-rose-800 text-lg">
          {error}{" "}
        </p>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-1/2 px-3">
              <label
                htmlFor="name"
                className="mt-2 block text-sm font-medium leading-6 text-gray-900"
              >
                api name
              </label>
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="name"
                name="name"
                type="name"
                spellCheck="false"
                className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
              />
              {errors.name && touched.name && (
                <p className="text-rose-800">{errors.name}</p>
              )}
            </div>
            <div className="w-1/2 px-3">
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                url
              </label>
              <input
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                id="url"
                name="url"
                type="text"
                spellCheck="false"
                className="p-2 mt-1 block w-full rounded-md border-gray-600 border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
              />
              {errors.url && touched.url && (
                <p className="text-rose-800">{errors.url}</p>
              )}
            </div>
            <div className="w-full flex justify-around mt-4">
              <button
                onClick={() => setIsPayloadView(false)}
                type="button"
                className={`w-1/3 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                  !isPayloadView ? "bg-blue-200" : "bg-white"
                }`}
              >
                add headers
              </button>
              <button
                onClick={() => setIsPayloadView(true)}
                type="button"
                className={`w-1/3 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                  isPayloadView ? "bg-blue-200" : "bg-white"
                }`}
              >
                add payload
              </button>
            </div>
            {/* Render key-value pairs inputs dynamically */}
            {isPayloadView ? (
              <div className="border border-slate-300 mt-3 w-full p-1">
                {errors.payloadPairs && touched.payloadPairs ? (
                  <p className="text-rose-800">{errors.payloadPairs}</p>
                ) : null}
                {values.payloadPairs.map((payload, index) => (
                  <div key={index} className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-1/2 px-3">
                      <input
                        value={payload.key}
                        onChange={(e) =>
                          handlePayloadNameChange(index, e.target.value)
                        }
                        onBlur={handleBlur}
                        className="p-2 mt-1 block w-full rounded-md border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                        placeholder="payload name"
                        name={payload.key}
                        id={index}
                        spellCheck="false"
                      />
                    </div>
                    <div className="w-1/2 px-3">
                      <textarea
                        value={payload.value}
                        onChange={(e) =>
                          handlePayloadValuesChange(index, e.target.value)
                        }
                        onBlur={handleBlur}
                        rows={5}
                        className="p-2 mt-1 block w-full rounded-md border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                        placeholder="payload value"
                        name={payload.value}
                        id={index}
                        spellCheck="false"
                      />
                      <button
                        type="button"
                        onClick={() => setShowModal(index)}
                        className="bg-slate-300 rounded-md px-2 mt-0.5 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                      >
                        view
                      </button>
                      {showModal === index &&  (
                        <div
                          id="default-modal"
                          className="fixed inset-0 z-50 top-8 flex justify-center items-center bg-black bg-opacity-50"
                        >
                          <div className="bg-white shadow dark:bg-gray-700 h-4/5 w-full max-w-2xl">
                            <button
                              onClick={() => setShowModal(null)}
                              className="m-4 text-gray-600 hover:text-gray-800"
                            >
                              <XMarkIcon className="h-8 w-8 " />
                            </button>
                            <div className="px-10 md:px-5 max-h-screen">
                              {/* Modal content */}
                              <textarea
                                className="w-full h-96 border text-base leading-relaxed text-gray-500 dark:text-gray-400 outline-none resize-none"
                                style={{ height: "550px" }}
                                onChange={(e) =>
                                  handlePayloadValuesChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                onBlur={handleBlur}
                                value={payload.value}
                                name={payload.value}
                                id={index}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removePayloadPair(index)}
                        className="text-red-600 hover:text-red-500 w-full"
                      >
                        remove payload
                      </button>
                    )}
                  </div>
                ))}
                <div className="w-full px-3">
                  <button
                    type="button"
                    onClick={addPayloadPair}
                    className="text-slate-600 hover:text-slate-500"
                  >
                    add payload
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-slate-300 mt-3 w-full p-1">
                {errors.headerPairs && touched.headerPairs ? (
                  <p className="text-rose-800">{errors.headerPairs}</p>
                ) : null}
                {values.headerPairs.map((header, index) => (
                  <div key={index} className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-1/2 px-3">
                      <input
                        value={header.key}
                        onChange={(e) =>
                          handleHeaderKeyChange(index, e.target.value)
                        }
                        onBlur={handleBlur}
                        className="p-2 mt-1 block w-full rounded-md border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                        placeholder="header key"
                        name={header.key}
                        id={index}
                        spellCheck="false"
                      />
                    </div>
                    <div className="w-1/2 px-3">
                      <input
                        value={header.value}
                        onChange={(e) =>
                          handleHeaderValueChange(index, e.target.value)
                        }
                        onBlur={handleBlur}
                        className="p-2 mt-1 block w-full rounded-md border shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
                        placeholder="header value"
                        name={header.value}
                        id={index}
                        spellCheck="false"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHeaderPair(index)}
                      className="text-red-600 hover:text-red-500 w-full"
                    >
                      remove header
                    </button>
                  </div>
                ))}
                <div className="w-full px-3">
                  <button
                    type="button"
                    onClick={addHeaderPair}
                    className="text-slate-600 hover:text-slate-500"
                  >
                    add header
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/chooseapi?collectionId=${collectionId}&collectionName=${collectionName}`
                )
              }
              className="w-1/3  flex justify-center rounded-md bg-gray-300 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Cancel
            </button>
            {loading ? (
              <Spinner message="adding an api..." />
            ) : (
              <button
                disabled={loading}
                type="submit"
                className="w-1/3 flex justify-center rounded-md bg-slate-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
