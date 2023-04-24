import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteModalProps {
  onYes: () => void,
  nameOfItem: string;
  handleClose: () => void;
  show: boolean;
}
const DeleteModal: React.FC<DeleteModalProps> = (props: DeleteModalProps) => {
  const {
    onYes, nameOfItem, handleClose, show,
  } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {nameOfItem}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {nameOfItem}?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={async () => { await onYes(); handleClose(); }}>
          Yes
        </Button>
        <Button variant="primary" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteModal;
