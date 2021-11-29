import { MdModeEdit } from 'react-icons/md';

function UserProfile() {
  return (
    <>
      <section className="user-profile">
        <div className="user-profile__img">이미지</div>
        <div className="user-profile__nickname">
          <span className="user-profile__nickname--text">닉네임</span>
          <div className="user-profile__nickname--edit-btn">
            <MdModeEdit />
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfile;
