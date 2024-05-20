import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "../contexts/APICollectionContext";
import Loader from "../ui/Loader";
import axios from "axios";
import { Cog6ToothIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as XLSX from "xlsx";

// Create a custom axios instance with a longer timeout
const axiosInstance = axios.create({
  timeout: 600000, // Set timeout to 10 minutes (600,000 ms)
});

function Testing() {
  const [apiInfoLoading, setApiInfoLoading] = useState(true);
  const [isTesting, setIsTesting] = useState(true);
  const [data, setData] = useState(null);
  const [testedData, setTestedData] = useState(null);
  const [error, setError] = useState("");
  const [selectAll, setSelectAll] = useState(false); // State to track select all
  const [selectedResults, setSelectedResults] = useState([]); // State to track selected results
  const navigate = useNavigate();
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let collectionId = queryParams.get("collectionId");
  const collectionName = queryParams.get("collectionName");
  let apiId = queryParams.get("apiId");
  const { getApiById } = useAPI();

  const [isResponseVisibleIndex, setIsResponseVisibleIndex] = useState(null);
  const [isTestObjectVisibleIndex, setIsTestObjectVisibleIndex] =
    useState(null);
  useEffect(() => {
    async function fetchAndTestApi(apiId) {
      try {
        setError("");
        const doc = await getApiById(apiId);
        setData(doc);
        setApiInfoLoading(false);
        setIsTesting(true);
        let response;
        switch (doc.apiType) {
          case "custom_get":
          case "custom_delete":
            response = await axiosInstance.post(
              "https://localhost:7153/api/APITesting/CustomTestGetDel",
              doc
            );
            break;
          case "custom_post":
          case "custom_put":
            response = await axiosInstance.post(
              "https://localhost:7153/api/APITesting/CustomTestPostPut",
              doc
            );
            break;
          case "system_get":
          case "system_delete":
            response = await axiosInstance.post(
              "https://localhost:7153/api/APITesting/TestGetDel",
              doc
            );
            break;
          case "system_post":
          case "system_put":
            response = await axiosInstance.post(
              "https://localhost:7153/api/APITesting/TestPostPut",
              doc
            );
            break;
          default:
            throw new Error("Unsupported API type");
        }
        setTestedData(response.data);
        setIsTesting(false);
      } catch (err) {
        const errorMessage =
          err.response && err.response.data ? err.response.data : err.message;
        setError(errorMessage);
        console.log(err);
        console.log(errorMessage);
        setApiInfoLoading(false);
        setIsTesting(false);
        console.log(err.message);
      }
    }

    fetchAndTestApi(apiId);
  }, [apiId, getApiById]);

  const navigateBack = () => {
    navigate(
      `/collections?collectionId=${collectionId}&collectionName=${collectionName}`
    );
  };

  const displayTestObject = (index, testedObject) => {
    try {
      var stringfy = JSON.stringify(testedObject, null, 2);
      return stringfy;
    } catch (error) {
      console.log("error", testedObject);

      return testedObject;
    }
  };

  const createExcelOfSelectedResult = () => {
    // Check if there are selected results
    if (selectedResults.length === 0) {
      return;
    }

    // Define the Excel data
    const excelData = selectedResults.map((item) => ({
      "Status Code": item.statusCode,
      "Tested Field Name": item.testPropertyName,
      "Tested Field Value": item.testPropertyValue,
      "Tested Field Type": item.testPropertyType,
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Results");

    // Create style for header
    const headerStyle = {
      font: { color: { rgb: "000000" }, bold: true },
      fill: { fgColor: { rgb: "0000FF" } },
    };

    // Apply header style to headers A1 to D1
    worksheet["A1"].s =
      worksheet["B1"].s =
      worksheet["C1"].s =
      worksheet["D1"].s =
        headerStyle;

    // Convert the workbook to a binary Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // Convert binary Excel file to Blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a temporary link element
    const link = document.createElement("a");
    // Set the link's href to the Blob URL
    link.href = window.URL.createObjectURL(blob);
    // Set the link's download attribute to the desired file name
    link.download = `${collectionName}_${data.name}_results.xlsx`;
    // Append the link to the document body
    document.body.appendChild(link);
    // Click the link to trigger the download
    link.click();
    // Remove the link from the document body
    document.body.removeChild(link);
  };

  const toggleSelectAll = () => {
    // Toggle the select all state
    const newState = !selectAll;

    // Update the select all state
    setSelectAll(newState);

    // If Select All is checked, set all results as selected, otherwise clear selection
    if (newState) {
      setSelectedResults(
        testedData?.testedObjectInfos.map((item, index) => ({
          index,
          statusCode: item.statusCode,
          testPropertyName: item.testPropertyName,
          testPropertyValue: item.testPropertyValue,
          testPropertyType: item.testPropertyType,
        }))
      );
    } else {
      setSelectedResults([]);
    }
  };

  const toggleSelectResult = (index) => {
    // Check if the index is already selected
    const selectedItem = testedData?.testedObjectInfos[index];
    const selectedIndex = selectedResults.findIndex(
      (item) => item.index === index
    );

    if (selectedIndex === -1) {
      // If not selected, add it to the selectedResults
      setSelectedResults((prev) => [
        ...prev,
        {
          index,
          statusCode: selectedItem.statusCode,
          testPropertyName: selectedItem.testPropertyName,
          testPropertyValue: selectedItem.testPropertyValue,
          testPropertyType: selectedItem.testPropertyType,
        },
      ]);
    } else {
      // If already selected, remove it from the selectedResults
      setSelectedResults((prev) => prev.filter((item) => item.index !== index));
    }
  };

  return (
    <div className="mt-16 max-w-screen-2xl mx-auto">
      <div>
        <div className="relative">
          <button
            onClick={navigateBack}
            className="w-40 bg-blue-500 px-4 py-2 ml-2 text-white rounded hover:bg-blue-400"
          >
            Back to Collection
          </button>
        </div>
        {apiInfoLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center -mt-8">
            <h1 className="border-b font-semibold">{data && data.name}</h1>
            <h3>{data && data.apiType.split("_").join(" ")}</h3>
          </div>
        )}
        {error && (
          <p className="text-red-500 font-semibold mt-4 text-center">
            {" "}
            {error}
          </p>
        )}
      </div>
      
      <button
          onClick={createExcelOfSelectedResult}
          className="w-40 bg-green-500 px-4 py-2 ml-2 text-white rounded hover:bg-green-400"
        >
          Create Excel
        </button>

      <div className="flex flex-col mt-6 mb-12">
        <div className="flex flex-col w-full items-center border-b border-t p-3">
          <div className="flex">
            <h2 className="font-semibold font-mono">
              Total Tested Objects :{" "}
              {!isTesting && testedData?.totalTestedObjects}
            </h2>
            {isTesting && (
              <Cog6ToothIcon className="h-6 w-6 animate-spin ml-4" />
            )}
          </div>

          <div className="flex">
            <h2 className="font-semibold font-mono">
              Success Calls : {!isTesting && testedData?.successCalls}
            </h2>
            {isTesting && (
              <Cog6ToothIcon className="h-6 w-6 animate-spin ml-4" />
            )}
          </div>

          <div className="flex">
            <h2 className="font-semibold font-mono">
              Failure Calls : {!isTesting && testedData?.failureCalls}
            </h2>
            {isTesting && (
              <Cog6ToothIcon className="h-6 w-6 animate-spin ml-4" />
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex w-full pt-4 pb-4 border-b bg-blue-200 g">
            <div className="flex justify-center w-1/12">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectAll}
              ></input>
              <h3 className="font-semibold px-1 font-mono text-center">
                Select
              </h3>
            </div>
            <h3 className="font-semibold font-mono w-1/12 text-center">
              Status Code
            </h3>
            <h3 className="font-semibold font-mono w-1/6 text-center">
              Tested Field
            </h3>
            <h3 className="font-semibold font-mono w-1/6 text-center">
              Tested Value
            </h3>
            <h3 className="font-semibold font-mono w-1/6 text-center">
              Field Type
            </h3>
            <h3 className="font-semibold font-mono w-1/6 text-center">
              Test Object
            </h3>
            <h3 className="font-semibold font-mono w-1/6 text-center">
              Response{" "}
            </h3>
          </div>
        </div>
        <div className="flex flex-col">
          {isTesting ? (
            <Skeleton count={10} height={50} />
          ) : (
            testedData?.testedObjectInfos.map((item, index) => (
              <div
                key={index}
                className={`flex w-full pt-3 pb-2 border-b h-14 ${
                  index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                }`}
              >
                <div className="w-1/12 flex justify-center">
                  <input
                    type="checkbox"
                    onChange={() => toggleSelectResult(index)}
                    checked={selectedResults.some(
                      (selectedItem) => selectedItem.index === index
                    )}
                  />
                </div>

                <div
                  className={`w-1/12 text-center font-semibold ${
                    item.isSuccess ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.statusCode}
                </div>

                <div
                  className="w-1/6 text-center truncate font-semibold"
                  title={item.testPropertyName}
                >
                  {item.testPropertyName}
                </div>
                <div
                  className="w-1/6 text-center truncate font-semibold"
                  title={
                    item.testPropertyValue === null
                      ? "null"
                      : item.testPropertyValue === ""
                      ? "empty"
                      : item.testPropertyValue
                  }
                >
                  {item.testPropertyValue === null
                    ? "null"
                    : item.testPropertyValue === ""
                    ? "empty"
                    : item.testPropertyValue}
                </div>

                <div className="w-1/6 text-center font-semibold">
                  {item.testPropertyType}
                </div>
                <div className="w-1/6 flex justify-center items-center">
                  <EyeIcon
                    className="w-5 h-5 cursor-pointer fill-violet-300"
                    onClick={() => setIsTestObjectVisibleIndex(index)}
                  />
                  {isTestObjectVisibleIndex === index && (
                    <div
                      id="default-modal"
                      className="fixed inset-0 z-50 top-12 bottom-12 flex justify-center items-center bg-black bg-opacity-50"
                    >
                      <div className="bg-white shadow dark:bg-gray-700 h-full w-full max-w-2xl">
                        <button
                          onClick={() => setIsTestObjectVisibleIndex(null)}
                          className="m-4 text-gray-600 hover:text-gray-800"
                        >
                          <XMarkIcon className="h-8 w-8 " />
                        </button>
                        <div className="px-10 md:px-5 max-h-screen">
                          {/* Modal content */}
                          <textarea
                            className="w-full h-96 border text-base leading-relaxed text-gray-500 dark:text-gray-400 outline-none resize-none"
                            style={{ height: "550px" }}
                            value={displayTestObject(index, item.testedObject)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-1/6 flex justify-center items-center">
                  <EyeIcon
                    className="w-5 h-5 cursor-pointer fill-indigo-300"
                    onClick={() => setIsResponseVisibleIndex(index)}
                  />
                  {isResponseVisibleIndex === index && (
                    <div
                      id="default-modal"
                      className="fixed inset-0 z-50 top-12 bottom-12 flex justify-center items-center bg-black bg-opacity-50 "
                    >
                      <div className="bg-white shadow dark:bg-gray-700 h-full w-full max-w-2xl">
                        <button
                          onClick={() => setIsResponseVisibleIndex(null)}
                          className="m-4 text-gray-600 hover:text-gray-800"
                        >
                          <XMarkIcon className="h-8 w-8 " />
                        </button>
                        <div className="px-10 md:px-5 max-h-screen">
                          {/* Modal content */}
                          <textarea
                            className="w-full h-96 border text-base leading-relaxed text-gray-500 dark:text-gray-400 outline-none resize-none"
                            style={{ height: "550px" }}
                            value={item.apiResponse}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Testing;
