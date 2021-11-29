import { FiPlus } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/ProfilePage.css';

function ProfilePage() {
  return (
    <>
      <Header />
      <div className="profile-container">
        <section className="user-profile">
          <div className="user-profile__img">이미지</div>
          <div className="user-profile__nickname">
            <span className="user-profile__nickname--text">닉네임</span>
            <div className="user-profile__nickname--edit-btn">
              <MdModeEdit />
            </div>
          </div>
        </section>
        <section className="user-follow">
          <div className="user-follow__wrap">
            <span className="user-follow__title">팔로잉</span>
            <span className="user-follow__number">1</span>
          </div>
          <div className="user-follow__follower">
            <span className="user-follow__title">팔로워</span>
            <span className="user-follow__number">99</span>
          </div>
        </section>
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
              <div className="user-info-item__acheivement-item__img">
                이미지
              </div>
              <span className="user-info-item__acheivement-item__title">
                연속 5일째
              </span>
            </div>
            <div className="user-info-item__acheivement-item">
              <div className="user-info-item__acheivement-item__img">
                이미지
              </div>
              <span className="user-info-item__acheivement-item__title">
                연속 5일째
              </span>
            </div>
            <div className="user-info-item__acheivement-item">
              <div className="user-info-item__acheivement-item__img">
                이미지
              </div>
              <span className="user-info-item__acheivement-item__title">
                연속 5일째
              </span>
            </div>
            <div className="user-info-item__acheivement-item">
              <div className="user-info-item__acheivement-item__img">
                이미지
              </div>
              <span className="user-info-item__acheivement-item__title">
                연속 5일째
              </span>
            </div>
          </div>
        </section>
      </div>
      <NaviBar />
    </>
  );
}

export default ProfilePage;
