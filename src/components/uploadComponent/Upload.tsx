import React,{ChangeEvent} from 'react';
import './uploadStyles.css';
import { HiUpload } from 'react-icons/hi';
import { Modal, Button } from 'react-bootstrap';
import { MDBFile } from 'mdb-react-ui-kit';
import { useState } from 'react';

interface ModalComponentProps{
  show: boolean;
  onClose: () => void; 
  onSubmit: (file: File) => void;
}

const ModalComponent = ({ show, onClose, onSubmit }: ModalComponentProps) => {
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); 
    }
  };
  const handleUpload = () => {
    onSubmit(selectedFile!);
    onClose();
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBFile accept='image/jpeg' onChange={handleFileChange} />
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

interface UploadProps{
  onClick: (file:File) => Promise<void>;
}

const Upload = ({ onClick }: UploadProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const handleSubmit = (file:File) => {
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
