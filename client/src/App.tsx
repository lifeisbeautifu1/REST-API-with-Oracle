import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { SharedLayout } from './components';
import { StudentsPage, SessionsPage } from './pages';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route index element={<Navigate to="/students" />} />
        <Route
          path="/students"
          element={
            <SharedLayout>
              <StudentsPage />
            </SharedLayout>
          }
        />
        <Route
          path="/sessions"
          element={
            <SharedLayout>
              <SessionsPage />
            </SharedLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
