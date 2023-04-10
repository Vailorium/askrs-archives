import React from 'react';
import Modal from 'react-bootstrap/Modal';
import LoginForm from '../Auth/LoginForm';
import LoadingPanel from '../LoadingPanel';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  loading: boolean;
  onSubmit: () => void;
  onSuccess: () => void;
  onDone: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onHide,
  loading,
  onSubmit,
  onSuccess,
  onDone,
}) => (
  <Modal
    show={show}
    onHide={onHide}
    backdrop={loading ? 'static' : true}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <LoginForm
        onSuccess={onSuccess}
        onSubmit={onSubmit}
        onDone={onDone}
      />
    </Modal.Body>
    <LoadingPanel loading={loading} />
  </Modal>
);

export default LoginModal;
