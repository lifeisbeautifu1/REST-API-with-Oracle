import { IStudent } from '../interfaces';

export type State = IStudent[];

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
    };

export const studentsReducer = (state: State, action: StudentsAction): State => {
  switch (action.type) {
    case 'ADD': {
      return [...state, action.payload];
    }
    case 'DELETE': {
      return state.filter((r) => r.NUM !== action.payload.NUM);
    }
    case 'UPDATE': {
      return state.map((r) =>
        r.NUM === action.payload.NUM ? action.payload : r
      );
    }
    case 'SET': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
