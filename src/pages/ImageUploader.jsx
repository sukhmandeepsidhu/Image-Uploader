import { Container, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import { SEARCH_PLACEHOLDER } from '../constants';
import Upload from '../components/uploadComponent/Upload';
import NavBar from '../components/navbar/NavBar';
import PhotoList from '../components/photoList/PhotoList';
import SearchInput from '../components/navbar/SearchInput';
import PhotosContext from '../contexts/PhotosContext';
import './imageUploaderSyles.css';

const ImageUploader = () => {
  const { handleUpload, handleSearch, loading, loadedPhotos } =
    useContext(PhotosContext);

  return (
    <div>
      {!loading ? (
        <>
          <NavBar
            left={
              <SearchInput
                placeholder={SEARCH_PLACEHOLDER}
                onSubmit={handleSearch}
              />
            }
            right={<Upload onClick={handleUpload} />}
          />
          <Container>
            <h3>{`Photo Count: ${loadedPhotos.length}`}</h3>
            <PhotoList />
          </Container>
        </>
      ) : (
        <div className='loadingPage'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
