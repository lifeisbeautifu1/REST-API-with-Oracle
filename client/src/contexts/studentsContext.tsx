import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  studentsReducer,
  StudentsAction,
  State,
} from '../reducers/studentsReducer';
import axios from 'axios';

interface IStudentsContext {
  studentsState: State;
  studentsDispatch: React.Dispatch<StudentsAction>;
}

export const StudentsContext = createContext<IStudentsContext>(
  {} as IStudentsContext
);

interface StudentsContextProviderProps {
  children: React.ReactNode;
}

export const StudentsContextProvider: React.FC<
  StudentsContextProviderProps
> = ({ children }) => {
  const [studentsState, studentsDispatch] = useReducer(studentsReducer, {
    students: [],
    currentStudents: [],
    filteredStudents: [],
    searchTerm: '',
    sort_num: 'ASC',
    sort_year: 'ASC',
    sort_plate: 'ASC',
    sort_mb: 'ASC',
    sort_money: 'ASC',
    sort_fname: 'DESC',
    sort_bday: 'ASC',
    sort_address: 'ASC',
    showConfirm: false,
    isInsert: false,
    isUpdate: false,
    selectedStudent: null,
    record: [],
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get('/students/');
        studentsDispatch({ type: 'SET', payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const { data } = await axios.get('/students/record');
        studentsDispatch({ type: 'SET_RECORD', payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecord();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        studentsState,
        studentsDispatch,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudentsContext = () => useContext(StudentsContext);
