import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import RegisterForm from '../Auth/RegisterForm';

interface RegisterModalProps {
  show: boolean;
  onHide: () => void;
  loading: boolean;
  onSubmit: () => void;
  onSuccess: () => void;
  onDone: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
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
      <Modal.Title>Register</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <RegisterForm
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

export default RegisterModal;
