import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import UserProfile from './UserProfile';
import UserFollow from './UserFollow';
import UserTags from './UserTags';
import UserAcheivement from './UserAcheivement';
import '../stylesheets/ProfilePage.css';

function ProfilePage() {
  return (
    <>
      <Header />
      <div className="profile-container">
        <UserProfile />
        <UserFollow />
        <UserTags />
        <UserAcheivement />
      </div>
      <NaviBar />
    </>
  );
}

export default ProfilePage;
