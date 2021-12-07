import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

function OnToggleTagModal({ addTagModal, onCreateNewTag, tagMsgRef }) {
  const [newTag, setNewTag] = useState('');
  const modalRef = useRef();

  const onChangeNewTag = e => {
    setNewTag(e.target.value);
    if (tagMsgRef.current.innerText.length !== 0)
      tagMsgRef.current.innerText = ''; // eslint-disable-line no-param-reassign
  };

  window.addEventListener('click', e => {
    e.preventDefault();
    if (e.target === modalRef.current) addTagModal();
    return false;
  });
  return (
    <>
      <div className="modal-container" ref={modalRef}>
        <div className="add-tag-modal">
          <IoClose className="add-tag-modal-close-btn" onClick={addTagModal} />
          <span className="add-tag-modal__title">추가할 태그를 입력하세요</span>
          <div className="add-tag-modal__input-box">
            <input
              type="text"
              className="add-tag-modal__input"
              onChange={onChangeNewTag}
              autoFocus
            />
          </div>
          <span className="add-tag-modal__check-msg" ref={tagMsgRef}></span>
          <button
            className="add-tag-modal__input-submit-btn btn"
            onClick={() => onCreateNewTag(newTag)}
          >
            추가하기
          </button>
        </div>
      </div>
    </>
  );
}

export default OnToggleTagModal;
