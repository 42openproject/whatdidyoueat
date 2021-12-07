import { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import EditNickModal from './EditNickModal';

function UserProfile({ googleId }) {
  const [userImage, setUserImage] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [editNickModal, setEditNickModal] = useState(false);

  const defaultUserImage =
    'https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png';

  useEffect(async () => {
    // user nickname 요청
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/nickname?googleId=${googleId}`,
      );
      if (data && data.success) setUserNickname(data.data.nickname);
      else console.log('nickname api get 요청 false');
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(async () => {
    // user image 요청 추가

    // test api
    const { data } = await axios.get(`http://localhost:8000/profileImg/dhyeon`);
    // console.log(data);
    setUserImage(data.imgUrl);
  }, [userImage]);

  const editUserNickname = () => {
    console.log(`edit btn click!!!`);
    setEditNickModal(!editNickModal);
    console.log(editNickModal);
  };

  return (
    <>
      <section className="user-profile">
        <div className="user-profile__img btn">
          <img
            src={userImage === '' ? defaultUserImage : userImage}
            className="user-profile__img__img"
          />
        </div>
        <div className="user-profile__nickname">
          <span className="user-profile__nickname--text">{userNickname}</span>
          <div className="user-profile__nickname--edit-btn btn">
            <MdModeEdit onClick={editUserNickname} />
          </div>
        </div>
      </section>
      {editNickModal && <EditNickModal editUserNickname={editUserNickname} />}
    </>
  );
}

export default UserProfile;
