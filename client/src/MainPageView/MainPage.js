import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';
import PostList from './PostList';
import PostTitle from './PostTitle';
import Calendar from './MainCalendar';
import MainFollow from './MainFollow';
import MainPost from './MainPost';

function MainPage() {
  const [userNickname, setUserNickname] = useState('');
  const [clickedDay, setClickedDay] = useState(new Date());
  const googleId = localStorage.getItem('googleId');
  const [testFlag, setTestFlag] = useState(
    localStorage.getItem('testFlag') === null
      ? false
      : JSON.parse(localStorage.getItem('testFlag')),
  );
  const date = `${clickedDay.getFullYear()}-${
    clickedDay.getMonth() + 1 < 10
      ? `0${clickedDay.getMonth() + 1}`
      : clickedDay.getMonth() + 1
  }-${
    clickedDay.getDate() < 10
      ? `0${clickedDay.getDate()}`
      : clickedDay.getDate()
  }`;

  useEffect(async () => {
    // 닉네임 받아오기
    // console.log(date);
    try {
      const { data: nickData } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/nickname?googleId=${googleId}`,
      );
      if (nickData.success) setUserNickname(nickData.data.nickname);
      else console.log('nick api 요청 false');
    } catch (e) {
      console.log(e.message);
    }
  }, [clickedDay]);

  return (
    <>
      <Header />
      <div className="main-container">
        <section className="main-calendar-wrap">
          <Calendar clickedDay={clickedDay} setClickedDay={setClickedDay} />
        </section>
        <MainFollow />
        <section className="main-posts-container">
          <div className="posts-header">
            <div className="posts-header__title">
              <PostTitle
                nick={userNickname}
                setNick={setUserNickname}
                googleId={googleId}
                clickedDay={clickedDay}
                date={date}
                testFlag={testFlag}
              />
            </div>
            <div className="post-header__author">🥕{userNickname}</div>
          </div>
          <hr size="1" className="posts-header-hr" />
          <MainPost
            clickedDay={clickedDay}
            testFlag={testFlag}
            setUserNickname={setUserNickname}
            googleId={googleId}
          />
        </section>
      </div>
      <NaviBar />

      {/* flag 설정! */}
      <button
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
      </button>
    </>
  );
}

export default MainPage;
