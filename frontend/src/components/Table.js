import React from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useGlobalContext } from "../context";

const Table = () => {
  const {
    setDeleteModalVisible,
    setIdToDelete,
    setEditModalVisible,
    setselectedDataToEdit,
    rows,
  } = useGlobalContext(); //Get State from context.js

  const handleEdit = (userData) => {
    setEditModalVisible(true); //EditModal.js will be visible
    setselectedDataToEdit(userData);
  };

  const handleDelete = (userId) => {
    setDeleteModalVisible(true); //DeleteModal.js will be visible
    setIdToDelete(userId);
  };

  return (
    <div className="px-8">
      <div className="flex flex-col">
        <EditModal></EditModal>
        <DeleteModal></DeleteModal>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-emerald-600 text-white border-b text-sm">
                  <tr>
                    <th className="text-left pl-3 py-3 ">UserID</th>
                    <th className="text-left pl-3 py-3 ">Name</th>
                    <th className="text-left pl-3 py-3 ">Age</th>
                    <th className="text-left pl-3 py-3 ">Email</th>
                    <th className="text-left pl-3 ">Avatar Url</th>
                    <th className="text-left pl-3 py-3 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const { userId, name, age, email, avatarUrl } = row;
                    return (
                      <tr
                        key={row.userId}
                        className=" bg-white border-b text-sm transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-left pl-3">{userId}</td>
                        <td className="text-left pl-3 ">{name}</td>
                        <td className="text-left pl-3">{age}</td>
                        <td className="text-left pl-3">{email}</td>
                        <td className="text-left pl-3">{avatarUrl}</td>
                        <td className="flex items-center my-4 pl-3 pr-2">
                          <button
                            className="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-800 rounded hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white"
                            onClick={() => {
                              const userData = {
                                userId,
                                name,
                                age,
                                email,
                                avatarUrl,
                              };
                              handleEdit(userData);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:bg-red-500 dark:hover:text-white"
                            onClick={() => {
                              handleDelete(userId);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
