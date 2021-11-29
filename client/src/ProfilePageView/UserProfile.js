import { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

function UserProfile() {
  const [userImage, setUserImage] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [editNickModal, setEditNickModal] = useState(false);

  const defaultUserImage =
    'https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png';
  const googleId = localStorage.getItem('googleId');

  useEffect(async () => {
    // user image 요청 추가

    // user nickname 요청
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/${googleId}`)
      .then(res => {
        console.log(res.data.nickname);
        setUserNickname(res.data.nickname);
      });
  }, []);

  const onChangeNewNick = e => {
    setNewNickname(e.target.value);
  };

  const editUserNickname = () => {
    console.log(`edit btn click!!!`);
    setEditNickModal(!editNickModal);
    console.log(editNickModal);
  };

  return (
    <>
      <section className="user-profile">
        <div className="user-profile__img">
          <img
            src={userImage === '' ? defaultUserImage : userImage}
            className="user-profile__img__img"
          />
        </div>
        <div className="user-profile__nickname">
          <span className="user-profile__nickname--text">{userNickname}</span>
          <div className="user-profile__nickname--edit-btn">
            <MdModeEdit onClick={editUserNickname} />
          </div>
        </div>
      </section>
      {editNickModal && (
        <div className="modal-container">
          <div className="edit-nick-modal">
            <IoClose className="edit-nick-modal-close-btn" />
            <span className="edit-nick-modal__title">
              새 닉네임을 입력하세요
            </span>
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
      )}
    </>
  );
}

export default UserProfile;
