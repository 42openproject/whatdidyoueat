import axios from 'axios';
import { useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function EditNickModal({ editUserNickname, googleId, setUserNickname }) {
  const [newNickname, setNewNickname] = useState('');
  const [dupFlag, setDupFlag] = useState(false);
  const modalRef = useRef();
  const nickCheckRef = useRef();

  const onChangeNewNick = e => {
    if (dupFlag) setDupFlag(false);
    if (nickCheckRef.current.innerText) nickCheckRef.current.innerText = '';
    setNewNickname(e.target.value);
  };

  const onClickCheckNickname = async () => {
    try {
      if (newNickname.length >= 15 || newNickname.length <= 2) {
        nickCheckRef.current.innerText =
          '3자 이상 15자 이하의 영문, 숫자만 입력해주세요';
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/nickname/check/${newNickname}`,
        );
        if (data.success) {
          if (data.data.duplicate) {
            nickCheckRef.current.innerText = '중복된 아이디입니다';
            return;
          }
          setDupFlag(true);
          nickCheckRef.current.innerText = '사용 가능한 아이디입니다';
        } else {
          console.log('nick 중복 체크 api 요청 false');
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const onClickSubmit = async () => {
    if (!dupFlag) {
      nickCheckRef.current.innerText = '중복 검사를 해주세요';
    } else {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/nickname`,
        {
          googleId,
          nickname: newNickname,
        },
      );
      // console.log(data);
      if (data.success) {
        setDupFlag(false);
        editUserNickname();
        setUserNickname(newNickname);
      } else console.log('nick api post 요청 false');
    }
  };

  window.addEventListener('click', e => {
    // e.preventDefault();
    if (e.target === modalRef.current) editUserNickname();
    return false;
  });
  return (
    <>
      <div className="modal-container" ref={modalRef}>
        <div className="edit-nick-modal">
          <IoClose
            className="edit-nick-modal-close-btn btn"
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
            <FiCheck
              className="edit-nick-modal__input-check-btn btn"
              onClick={onClickCheckNickname}
            />
          </div>
          <span
            className="edit-nick-modal__check-msg"
            ref={nickCheckRef}
          ></span>
          <button
            className="edit-nick-modal__input-submit-btn btn"
            onClick={onClickSubmit}
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}

export default EditNickModal;
