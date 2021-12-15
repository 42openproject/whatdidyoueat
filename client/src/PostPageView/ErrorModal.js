import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

function ErrorModal({ onToggleErrorModal }) {
  const modalRef = useRef();

  window.addEventListener('click', e => {
    e.preventDefault();
    if (e.target === modalRef.current) onToggleErrorModal();
    return false;
  });
  return (
    <>
      <div className="modal-container" ref={modalRef}>
        <div className="err-modal">
          <IoClose
            className="err-modal-close-btn btn"
            onClick={onToggleErrorModal}
          />
          <span className="err-modal__title">사진을 업로드해주세요</span>
          <button
            className="err-modal__agree-btn btn"
            onClick={onToggleErrorModal}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorModal;
