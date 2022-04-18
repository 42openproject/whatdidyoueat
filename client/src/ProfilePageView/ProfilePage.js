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
  // const [testFlag, setTestFlag] = useState(
  //   localStorage.getItem('testFlag') === null
  //     ? false
  //     : JSON.parse(localStorage.getItem('testFlag')),
  // );

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
        <UserProfile
          userNickname={userNickname}
          googleId={googleId}
          setUserNickname={setUserNickname}
        />
        <UserFollow />
        <UserTags
          userNickname={userNickname}
          googleId={googleId}
          // testFlag={testFlag}
        />
        <UserAcheivement />
      </div>
      <NaviBar />
      {/* flag 설정! */}
      {/* <button
        style={{
          position: 'absolute',
          width: '150px',
          height: '50px',
          top: '10px',
          left: '100px',
          backgroundColor: 'yellow',
          border: '1px solid black',
          borderRadius: '10px',
        }}
        onClick={() => {
          localStorage.setItem('testFlag', !testFlag);
          setTestFlag(!testFlag);
        }}
      >
        {testFlag === false ? 'test api 사용하기' : '본 api 사용하기'}
      </button> */}
    </>
  );
}

export default ProfilePage;
