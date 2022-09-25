import { ISession } from "../interfaces";

type ORDER = "DESC" | "ASC";

export type State = {
  sessions: ISession[];
  filteredSessions: ISession[];
  currentSessions: ISession[];
  isInsert: boolean;
  isUpdate: boolean;
  showConfirm: boolean;
  selectedSession: ISession | null;
  sort_num: ORDER;
  sort_sessnum: ORDER;
  sort_sub1: ORDER;
  sort_sub2: ORDER;
  sort_sub3: ORDER;
  searchTerm: string;
};

export type SessionsAction =
  | {
      type: "ADD";
      payload: ISession;
    }
  | {
      type: "DELETE";
      payload: ISession;
    }
  | {
      type: "UPDATE";
      payload: ISession;
    }
  | {
      type: "SET";
      payload: ISession[];
    }
  | {
      type: "SET_SEARCH_TERM";
      payload: string;
    }
  | {
      type: "SET_CURRENT_SESSIONS";
      payload: ISession[];
    }
  | {
      type: "SET_SHOW_CONFIRM";
      payload: boolean;
    }
  | {
      type: "SET_SELECTED_SESSION";
      payload: ISession | null;
    }
  | {
      type: "SET_IS_INSERT";
      payload: boolean;
    }
  | {
      type: "SET_IS_UPDATE";
      payload: boolean;
    }
  | {
      type: "SORT_NUM";
    }
  | {
      type: "SORT_SESSNUM";
    }
  | {
      type: "SORT_SUB1";
    }
  | {
      type: "SORT_SUB2";
    }
  | {
      type: "SORT_SUB3";
    };

export const sessionsReducer = (
  state: State,
  action: SessionsAction
): State => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
        filteredSessions: [...state.filteredSessions, action.payload],
      };
    }
    case "DELETE": {
      return {
        ...state,
        sessions: state.sessions.filter(
          (s) =>
            s.NUM !== action.payload.NUM && s.SESSNUM !== action.payload.SESSNUM
        ),
        filteredSessions: state.filteredSessions.filter(
          (s) =>
            s.NUM !== action.payload.NUM && s.SESSNUM !== action.payload.SESSNUM
        ),
      };
    }
    case "UPDATE": {
      return {
        ...state,
        sessions: state.sessions.map((r) =>
          r.NUM === state.selectedSession?.NUM &&
          r.SESSNUM === state.selectedSession?.SESSNUM
            ? action.payload
            : r
        ),
        filteredSessions: state.filteredSessions.map((r) =>
          r.NUM === state.selectedSession?.NUM &&
          r.SESSNUM === state.selectedSession.SESSNUM
            ? action.payload
            : r
        ),
      };
    }
    case "SET": {
      return {
        ...state,
        sessions: action.payload,
        filteredSessions: action.payload,
        currentSessions: action.payload.slice(0, 10),
      };
    }
    case "SET_CURRENT_SESSIONS": {
      return {
        ...state,
        currentSessions: action.payload,
      };
    }
    case "SET_SHOW_CONFIRM": {
      return {
        ...state,
        showConfirm: action.payload,
      };
    }
    case "SET_SELECTED_SESSION": {
      return {
        ...state,
        selectedSession: action.payload,
      };
    }
    case "SET_IS_INSERT": {
      return {
        ...state,
        isInsert: action.payload,
      };
    }
    case "SET_IS_UPDATE": {
      return {
        ...state,
        isUpdate: action.payload,
      };
    }
    case "SET_SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
        filteredSessions: !action.payload
          ? state.sessions
          : state.sessions.filter((s) =>
              s.NUM.toString()
                .toLowerCase()
                .includes(action.payload.toLocaleLowerCase())
            ),
      };
    }
    case "SORT_NUM": {
      return {
        ...state,
        sort_num: state.sort_num === "DESC" ? "ASC" : "DESC",
        filteredSessions:
          state.sort_num === "DESC"
            ? state.filteredSessions.sort((a, b) => a.NUM - b.NUM)
            : state.filteredSessions.sort((a, b) => b.NUM - a.NUM),
      };
    }
    case "SORT_SESSNUM": {
      return {
        ...state,
        sort_sessnum: state.sort_sessnum === "DESC" ? "ASC" : "DESC",
        filteredSessions:
          state.sort_sessnum === "DESC"
            ? state.filteredSessions.sort((a, b) => a.SESSNUM - b.SESSNUM)
            : state.filteredSessions.sort((a, b) => b.SESSNUM - a.SESSNUM),
      };
    }
    case "SORT_SUB1": {
      return {
        ...state,
        sort_sub1: state.sort_sub1 === "DESC" ? "ASC" : "DESC",
        filteredSessions:
          state.sort_sub1 === "DESC"
            ? state.filteredSessions.sort((a, b) => a.SUB1 - b.SUB1)
            : state.filteredSessions.sort((a, b) => b.SUB1 - a.SUB1),
      };
    }
    case "SORT_SUB2": {
      return {
        ...state,
        sort_sub2: state.sort_sub2 === "DESC" ? "ASC" : "DESC",
        filteredSessions:
          state.sort_sub2 === "DESC"
            ? state.filteredSessions.sort((a, b) => a.SUB2 - b.SUB2)
            : state.filteredSessions.sort((a, b) => b.SUB2 - a.SUB2),
      };
    }
    case "SORT_SUB3": {
      return {
        ...state,
        sort_sub3: state.sort_sub3 === "DESC" ? "ASC" : "DESC",
        filteredSessions:
          state.sort_sub3 === "DESC"
            ? state.filteredSessions.sort((a, b) => a.SUB3 - b.SUB3)
            : state.filteredSessions.sort((a, b) => b.SUB3 - a.SUB3),
      };
    }

    default: {
      return state;
    }
  }
};
