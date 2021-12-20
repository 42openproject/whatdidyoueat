import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import EditNickModal from './EditNickModal';
import UserProfileImage from './UserProfileImage';

function UserProfile({ userNickname, googleId, setUserNickname }) {
  const [editNickModal, setEditNickModal] = useState(false);

  const editUserNickname = () => {
    // console.log(`edit btn click!!!`);
    setEditNickModal(!editNickModal);
    // console.log(editNickModal);
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
      {editNickModal && (
        <EditNickModal
          editUserNickname={editUserNickname}
          googleId={googleId}
          setUserNickname={setUserNickname}
        />
      )}
    </>
  );
}

export default UserProfile;
