import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../services/UserSlice';
import AuthenticatedDropdown from './AuthenticatedDropdown';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthContainer: React.FC = () => {
  const profile: UserProfile = useSelector((state: any) => state.user.profile);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const onLoginSubmit = () => setLoginLoading(true);
  const onLoginDone = () => setLoginLoading(false);
  const onRegisterSubmit = () => setRegisterLoading(true);
  const onRegisterDone = () => setRegisterLoading(false);

  return (
    <>
      <Nav className="justify-content-end pe-3">
        {
          profile.username ? (
            <AuthenticatedDropdown profile={profile} />
          ) : (
            <>
              <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
              <Nav.Link onClick={handleShowRegisterModal}>Register</Nav.Link>
            </>
          )
        }
      </Nav>

      <LoginModal
        show={showLoginModal}
        onHide={handleCloseLoginModal}
        loading={loginLoading}
        onSubmit={onLoginSubmit}
        onSuccess={handleCloseLoginModal}
        onDone={onLoginDone}
      />

      <RegisterModal
        show={showRegisterModal}
        onHide={handleCloseRegisterModal}
        loading={registerLoading}
        onSubmit={onRegisterSubmit}
        onSuccess={handleCloseRegisterModal}
        onDone={onRegisterDone}
      />
    </>
  );
};

export default AuthContainer;
