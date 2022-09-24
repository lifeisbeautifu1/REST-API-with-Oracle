import {  StudentsList, PaginateStudents } from '../components';

const StudentsPage = () => {
  return (
    <div className="font-primary w-4/5 mx-auto mt-8 h-full flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6">Students</h1>
      <StudentsList />
      <PaginateStudents itemsPerPage={10} />
    </div>
  );
};

export default StudentsPage;
