import { Routes, Route } from 'react-router-dom';
import  StudentsPage  from './pages/StudentsPage';

function App() {
  return (
    <Routes>
      <Route path="/students" element={<StudentsPage/>} />
      {/* <Route path="/restaurants/:id/update" element={<Update />} />
      <Route path="/restaurants/:id" element={<Details />} /> */}
    </Routes>
  );
}

export default App;
