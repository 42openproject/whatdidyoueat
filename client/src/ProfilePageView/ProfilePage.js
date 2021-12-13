import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import UserProfile from './UserProfile';
import UserFollow from './UserFollow';
import UserTags from './UserTags';
import UserAcheivement from './UserAcheivement';
import '../stylesheets/ProfilePage.css';

function ProfilePage() {
  const [userNickname, setUserNickname] = useState('');
  const googleId = localStorage.getItem('googleId');

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

  return (
    <>
      <Header />
      <div className="profile-container">
        <UserProfile userNickname={userNickname} />
        <UserFollow />
        <UserTags />
        <UserAcheivement />
      </div>
      <NaviBar />
    </>
  );
}

export default ProfilePage;
