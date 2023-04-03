import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import LoginForm from '../Auth/LoginForm';

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
    <div
      className="loading-screen loading-screen-rounded"
      style={{ display: loading ? 'flex' : 'none' }}
    >
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  </Modal>
);

export default LoginModal;
