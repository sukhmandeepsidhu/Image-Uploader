import React from 'react';
import './photoStyles.css';
import { Card } from 'react-bootstrap';
import { HiTrash } from 'react-icons/hi';
import { PhotoType } from '../../contexts/PhotosContext';

interface PhotoProps{
  onDelete: (dateUploaded: string) => Promise<void>;
  photo: PhotoType;
}

const Photo = ({ photo, onDelete }:PhotoProps) => {
  const { content, filename, dateUploaded } = photo;

  const handleDelete = () => {
    onDelete(dateUploaded);
  };

  return (
    <Card className='photoCard'>
      <Card.Img variant='top' src={`data:image/png;base64,${content}`} />
      <Card.Body>
        <Card.Text>{filename}</Card.Text>
        <HiTrash onClick={handleDelete} className='deleteIcon' />
      </Card.Body>
    </Card>
  );
};
export default Photo;
