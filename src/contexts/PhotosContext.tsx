import React,{ReactElement} from 'react';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';

const BASE_URL = 'http://localhost:5001';
const GET_URL = `${BASE_URL}/images`;
const POST_URL = `${BASE_URL}/upload`;
const DELETE_URL = `${BASE_URL}/delete`;
const SEARCH_URL = `${BASE_URL}/image`;

export interface PhotoType{
    filename: string;             // Name of the file
    size: number;                 // File size in bytes
    dateUploaded: string;           // Date of upload
    content: string;              // Base64-encoded image content
}

interface PhotosContextType{
  loadedPhotos: PhotoType[];
  handleUpload: (file: File) => Promise<void>;
  handleDelete: (deleteItemDateUpload: string) => Promise<void>;
  handleSearch: (filename: string) => Promise<void>;
  loading: boolean;
}
  
const PhotosContext = createContext<PhotosContextType | null>(null);

const loadImages = async ()=> {
  try {
    const { data } = await axios.get(GET_URL);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const imageUpload = async (file:File) => {
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

const deleteImage = async (deleteItemDateUpload:string) => {
  try {
    const response = await axios.delete(
      `${DELETE_URL}/${deleteItemDateUpload}`
    );

    console.log('Image deleted:', response.data);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

const searchImage = async (filename:string) => {
  try {
    const { data } = await axios.get(`${SEARCH_URL}/${filename}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

interface PhotosContextProviderProps{
  children: ReactElement;
}
export const PhotosContextProvider = (props:PhotosContextProviderProps) => {
  const { children } = props;
  const [loadedPhotos, setLoadedPhotos] = useState<PhotoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleDelete = async (deleteItemDateUpload:string) => {
    setLoading(true);
    await deleteImage(deleteItemDateUpload);
    loadNewPhotos();
  };

  const handleUpload = async (file:File) => {
    setLoading(true);
    await imageUpload(file);
    loadNewPhotos();
  };

  const handleSearch = async (filename:string) => {
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
