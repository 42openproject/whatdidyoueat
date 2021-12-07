import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import UserProfile from './UserProfile';
import UserFollow from './UserFollow';
import UserTags from './UserTags';
import UserAcheivement from './UserAcheivement';
import '../stylesheets/ProfilePage.css';

function ProfilePage() {
  const googleId = localStorage.getItem('googleId');
  return (
    <>
      <Header />
      <div className="profile-container">
        <UserProfile googleId={googleId} />
        <UserFollow />
        <UserTags />
        <UserAcheivement />
      </div>
      <NaviBar />
    </>
  );
}

export default ProfilePage;
