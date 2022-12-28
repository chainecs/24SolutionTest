import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";

function Pagination() {
  const {
    rows,
    setRows,
    startRow,
    setStartRow,
    searchKey,
    buttonPrevPagClassName,
    setButtonPrevPagClassName,
    buttonNextPagClassName,
    setButtonNextPagClassName,
  } = useGlobalContext();

  const disablePrev =
    "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-l hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white opacity-50";
  const enablePrev =
    "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-l hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white ";
  const disableNext =
    "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white opacity-50  ";
  const enableNext =
    "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white";

  useEffect(() => {
    if (startRow === 0) {
      setButtonPrevPagClassName(disablePrev);
    } else {
      setButtonPrevPagClassName(enablePrev);
    }
  }, [startRow, rows, setButtonPrevPagClassName, setButtonNextPagClassName]);

  const handlePrev = () => {
    if (startRow <= 0) {
      //console.log("Data is ended, cannot go prev");
      setButtonPrevPagClassName(disablePrev);
    } else {
      const fetchData = async () => {
        const stRow = startRow - 10; //create this variable to avoid Promises hell
        await axios
          .get(
            `http://localhost:5001/api/user?q=${searchKey}&start=${stRow}&limit=10`
          )
          .then((res) => {
            if (res.data === "No Data") {
              console.log("No Data");
            } else {
              setRows(res.data);
              setStartRow(stRow);
              setButtonNextPagClassName(enableNext);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    }
  };

  const handleNext = () => {
    const fetchData = async () => {
      const stRow = startRow + 10; //create this variable to avoid Promises hell
      await axios
        .get(
          `http://localhost:5001/api/user?q=${searchKey}&start=${stRow}&limit=10`
        )
        .then((res) => {
          if (res.data === "No Data") {
            //  console.log("No Data, cannot go next");
            alert(
              searchKey
                ? `Cannot find more items for "${searchKey}"`
                : "Cannot find more items"
            );
            setButtonNextPagClassName(disableNext);
          } else {
            setRows(res.data);
            setStartRow(stRow);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startRow + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startRow + rows.length}
        </span>
      </span>
      <div className="inline-flex mt-2 mb-2 xs:mt-0">
        {/* Buttons */}
        <button className={buttonPrevPagClassName} onClick={handlePrev}>
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Prev
        </button>
        <button className={buttonNextPagClassName} onClick={handleNext}>
          Next
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
