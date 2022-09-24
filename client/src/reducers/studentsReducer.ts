import { IStudent } from '../interfaces';

type ORDER = 'DESC' | 'ASC'

export type State = {
  students: IStudent[],
  currentStudents: IStudent[],
  sort_id: ORDER,
  sort_year: ORDER,
  sort_plate: ORDER,
  sort_mb: ORDER,
  sort_money: ORDER,
  sort_fname: ORDER,
  sort_bday: ORDER,
  sort_address: ORDER,
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
    |
  {
    type: 'SET_CURRENT_STUDENTS';
    payload: IStudent[];  
  } | {
    type: 'SORT_ID'
  } | {
    type: 'SORT_YEAR'
  }
   | {
    type: 'SORT_PLATE'
  } | {
    type: 'SORT_MB'
  } | {
    type: 'SORT_MONEY'
  }  | {
    type: 'SORT_FNAME'
  } | {
    type: 'SORT_BDAY'
  } | {
    type: 'SORT_ADDRESS'
  }

export const studentsReducer = (state: State, action: StudentsAction): State => {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        students: [...state.students, action.payload]
      };
    }
    case 'DELETE': {
      return  {
        ...state,
        students: state.students.filter(s => s.NUM !== action.payload.NUM)
      }    
    }
    case 'UPDATE': {
      return {
        ...state,
        students: state.students.map((r) =>
        r.NUM === action.payload.NUM ? action.payload : r
      )
      } 
    }
    case 'SET': {
      return {
        ...state,
        students: action.payload,
        currentStudents: action.payload.slice(0, 10),
      };
    }
    case 'SET_CURRENT_STUDENTS': {
      return {
        ...state,
        currentStudents: action.payload,
      }
    }
    case 'SORT_ID': {
      return {
        ...state,
        sort_id: state.sort_id === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_id === 'DESC' ? state.students.sort((a, b) => a.NUM - b.NUM) : state.students.sort((a, b) => b.NUM - a.NUM)
      }
    }
    case 'SORT_YEAR': {
      return {
        ...state,
        sort_year: state.sort_year === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_year === 'DESC' ? state.students.sort((a, b) => a.YEAR - b.YEAR) : state.students.sort((a, b) => b.YEAR - a.YEAR)
      }
    }
    case 'SORT_PLATE': {
      return {
        ...state,
        sort_plate: state.sort_plate === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_plate === 'DESC' ? state.students.sort((a, b) => +(a.PLATE) - (+b.PLATE)) : state.students.sort((a, b) => +b.PLATE - +a.PLATE)
      }
    }
    case 'SORT_MB': {
      return {
        ...state,
        sort_mb: state.sort_mb === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_mb === 'DESC' ? state.students.sort((a, b) => a.MB - b.MB) : state.students.sort((a, b) => b.MB - a.MB)
      }
    } 
    case 'SORT_MONEY': {
      return {
        ...state,
        sort_money: state.sort_money === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_money === 'DESC' ? state.students.sort((a, b) => a.MONEY - b.MONEY) : state.students.sort((a, b) => b.MONEY - a.MONEY)
      }
    }
    case 'SORT_FNAME': {
      return {
        ...state,
        sort_fname: state.sort_fname === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_fname === 'DESC' ? state.students.sort((a, b) => (a.FNAME > b.FNAME) ? 1 : ((b.FNAME > a.FNAME) ? -1 : 0)) : state.students.sort((a, b) => (a.FNAME > b.FNAME) ? -1 : ((b.FNAME > a.FNAME) ? 1 : 0))
      }
    }
    case 'SORT_BDAY': {
      return {
        ...state,
        sort_bday: state.sort_bday === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_bday === 'DESC' ? state.students.sort((a, b) => (new Date(b.BDAY)).getTime() - (new Date(a.BDAY)).getTime()) : state.students.sort((a, b) => (new Date(a.BDAY)).getTime() - (new Date(b.BDAY)).getTime())
      }
    }
    case 'SORT_ADDRESS': {
      return {
        ...state,
        sort_address: state.sort_address === 'DESC' ? 'ASC' : 'DESC',
        students: state.sort_address === 'DESC' ? state.students.sort((a, b) => (a.ADDRESS > b.ADDRESS) ? 1 : ((b.ADDRESS > a.ADDRESS) ? -1 : 0)) : state.students.sort((a, b) => (a.ADDRESS > b.ADDRESS) ? -1 : ((b.ADDRESS > a.ADDRESS) ? 1 : 0))
      }
    }
    default: {
      return state;
    }
  }
};
