import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { studentsReducer, StudentsAction, State } from '../reducers/studentsReducer';
import axios from 'axios';

interface IStudentsContext {
  studentsState: State,
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
  const [studentsState, studentsDispatch] = useReducer(
    studentsReducer,
     {students: [],
     currentStudents: [],
      sort_id: 'ASC',
       sort_year: 'ASC',
       sort_plate: 'ASC',
       sort_mb: 'ASC',
       sort_money: 'ASC',
       sort_fname: 'DESC',
       sort_bday: 'ASC',
       sort_address: 'ASC'
      });

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
        
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudentsContext = () => useContext(StudentsContext);
