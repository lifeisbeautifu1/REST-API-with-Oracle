import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { studentsReducer, StudentsAction } from './reducers/studentsReducer';
import { IStudent } from './interfaces';
import axios from 'axios';

interface IStudentsContext {
  studentsState: IStudent[];
  studentsDispatch: React.Dispatch<StudentsAction>;
  student: IStudent | null;
  setStudent: React.Dispatch<React.SetStateAction<IStudent | null>>;
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
  const [studentsState, studentsDispatch] = useReducer(studentsReducer, []);
  const [student, setStudent] = useState<IStudent | null>(null);

  useEffect(() => {
    const fetchStudents= async () => {
      try {
        const { data } = await axios.get('/students/');
        studentsDispatch({ type: 'SET', payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        studentsState,
        studentsDispatch,
        student,
        setStudent,
        
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(StudentsContext);
