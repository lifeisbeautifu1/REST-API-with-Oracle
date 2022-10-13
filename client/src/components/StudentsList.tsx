import { useStudentsContext } from '../contexts/studentsContext';
import { IStudent } from '../interfaces';

const StudentsList = () => {
  const {
    studentsState: { currentStudents },
    studentsDispatch: dispatch,
  } = useStudentsContext();

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    student: IStudent
  ) => {
    dispatch({ type: 'SET_SELECTED_STUDENT', payload: student });
    dispatch({ type: 'SET_IS_UPDATE', payload: true });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    student: IStudent
  ) => {
    dispatch({ type: 'SET_SELECTED_STUDENT', payload: student });
    dispatch({ type: 'SET_SHOW_CONFIRM', payload: true });
  };

  return (
    <table className=" shadow-md text-left text-sm mt-4">
      <thead className="bg-gray-100/90 text-gray-700 ">
        <tr className="uppercase">
          <th
            className="p-4 px-8 cursor-pointer"
            onClick={() => dispatch({ type: 'SORT_NUM' })}
          >
            <div className="flex items-center justify-center">
              Num{' '}
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
            onClick={() => dispatch({ type: 'SORT_FNAME' })}
          >
            <div className="flex items-center justify-center">
              <span>Fname</span>{' '}
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
            onClick={() => dispatch({ type: 'SORT_YEAR' })}
          >
            <div className="flex items-center justify-center">
              <span>Year</span>{' '}
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
            onClick={() => dispatch({ type: 'SORT_BDAY' })}
          >
            <div className="flex items-center justify-center">
              Bday{' '}
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
            onClick={() => dispatch({ type: 'SORT_PLATE' })}
          >
            <div className="flex items-center justify-center">
              Plata{' '}
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
            onClick={() => dispatch({ type: 'SORT_MB' })}
          >
            <div className="flex items-center justify-center">
              Mb{' '}
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
            onClick={() => dispatch({ type: 'SORT_MONEY' })}
          >
            <div className="flex items-center justify-center">
              Money{' '}
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
            onClick={() => dispatch({ type: 'SORT_ADDRESS' })}
          >
            <div className="flex items-center justify-center">
              Address{' '}
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
        {currentStudents.map((s) => {
          return (
            <tr
              key={s.NUM}
              className="text-gray-500 border-b text-center hover:bg-gray-100/90 text-[13px]"
            >
              <td className="py-3 px-8 font-semibold">{s.NUM}</td>
              <td className="py-3 px-8">{s.FNAME}</td>
              <td className="py-3 px-8">{s.YEAR}</td>
              <td className="py-3 px-8">
                {new Date(s.BDAY).getFullYear()}/{new Date(s.BDAY).getMonth()}/
                {new Date(s.BDAY).getDay()}
              </td>
              <td className="py-3 px-8">{s.PLATE}</td>
              <td className="py-3 px-8 font-semibold">{s.MB.toFixed(2)}</td>
              <td className="py-3 px-8">{s.MONEY}</td>
              <td className="py-3 px-8">{s.ADDRESS}</td>
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

export default StudentsList;
