import Gallery from "react-image-gallery";
const ImageGallery = Gallery.default? Gallery.default : Gallery;
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useRef } from "react";

function MyGallery({ images = [] }) {
  const imageGalleryRef = useRef(null);
  const onClickHandler = () => {
    imageGalleryRef.current.fullScreen();
  };
  return (
    <div id="gallery">
      <ImageGallery
        items={images}
        slideOnThumbnailOver="true"
        showBullets="True"
        ref={imageGalleryRef}
        onClick={onClickHandler}
      />
    </div>
  );
}
export default MyGallery;