import Navbar from "./Navbar";
import ConfirmStudentModal from "./ConfirmStudentModal";
import StudentsModal from "./StudentsModal";

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <ConfirmStudentModal />
      <StudentsModal />
      {children}
    </>
  );
};

export default SharedLayout;
