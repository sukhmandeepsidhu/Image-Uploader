import PhotosContext from "../contexts/PhotosContext";
import { useContext } from "react";

export const usePhotosContext = () => {
    const photosContext = useContext(PhotosContext);
  
    if (!photosContext) {
      throw new Error(
        "usePhotosContext has to be used within <PhotosContext.Provider>"
      );
    }
  
    return photosContext;
};
  
