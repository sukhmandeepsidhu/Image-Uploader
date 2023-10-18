import ImageUploader from './pages/ImageUploader';
import { PhotosContextProvider } from './contexts/PhotosContext';

const App = () => {
  return (
    <PhotosContextProvider>
      <ImageUploader />
    </PhotosContextProvider>
  );
};

export default App;
