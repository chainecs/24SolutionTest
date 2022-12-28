import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const DeleteModal = () => {
  const { isDeleteModalVisible, setDeleteModalVisible, idToDelete, deleteRow } =
    useGlobalContext();

  const handleConfirm = () => {
    deleteRow(idToDelete); //Do deleteRow function in context.js
  };

  const handleCancle = () => {
    setDeleteModalVisible(false); //close modal
  };

  return (
    <>
      {isDeleteModalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-700 text-base mb-4">
              User Id : {idToDelete} will be deleted
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2 hover:opacity-70 transition-opacity"
                onClick={handleCancle}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:opacity-70 transition-opacity"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
