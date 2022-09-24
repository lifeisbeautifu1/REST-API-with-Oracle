import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import  StudentsPage  from './pages/StudentsPage';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/students" />} />
      <Route  path="/students" element={<StudentsPage/>} />
    </Routes>
  );
}

export default App;
