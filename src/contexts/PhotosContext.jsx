import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5001';
const GET_URL = `${BASE_URL}/images`;
const POST_URL = `${BASE_URL}/upload`;
const DELETE_URL = `${BASE_URL}/delete`;
const SEARCH_URL = `${BASE_URL}/image`;

const PhotosContext = createContext();

const loadImages = async () => {
  try {
    const { data } = await axios.get(GET_URL);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await axios.post(POST_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Image uploaded:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const deleteImage = async (deleteItemDateUpload) => {
  try {
    const response = await axios.delete(
      `${DELETE_URL}/${deleteItemDateUpload}`
    );

    console.log('Image deleted:', response.data);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

const searchImage = async (filename) => {
  try {
    const { data } = await axios.get(`${SEARCH_URL}/${filename}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const PhotosContextProvider = ({ children }) => {
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNewPhotos = async () => {
    loadImages().then((loadedImages) => {
      setLoadedPhotos(loadedImages);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    loadNewPhotos();
  }, []);

  const handleDelete = async (deleteItemDateUpload) => {
    setLoading(true);
    await deleteImage(deleteItemDateUpload);
    loadNewPhotos();
  };

  const handleUpload = async (file) => {
    setLoading(true);
    await imageUpload(file);
    loadNewPhotos();
  };

  const handleSearch = async (filename) => {
    setLoading(true);

    if (filename) {
      searchImage(filename).then((searchedImages) => {
        setLoadedPhotos(searchedImages);
        setLoading(false);
      });
    } else {
      loadNewPhotos();
    }
  };

  return (
    <PhotosContext.Provider
      value={{
        loadedPhotos,
        handleUpload,
        handleDelete,
        handleSearch,
        loading,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosContext;
