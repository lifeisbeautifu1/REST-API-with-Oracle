import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { useSessionsContext } from "../contexts/sessionsContext";

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
  SESSNUM: "",
  SUB1: "",
  SUB2: "",
  SUB3: "",
};

const SessionsModal = () => {
  const {
    sessionsState: { isInsert, isUpdate, selectedSession },
    sessionsDispatch: dispatch,
  } = useSessionsContext();

  const [formState, setFormState] = useState<any>(initialState);

  const onInsert = async () => {
    const { data } = await axios.post("/sessions", formState);
    dispatch({ type: "ADD", payload: data });
    onClose();
  };

  const onUpdate = async () => {
    if (selectedSession) {
      const { data } = await axios.patch(
        "/sessions/" + selectedSession.NUM + "/" + selectedSession.SESSNUM,
        {
          ...formState,
        }
      );
      dispatch({ type: "UPDATE", payload: data });
      onClose();
    }
  };

  useEffect(() => {
    setFormState(initialState);
  }, [isInsert]);

  useEffect(() => {
    if (selectedSession) {
      setFormState({
        ...selectedSession,
      });
    }
  }, [isUpdate, selectedSession]);

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

  const onClose = useCallback(() => {
    dispatch({ type: "SET_SELECTED_SESSION", payload: null });
    dispatch({ type: "SET_IS_INSERT", payload: false });
    dispatch({ type: "SET_IS_UPDATE", payload: false });
  }, [dispatch]);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (e.target.id === "sessionsModal") onClose();
    };
    window.addEventListener("click", closeModal);
    // return window.removeEventListener("click", closeModal);
  }, [onClose]);

  return (
    <AnimatePresence>
      {(isInsert || isUpdate) && (
        <motion.div
          variants={backdrop}
          id="sessionsModal"
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
                    ? "Edit session"
                    : "Insert new session"}
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
                      htmlFor="SESSNUM"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      SessNum
                    </label>
                    <input
                      value={formState.SESSNUM}
                      onChange={handleChange}
                      type="number"
                      name="SESSNUM"
                      id="SESSNUM"
                      min={1}
                      max={8}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1-8"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="SUB1"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub1
                    </label>
                    <input
                      type="number"
                      value={formState.SUB1}
                      onChange={handleChange}
                      name="SUB1"
                      id="SUB1"
                      min={2}
                      max={5}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="4"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="SUB2"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub2
                    </label>
                    <input
                      type="number"
                      value={formState.SUB2}
                      onChange={handleChange}
                      name="SUB2"
                      id="SUB2"
                      min={2}
                      max={5}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="4"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="SUB3"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub3
                    </label>
                    <input
                      type="number"
                      value={formState.SUB3}
                      onChange={handleChange}
                      min={2}
                      max={5}
                      name="SUB3"
                      id="SUB3"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="4"
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

export default SessionsModal;
