import { MdModeEdit } from 'react-icons/md';

function UserAcheivement() {
  return (
    <>
      <section className="user-info-item">
        <div className="user-info-item__upper-menu">
          <div className="user-info-item__upper-menu__left">
            <span className="user-info-item__title">대표 업적</span>
            <span className="user-info-item__subtitle">
              프로필에 보여줄 업적 4개를 선택하세요
            </span>
          </div>
          <div className="user-info-item__edit-btn">
            <MdModeEdit />
          </div>
        </div>
        <hr size="1" className="profile-hr" />
        <div className="user-info-item__contents">
          <div className="user-info-item__acheivement-item">
            <div className="user-info-item__acheivement-item__img">이미지</div>
            <span className="user-info-item__acheivement-item__title">
              연속 5일째
            </span>
          </div>
          <div className="user-info-item__acheivement-item">
            <div className="user-info-item__acheivement-item__img">이미지</div>
            <span className="user-info-item__acheivement-item__title">
              연속 5일째
            </span>
          </div>
          <div className="user-info-item__acheivement-item">
            <div className="user-info-item__acheivement-item__img">이미지</div>
            <span className="user-info-item__acheivement-item__title">
              연속 5일째
            </span>
          </div>
          <div className="user-info-item__acheivement-item">
            <div className="user-info-item__acheivement-item__img">이미지</div>
            <span className="user-info-item__acheivement-item__title">
              연속 5일째
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserAcheivement;
