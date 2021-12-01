import { useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function EditNickModal({ editUserNickname }) {
  const [newNickname, setNewNickname] = useState('');
  const modalRef = useRef();

  const onChangeNewNick = e => {
    setNewNickname(e.target.value);
  };

  window.addEventListener('click', e => {
    if (e.target === modalRef.current) editUserNickname();
    return false;
  });
  return (
    <>
      <div className="modal-container" ref={modalRef}>
        <div className="edit-nick-modal">
          <IoClose
            className="edit-nick-modal-close-btn"
            onClick={editUserNickname}
          />
          <span className="edit-nick-modal__title">새 닉네임을 입력하세요</span>
          <div className="edit-nick-modal__input-box">
            <input
              type="text"
              className="edit-nick-modal__input"
              onChange={onChangeNewNick}
              autoFocus
            />
            <FiCheck className="edit-nick-modal__input-check-btn" />
          </div>
          <span className="edit-nick-modal__check-msg"></span>
          <button className="edit-nick-modal__input-submit-btn">
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}

export default EditNickModal;
