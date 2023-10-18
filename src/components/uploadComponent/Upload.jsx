import { HiUpload } from 'react-icons/hi';
import { Modal, Button } from 'react-bootstrap';
import { MDBFile } from 'mdb-react-ui-kit';
import { useState } from 'react';
import './uploadStyles.css';

const ModalComponent = ({ show, onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = () => {
    onSubmit(selectedFile);
    onClose();
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBFile type='file' accept='image/jpeg' onChange={handleFileChange} />
        <div className='warningText'>NOTE: File must be JPEG</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='light' onClick={onClose}>
          Close
        </Button>
        <Button variant='secondary' onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Upload = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (file) => {
    onClick(file);
  };

  return (
    <>
      <HiUpload className='uploadIcon' onClick={openModal} />
      <ModalComponent
        show={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Upload;
