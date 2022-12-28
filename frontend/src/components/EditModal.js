import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../context";

const EditModal = () => {
  const {
    isEditModalVisible,
    setEditModalVisible,
    selectedDataToEdit,
    editRow,
  } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, email, avatarUrl } = e.target.elements; //received form value
    let editDetails = {
      userId: selectedDataToEdit.userId,
      name: name.value,
      age: age.value,
      email: email.value,
      avatarUrl: avatarUrl.value,
    };
    editRow(editDetails); //Do editRow function in context.js
  };

  const handleCancle = () => {
    setEditModalVisible(false); //close modal
  };

  return (
    <>
      {isEditModalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
            <h2 className="text-2xl font-bold mb-4">Edit</h2>
            <>
              <>
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        id="name"
                        defaultValue={selectedDataToEdit.name}
                        required
                      />
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="age"
                      >
                        Age
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        id="age"
                        step="1"
                        min="1"
                        defaultValue={selectedDataToEdit.age}
                        required
                      />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="email"
                        id="email"
                        defaultValue={selectedDataToEdit.email}
                        required
                      />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="avatarUrl"
                      >
                        Avatar Url
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        id="avatarUrl"
                        defaultValue={selectedDataToEdit.avatarUrl}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2 hover:opacity-70 transition-opacity"
                      onClick={handleCancle}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 text-white rounded-lg px-4 py-2 hover:opacity-70 transition-opacity"
                      type="submit"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </>
              <div></div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
