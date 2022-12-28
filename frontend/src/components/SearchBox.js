import React from "react";
import { useGlobalContext } from "../context";
import axios from "axios";

const SearchBox = () => {
  const { setRows, setSearchKey, setStartRow, setButtonNextPagClassName } =
    useGlobalContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    setButtonNextPagClassName(
      "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white"
    );
    const searchKeyword = e.target.elements.search.value; //create this variable to avoid Promises hell
    const stRow = 0;
    axios
      .get(
        `http://localhost:5001/api/user?q=${searchKeyword}&start=${stRow}&limit=10`
      )
      .then((response) => {
        if (response.data === "No Data")
          alert("No matched data"); //If no data matched
        else {
          setRows(response.data); //If server has data
          setStartRow(stRow);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSearchKey(searchKeyword); //to use in global state
  };

  return (
    <div className="px-8 py-5">
      <form onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Search Name or Email`}
          />
          <button
            type="submit"
            className="inline-flex items-center rounded px-4 py-2 text-sm font-medium absolute right-2.5 bottom-2.5   text-white bg-blue-800  hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
