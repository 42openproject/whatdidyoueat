import { useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function AddTagModal({ addTag }) {
  const [newTag, setNewTag] = useState('');
  const modalRef = useRef();

  const onChangeNewTag = e => {
    setNewTag(e.target.value);
  };

  window.addEventListener('click', e => {
    if (e.target === modalRef.current) addTag();
    return false;
  });
  return (
    <>
      <div className="modal-container" ref={modalRef}>
        <div className="add-tag-modal">
          <IoClose className="add-tag-modal-close-btn" onClick={addTag} />
          <span className="add-tag-modal__title">추가할 태그를 입력하세요</span>
          <div className="add-tag-modal__input-box">
            <input
              type="text"
              className="add-tag-modal__input"
              onChange={onChangeNewTag}
              autoFocus
            />
          </div>
          <span className="add-tag-modal__check-msg"></span>
          <button className="add-tag-modal__input-submit-btn">추가하기</button>
        </div>
      </div>
    </>
  );
}

export default AddTagModal;
