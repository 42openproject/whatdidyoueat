import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { FiPlus } from 'react-icons/fi';

function UserTags() {
  return (
    <>
      <section className="user-info-item">
        <div className="user-info-item__upper-menu">
          <div className="user-info-item__upper-menu__left">
            <span className="user-info-item__title">태그</span>
            <span className="user-info-item__subtitle">
              최대 5개까지 설정 가능합니다
            </span>
          </div>
          <div className="user-info-item__edit-btn">
            <FiPlus />
          </div>
        </div>
        <hr size="1" className="profile-hr" />
        <div className="user-info-item__contents">
          <div className="user-info-item__tag-item">
            <span className="user-info-item__tag-item__title">다이어트</span>
            <div className="user-info-item__tag-item__xbtn">
              <IconContext.Provider value={{ color: 'red' }}>
                <IoClose />
              </IconContext.Provider>
            </div>
          </div>
          <div className="user-info-item__tag-item">
            <span className="user-info-item__tag-item__title">운동</span>
            <div className="user-info-item__tag-item__xbtn">
              <IconContext.Provider value={{ color: 'red' }}>
                <IoClose />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserTags;
