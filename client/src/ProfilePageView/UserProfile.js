import { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import EditNickModal from './EditNickModal';
import UserProfileImage from './UserProfileImage';

function UserProfile({ googleId }) {
  const [userNickname, setUserNickname] = useState('');
  const [editNickModal, setEditNickModal] = useState(false);

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

  const editUserNickname = () => {
    console.log(`edit btn click!!!`);
    setEditNickModal(!editNickModal);
    console.log(editNickModal);
  };

  return (
    <>
      <section className="user-profile">
        <UserProfileImage />
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
