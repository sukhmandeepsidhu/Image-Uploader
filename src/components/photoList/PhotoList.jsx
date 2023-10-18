import Photo from '../photoComponent/Photo';
import PhotosContext from '../../contexts/PhotosContext';
import { useContext } from 'react';
import './photoListStyles.css';

const PhotoList = () => {
  const { handleDelete, loadedPhotos } = useContext(PhotosContext);

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
