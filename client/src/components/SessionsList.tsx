import { useSessionsContext } from "../contexts/sessionsContext";
import { ISession } from "../interfaces";

const SessionsList = () => {
  const {
    sessionsState: { currentSessions },
    sessionsDispatch: dispatch,
  } = useSessionsContext();

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    session: ISession
  ) => {
    dispatch({ type: "SET_SELECTED_SESSION", payload: session });
    dispatch({ type: "SET_IS_UPDATE", payload: true });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    session: ISession
  ) => {
    dispatch({ type: "SET_SELECTED_SESSION", payload: session });
    dispatch({ type: "SET_SHOW_CONFIRM", payload: true });
  };

  return (
    <table className=" shadow-md text-left text-sm mt-4">
      <thead className="bg-gray-100/90 text-gray-700 ">
        <tr className="uppercase">
          <th
            className="p-4 px-8 cursor-pointer"
            onClick={() => dispatch({ type: "SORT_NUM" })}
          >
            <div className="flex items-center justify-center">
              Num{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 w-3 h-3 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
              </svg>
            </div>
          </th>
          <th
            className="p-4 px-8 cursor-pointer"
            onClick={() => dispatch({ type: "SORT_SESSNUM" })}
          >
            <div className="flex items-center justify-center">
              <span>SessNum</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 w-3 h-3 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
              </svg>
            </div>
          </th>
          <th
            className="p-4 px-8 cursor-pointer"
            onClick={() => dispatch({ type: "SORT_SUB1" })}
          >
            <div className="flex items-center justify-center">
              <span>Sub1</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 w-3 h-3 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
              </svg>
            </div>
          </th>
          <th
            className="p-4 px-8 cursor-pointer"
            onClick={() => dispatch({ type: "SORT_SUB2" })}
          >
            <div className="flex items-center justify-center">
              Sub2{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 w-3 h-3 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
              </svg>
            </div>
          </th>
          <th
            className="p-4 px-8 cursor-pointer"
            onClick={() => dispatch({ type: "SORT_SUB3" })}
          >
            <div className="flex items-center justify-center">
              Sub3{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 w-3 h-3 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
              </svg>
            </div>
          </th>
          <th className="p-4 px-8"></th>
          <th className="p-4 px-8"></th>
        </tr>
      </thead>
      <tbody>
        {currentSessions.map((s) => {
          return (
            <tr
              key={s.NUM + " " + s.SESSNUM}
              className="text-gray-500 border-b text-center hover:bg-gray-100/90 text-[13px]"
            >
              <td className="py-3 px-8 font-semibold">{s.NUM}</td>
              <td className="py-3 px-8">{s.SESSNUM}</td>
              <td className="py-3 px-8">{s.SUB1}</td>
              <td className="py-3 px-8">{s.SUB2}</td>
              <td className="py-3 px-8">{s.SUB3}</td>
              <td className="py-3 px-8">
                <button
                  onClick={(e) => handleUpdate(e, s)}
                  className="cursor-pointer text-blue-600 font-semibold hover:underline"
                >
                  Update
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={(e) => handleDelete(e, s)}
                  className="cursor-pointer font-semibold text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SessionsList;
