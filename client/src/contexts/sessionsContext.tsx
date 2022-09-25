import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  sessionsReducer,
  SessionsAction,
  State,
} from "../reducers/sessionsReducer";
import axios from "axios";

interface ISessionsContext {
  sessionsState: State;
  sessionsDispatch: React.Dispatch<SessionsAction>;
}

export const SessionsContext = createContext<ISessionsContext>(
  {} as ISessionsContext
);

interface SessionsContextProviderProps {
  children: React.ReactNode;
}

export const SessionsContextProvider: React.FC<
  SessionsContextProviderProps
> = ({ children }) => {
  const [sessionsState, sessionsDispatch] = useReducer(sessionsReducer, {
    sessions: [],
    currentSessions: [],
    filteredSessions: [],
    searchTerm: "",
    sort_num: "ASC",
    sort_sessnum: "ASC",
    sort_sub1: "ASC",
    sort_sub2: "ASC",
    sort_sub3: "ASC",
    showConfirm: false,
    isInsert: false,
    isUpdate: false,
    selectedSession: null,
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get("/sessions/");
        sessionsDispatch({ type: "SET", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <SessionsContext.Provider
      value={{
        sessionsState,
        sessionsDispatch,
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
};

export const useSessionsContext = () => useContext(SessionsContext);
