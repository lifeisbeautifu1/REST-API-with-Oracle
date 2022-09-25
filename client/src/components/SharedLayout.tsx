import {
  ConfirmSessionModal,
  ConfirmStudentModal,
  SessionsModal,
  Navbar,
  StudentsModal,
} from ".";

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <ConfirmSessionModal />
      <ConfirmStudentModal />
      <StudentsModal />
      <SessionsModal />
      {children}
    </>
  );
};

export default SharedLayout;
