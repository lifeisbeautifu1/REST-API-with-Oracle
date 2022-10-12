import { IStudent, IRecord } from '../interfaces';

type ORDER = 'DESC' | 'ASC';

export type State = {
  students: IStudent[];
  filteredStudents: IStudent[];
  currentStudents: IStudent[];
  isInsert: boolean;
  isUpdate: boolean;
  showConfirm: boolean;
  selectedStudent: IStudent | null;
  sort_num: ORDER;
  sort_year: ORDER;
  sort_plate: ORDER;
  sort_mb: ORDER;
  sort_money: ORDER;
  sort_fname: ORDER;
  sort_bday: ORDER;
  sort_address: ORDER;
  searchTerm: string;
  record: IRecord[];
};

export type StudentsAction =
  | {
      type: 'ADD';
      payload: IStudent;
    }
  | {
      type: 'DELETE';
      payload: IStudent;
    }
  | {
      type: 'UPDATE';
      payload: IStudent;
    }
  | {
      type: 'SET';
      payload: IStudent[];
    }
  | {
      type: 'SET_RECORD';
      payload: IRecord[];
    }
  | {
      type: 'SET_SEARCH_TERM';
      payload: string;
    }
  | {
      type: 'SET_CURRENT_STUDENTS';
      payload: IStudent[];
    }
  | {
      type: 'SET_SHOW_CONFIRM';
      payload: boolean;
    }
  | {
      type: 'SET_SELECTED_STUDENT';
      payload: IStudent | null;
    }
  | {
      type: 'SET_IS_INSERT';
      payload: boolean;
    }
  | {
      type: 'SET_IS_UPDATE';
      payload: boolean;
    }
  | {
      type: 'SORT_NUM';
    }
  | {
      type: 'SORT_YEAR';
    }
  | {
      type: 'SORT_PLATE';
    }
  | {
      type: 'SORT_MB';
    }
  | {
      type: 'SORT_MONEY';
    }
  | {
      type: 'SORT_FNAME';
    }
  | {
      type: 'SORT_BDAY';
    }
  | {
      type: 'SORT_ADDRESS';
    };

export const studentsReducer = (
  state: State,
  action: StudentsAction
): State => {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        students: [...state.students, action.payload],
        filteredStudents: [...state.filteredStudents, action.payload],
      };
    }
    case 'DELETE': {
      return {
        ...state,
        students: state.students.filter((s) => s.NUM !== action.payload.NUM),
        filteredStudents: state.filteredStudents.filter(
          (s) => s.NUM !== action.payload.NUM
        ),
      };
    }
    case 'UPDATE': {
      return {
        ...state,
        students: state.students.map((r) =>
          r.NUM === state.selectedStudent?.NUM ? action.payload : r
        ),
        filteredStudents: state.filteredStudents.map((r) =>
          r.NUM === state.selectedStudent?.NUM ? action.payload : r
        ),
      };
    }
    case 'SET': {
      return {
        ...state,
        students: action.payload,
        filteredStudents: action.payload,
        currentStudents: action.payload.slice(0, 10),
      };
    }
    case 'SET_RECORD': {
      return {
        ...state,
        record: action.payload,
      };
    }
    case 'SET_CURRENT_STUDENTS': {
      return {
        ...state,
        currentStudents: action.payload,
      };
    }
    case 'SET_SHOW_CONFIRM': {
      return {
        ...state,
        showConfirm: action.payload,
      };
    }
    case 'SET_SELECTED_STUDENT': {
      return {
        ...state,
        selectedStudent: action.payload,
      };
    }
    case 'SET_IS_INSERT': {
      return {
        ...state,
        isInsert: action.payload,
      };
    }
    case 'SET_IS_UPDATE': {
      return {
        ...state,
        isUpdate: action.payload,
      };
    }
    case 'SET_SEARCH_TERM': {
      return {
        ...state,
        searchTerm: action.payload,
        filteredStudents: !action.payload
          ? state.students
          : state.students.filter((s) =>
              s.FNAME.toLowerCase().includes(action.payload.toLocaleLowerCase())
            ),
      };
    }
    case 'SORT_NUM': {
      return {
        ...state,
        sort_num: state.sort_num === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_num === 'DESC'
            ? state.filteredStudents.sort((a, b) => a.NUM - b.NUM)
            : state.filteredStudents.sort((a, b) => b.NUM - a.NUM),
      };
    }
    case 'SORT_YEAR': {
      return {
        ...state,
        sort_year: state.sort_year === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_year === 'DESC'
            ? state.filteredStudents.sort((a, b) => a.YEAR - b.YEAR)
            : state.filteredStudents.sort((a, b) => b.YEAR - a.YEAR),
      };
    }
    case 'SORT_PLATE': {
      return {
        ...state,
        sort_plate: state.sort_plate === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_plate === 'DESC'
            ? state.filteredStudents.sort((a, b) => +a.PLATE - +b.PLATE)
            : state.filteredStudents.sort((a, b) => +b.PLATE - +a.PLATE),
      };
    }
    case 'SORT_MB': {
      return {
        ...state,
        sort_mb: state.sort_mb === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_mb === 'DESC'
            ? state.filteredStudents.sort((a, b) => a.MB - b.MB)
            : state.filteredStudents.sort((a, b) => b.MB - a.MB),
      };
    }
    case 'SORT_MONEY': {
      return {
        ...state,
        sort_money: state.sort_money === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_money === 'DESC'
            ? state.filteredStudents.sort((a, b) => a.MONEY - b.MONEY)
            : state.filteredStudents.sort((a, b) => b.MONEY - a.MONEY),
      };
    }
    case 'SORT_FNAME': {
      return {
        ...state,
        sort_fname: state.sort_fname === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_fname === 'DESC'
            ? state.filteredStudents.sort((a, b) =>
                a.FNAME > b.FNAME ? 1 : b.FNAME > a.FNAME ? -1 : 0
              )
            : state.filteredStudents.sort((a, b) =>
                a.FNAME > b.FNAME ? -1 : b.FNAME > a.FNAME ? 1 : 0
              ),
      };
    }
    case 'SORT_BDAY': {
      return {
        ...state,
        sort_bday: state.sort_bday === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_bday === 'DESC'
            ? state.filteredStudents.sort(
                (a, b) =>
                  new Date(b.BDAY).getTime() - new Date(a.BDAY).getTime()
              )
            : state.filteredStudents.sort(
                (a, b) =>
                  new Date(a.BDAY).getTime() - new Date(b.BDAY).getTime()
              ),
      };
    }
    case 'SORT_ADDRESS': {
      return {
        ...state,
        sort_address: state.sort_address === 'DESC' ? 'ASC' : 'DESC',
        filteredStudents:
          state.sort_address === 'DESC'
            ? state.filteredStudents.sort((a, b) =>
                a.ADDRESS > b.ADDRESS ? 1 : b.ADDRESS > a.ADDRESS ? -1 : 0
              )
            : state.filteredStudents.sort((a, b) =>
                a.ADDRESS > b.ADDRESS ? -1 : b.ADDRESS > a.ADDRESS ? 1 : 0
              ),
      };
    }
    default: {
      return state;
    }
  }
};
