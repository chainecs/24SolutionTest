import React, { useState, useContext } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [idToDelete, setIdToDelete] = useState([]); //Store these value when click Delete Button to show in a form and send to api
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDataToEdit, setselectedDataToEdit] = useState({}); //Store these value when click Edit Button to show in a form and send to api
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [startRow, setStartRow] = useState(0); // for query start=?
  const [searchKey, setSearchKey] = useState(""); // for query q=?
  const [buttonPrevPagClassName, setButtonPrevPagClassName] = useState("");
  const [buttonNextPagClassName, setButtonNextPagClassName] = useState(
    "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white"
  );

  const deleteRow = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/user/${userId}`
      );
      setDeleteModalVisible(false);
      alert(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editRow = async (editDetails) => {
    const { userId, name, age, email, avatarUrl } = editDetails; //To avoid Object Object in console
    try {
      const response = await axios.put(
        `http://localhost:5001/api/user/${userId}`,
        {
          name: name,
          age: age,
          email: email,
          avatarUrl: avatarUrl,
        }
      );

      if (response.data === "Email is already in use")
        alert("Email is already in use");
      else {
        setEditModalVisible(false);
        alert(`UserId : ${response.data.userId} has been edited`);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        rows,
        setRows,
        isDeleteModalVisible,
        setDeleteModalVisible,
        idToDelete,
        setIdToDelete,
        deleteRow,
        isEditModalVisible,
        setEditModalVisible,
        selectedDataToEdit,
        setselectedDataToEdit,
        editRow,
        startRow,
        setStartRow,
        searchKey,
        setSearchKey,
        buttonPrevPagClassName,
        setButtonPrevPagClassName,
        buttonNextPagClassName,
        setButtonNextPagClassName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext); //4 .
};

export { AppContext, AppProvider };

// 5.การเอาไปใช้ในคอมโพเนนท์อื่นเช่น const myContext = useGlobalContext();
