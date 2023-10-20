import React from 'react';
import Photo from '../photoComponent/Photo';
import './photoListStyles.css';
import { usePhotosContext } from '../../hooks/usePhotoContext';


const PhotoList = () => {
  const { handleDelete, loadedPhotos } = usePhotosContext();

  return (
    <div className='photoGrid'>
      {loadedPhotos &&
        loadedPhotos.map((currPhoto) => (
          <Photo
            key={currPhoto.dateUploaded}
            photo={currPhoto}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
};
export default PhotoList;
