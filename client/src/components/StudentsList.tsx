import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useStudentsContext } from '../contexts/studentsContext';
import { IStudent } from '../interfaces';

const StudentsList = () => {
  const { studentsState: {currentStudents}, studentsDispatch: dispatch } = useStudentsContext();
  const navigate = useNavigate();

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    student: IStudent
  ) => {
    e.stopPropagation();
    navigate('/students/' + student.NUM + '/update');
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    student: IStudent
  ) => {
    e.stopPropagation();
    try {
      await axios.delete('/students/' + student.NUM);
      dispatch({ type: 'DELETE', payload: student });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <table className="bg-gray-100 shadow-md text-left text-sm mt-4">
      <thead className="bg-indigo-400 text-white">
        <tr className="text-center">
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type:'SORT_ID'})}>Num</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type: 'SORT_FNAME'})}>Fname</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type:'SORT_YEAR'})}>Year</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type: 'SORT_BDAY'})}>Bday</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type: 'SORT_PLATE'})}>Plate</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type: 'SORT_MB'})}>Mb</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type: 'SORT_MONEY'})}>Money</th>
          <th className="p-4 px-8 cursor-pointer" onClick={() => dispatch({type: 'SORT_ADDRESS'})}>Address</th>
          <th className="p-4 px-8"></th>
          <th className="p-4 px-8"></th>
        </tr>
      </thead>
      <tbody>
        {currentStudents.map((s) =>  {
          return <tr
            key={s.NUM}
            onClick={(e) => navigate('/students/' + s.NUM)}
            className="text-gray-500 cursor-pointer text-center hover:bg-gray-200/90"
          >
            <td className="py-3 px-8">{s.NUM}</td>
            <td className="py-3 px-8">{s.FNAME}</td>
            <td className="py-3 px-8">
              {s.YEAR}
            </td>
            <td className="py-3 px-8">{new Date(s.BDAY).getFullYear()}/{new Date(s.BDAY).getMonth()}/{new Date(s.BDAY).getDay()}</td>
            <td className="py-3 px-8">{s.PLATE}</td>
            <td className="py-3 px-8">{s.MB.toFixed(2)}</td>
            <td className="py-3 px-8">{s.MONEY}</td>
            <td className="py-3 px-8">{s.ADDRESS}</td>
            <td className="py-3 px-8">
              <button
                onClick={(e) => handleUpdate(e, s)}
                className="py-2 px-3 bg-blue-300 text-white hover:bg-blue-400/90 rounded shadow cursor-pointer"
              >
                Update
              </button>
            </td>
            <td className="p-3">
              <button
                onClick={(e) => handleDelete(e, s)}
                className="py-2 px-3 bg-red-400 text-white hover:bg-red-500/90 rounded shadow cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
})}
      </tbody>
    </table>
  );
};

export default StudentsList;
