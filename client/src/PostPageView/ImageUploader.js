import React, { useState } from 'react';

const ImageUploader = ({ setImage }) => {
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
            <label htmlFor="upload-input" className="post-page__image-input">
              업로드
            </label>
            <input
              id="upload-input"
              type="file"
              accept=".jpg, .jpeg, .gif, .png"
              onChange={imageChangeHandler}
              style={{ display: 'none' }}
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
