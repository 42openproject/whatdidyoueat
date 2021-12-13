import React, { useState } from 'react';
import styled from 'styled-components';

const ImagePreview = styled.div`
  #uploaded-image {
    height: 350px;
    width: 350px;
    object-fit: cover;
    border-radius: 1rem;
  }
`;
const ImageUploader = ({ image, setImage }) => {
  const [previewImage, setPreviewImage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const imageChangeHandler = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = res => {
        setImage(e.target.files[0]);
        setPreviewImage(res.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="image-upload">
        {!isUploaded ? (
          <>
            <p>to upload image</p>
            <input
              id="upload-input"
              type="file"
              accept=".jpg, .jpeg, .gif, .png"
              onChange={imageChangeHandler}
            />
          </>
        ) : (
          <ImagePreview>
            <img
              id="uploaded-image"
              src={previewImage}
              draggable={false}
              alt="uploaded-img"
            />
          </ImagePreview>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
