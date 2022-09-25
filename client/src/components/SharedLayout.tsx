import Navbar from "./Navbar";
import ConfirmStudentModal from "./ConfirmStudentModal";

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <ConfirmStudentModal />
      {children}
    </>
  );
};

export default SharedLayout;
