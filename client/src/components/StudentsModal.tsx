import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStudentsContext } from "../contexts/studentsContext";

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const initialState = {
  NUM: "",
  FNAME: "",
  YEAR: "",
  BDAY: "",
  PLATE: "",
  MB: "",
  MONEY: "",
  ADDRESS: "",
};

const StudentsModal = () => {
  const {
    studentsState: { isInsert, isUpdate, selectedStudent },
    studentsDispatch: dispatch,
  } = useStudentsContext();

  const [formState, setFormState] = useState<any>(initialState);

  const onInsert = async () => {
    const { data } = await axios.post("/students", formState);
    dispatch({ type: "ADD", payload: data });
    onClose();
  };

  const onUpdate = async () => {
    if (selectedStudent) {
      console.log(formState);
      const { data } = await axios.patch("/students/" + selectedStudent.NUM, {
        ...formState,
        MONEY: +formState.MONEY,
      });
      dispatch({ type: "UPDATE", payload: data });
      onClose();
    }
  };

  useEffect(() => {
    setFormState(initialState);
  }, [isInsert]);

  useEffect(() => {
    if (selectedStudent) {
      setFormState({
        ...selectedStudent,
        BDAY: selectedStudent.BDAY.slice(0, 10),
      });
    }
  }, [isUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInsert && !isUpdate) onInsert();
    if (!isInsert && isUpdate) onUpdate();
  };

  useEffect(() => {
    const closeModal = (e: any) => {
      if (e.target.id === "studentsModal") onClose();
    };
    window.addEventListener("click", closeModal);
    // return window.removeEventListener("click", closeModal);
  }, []);

  const onClose = () => {
    dispatch({ type: "SET_SELECTED_STUDENT", payload: null });
    dispatch({ type: "SET_IS_INSERT", payload: false });
    dispatch({ type: "SET_IS_UPDATE", payload: false });
  };
  return (
    <AnimatePresence>
      {(isInsert || isUpdate) && (
        <motion.div
          variants={backdrop}
          id="studentsModal"
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[2] bg-black/50 md:inset-0 h-modal md:h-full flex justify-center items-center"
        >
          <div className="relative w-full max-w-2xl h-full md:h-auto">
            <form
              onSubmit={onSubmit}
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isUpdate && !isInsert
                    ? "Edit student"
                    : "Insert new student"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="NUM"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Num
                    </label>
                    <input
                      disabled={isUpdate}
                      value={formState.NUM}
                      onChange={handleChange}
                      type="number"
                      name="NUM"
                      id="first-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="100000"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="FNAME"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fname
                    </label>
                    <input
                      value={formState.FNAME}
                      onChange={handleChange}
                      type="text"
                      name="FNAME"
                      id="FNAME"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="YEAR"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Year
                    </label>
                    <input
                      type="number"
                      value={formState.YEAR}
                      onChange={handleChange}
                      name="YEAR"
                      id="YEAR"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="2018"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="BDAY"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Birthday
                    </label>
                    <input
                      value={formState.BDAY}
                      onChange={handleChange}
                      type="date"
                      name="BDAY"
                      id="BDAY"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="2000/10/10"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="PLATE"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Plate
                    </label>
                    <input
                      value={formState.PLATE}
                      onChange={handleChange}
                      type="number"
                      name="PLATE"
                      id="PLATE"
                      className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0 or 1"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="MB"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mb
                    </label>
                    <input
                      value={formState.MB}
                      onChange={handleChange}
                      type="number"
                      name="MB"
                      id="MB"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="4.23"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="MONEY"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Money
                    </label>
                    <input
                      disabled={!(+formState.PLATE === 1)}
                      value={formState.MONEY}
                      onChange={handleChange}
                      type="number"
                      name="MONEY"
                      id="MONEY"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="20000"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="ADDRESS"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      value={formState.ADDRESS}
                      onChange={handleChange}
                      type="text"
                      name="ADDRESS"
                      id="ADDRESS"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="274 Grasskamp Drive"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isUpdate && !isInsert ? "Save" : "Insert"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudentsModal;
