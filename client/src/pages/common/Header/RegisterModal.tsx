import React from 'react';
import Modal from 'react-bootstrap/Modal';
import RegisterForm from '../Auth/RegisterForm';
import LoadingPanel from '../LoadingPanel';

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
    <LoadingPanel loading={loading} />
  </Modal>
);

export default RegisterModal;
