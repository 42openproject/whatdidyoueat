import React, { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';

const ImageUploader = ({ setImage }) => {
  const [previewImage, setPreviewImage] = useState('');
  // const [isUploaded, setIsUploaded] = useState(false);

  const imageChangeHandler = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = res => {
        setImage(e.target.files[0]);
        setPreviewImage(res.target.result);
        // setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="image-upload">
        <div className="image-upload--upload">
          <div className="image-upload--upload__thumbnail">
            {previewImage && (
              <img
                id="uploaded-image"
                src={previewImage}
                draggable={false}
                alt="uploaded-img"
                className="image-upload--upload__img"
              />
            )}
          </div>
        </div>
        <div className="image-upload--overlay">
          <label htmlFor="upload-input" className="post-page__image-input">
            <BiImageAdd className="upload-input__icon" />
          </label>
          <input
            id="upload-input"
            type="file"
            accept=".jpg, .jpeg, .gif, .png"
            onChange={imageChangeHandler}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
