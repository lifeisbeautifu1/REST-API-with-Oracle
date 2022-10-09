import { StudentsList, PaginateStudents, Record } from '../components';
import { useStudentsContext } from '../contexts/studentsContext';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
};
const StudentsPage = () => {
  const { studentsDispatch: dispatch } = useStudentsContext();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="font-primary w-4/5 mx-auto h-full flex flex-col items-center"
    >
      <div className="w-full flex items-center justify-end gap-4 relative">
        <button
          onClick={() => dispatch({ type: 'SET_IS_INSERT', payload: true })}
          className="flex py-2 px-4 text-sm hover:bg-gray-100/90 border border-gray-300 shadow flex items-center justify-center gap-2 font-semibold rounded"
        >
          Insert New Row{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <Record />
        <div className="flex items-center shadow-inner bg-gray-100/80 gap-3 py-2 px-2 border rounded-md text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
            }
            type="text"
            className="outline-none bg-transparent text-sm"
            placeholder="Search for students"
          />
        </div>
      </div>
      <StudentsList />
      <PaginateStudents itemsPerPage={10} />
    </motion.div>
  );
};

export default StudentsPage;
