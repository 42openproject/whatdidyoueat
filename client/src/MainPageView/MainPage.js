import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';
import MainPost from './MainPost';
import PostTitle from './PostTitle';
import Calendar from './MainCalendar';
import MainFollow from './MainFollow';

function MainPage() {
  const [post, setPost] = useState([]);
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
    console.log(date);
    const { data: nickData } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/nickname?googleId=${googleId}`,
    );
    if (nickData.success) setUserNickname(nickData.data.nickname);
    else console.log('nick api 요청 false');
    // post 받아오기
    // test api
    if (testFlag === true) {
      try {
        const data = await axios.get(
          `http://localhost:8000/post?userId=dhyeon&createdAt=2021-11-${clickedDay.getDate()}`,
        );
        if (data.success) {
          console.log(data.data);
          setPost(data.data);
        } else {
          console.log('post api 요청 false');
        }
      } catch (e) {
        console.log('post get error', e);
      }
    } else {
      // 본 요청 api
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/${nickData.data.nickname}?date=${date}`,
        );
        // console.log(data);
        if (data && data.success) setPost(data.data);
        else console.log('post api get 요청 false');
      } catch (e) {
        console.log(e);
      }
    }
  }, [clickedDay, testFlag]);

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
          <div className="posts-body">
            {/* {clickedDay} */}
            {post.length === 0 ? (
              <div className="empty-post">
                <span>오늘의 식단을</span>
                <span>기록해주세요</span>
              </div>
            ) : (
              post
                .slice(0)
                .reverse()
                .map((p, idx) => (
                  <MainPost
                    key={idx}
                    date={p.createdAt}
                    textContent={p.textContent}
                    tagArr={p.tagArr}
                  />
                ))
            )}
          </div>
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
