import { useEffect, useRef, useState } from 'react';
import { MdFormatListNumberedRtl, MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import EditNickModal from './EditNickModal';

function UserProfile() {
  const [userImage, setUserImage] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [editNickModal, setEditNickModal] = useState(false);

  const defaultUserImage =
    'https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png';
  const googleId = localStorage.getItem('googleId');

  useEffect(async () => {
    // user nickname 요청
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/${googleId}`)
      .then(res => {
        console.log(res.data.nickname);
        setUserNickname(res.data.nickname);
      });
  }, []);

  useEffect(async () => {
    // user image 요청 추가
  }, [userImage]);

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
      {editNickModal && <EditNickModal editUserNickname={editUserNickname} />}
    </>
  );
}

export default UserProfile;
