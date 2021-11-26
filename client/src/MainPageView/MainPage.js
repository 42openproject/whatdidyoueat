import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';
import MainPost from './MainPost';
import PostTitle from './PostTitle';
import Calendar from './MainCalendar';

function MainPage() {
  const [post, setPost] = useState([]);
  const [userNickname, setUserNickname] = useState('');
  const [clickedDay, setClickedDay] = useState(new Date());
  const googleId = localStorage.getItem('googleId');

  useEffect(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL}/user/${googleId}`)
      .then(res => {
        console.log(res.data.nickname);
        setUserNickname(res.data.nickname);
      });
  }, []);

  useEffect(async () => {
    // test api
    // try {
    //   const data = await axios.get(
    //     `http://localhost:8000/post?userId=dhyeon&createdAt=2021-11-${clickedDay.getDate()}`,
    //   );
    //   console.log(data.data);
    //   setPost(data.data);
    // } catch (e) {
    //   console.log(e);
    // }

    // 본 요청 api
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/${googleId}`,
      );
      console.log(data);
      setPost(data);
    } catch (e) {
      console.log(e);
    }
  }, [clickedDay]);

  return (
    <>
      <Header />
      <div className="main-container">
        <section className="main-calendar-wrap">
          <Calendar clickedDay={clickedDay} setClickedDay={setClickedDay} />
        </section>
        <section className="following-wrap">
          <div className="following-user">
            <Link to="/user/dhyeon">👿dhyeon</Link>
          </div>
          <div className="following-user">
            <Link to="/user/mki">🥕mki</Link>
          </div>
          <div className="following-user">
            <Link to="/user/wopark">👻wopark</Link>
          </div>
        </section>
        <section className="main-posts-container">
          <div className="posts-header">
            <div className="posts-header__title">
              <PostTitle nick={userNickname} clickedDay={clickedDay} />
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
                .map(p => {
                  return (
                    <MainPost
                      key={p.id}
                      date={p.createdAt}
                      textContent={p.textContent}
                      tagArr={p.tagArr}
                    />
                  );
                })
            )}
          </div>
        </section>
      </div>
      <NaviBar />
    </>
  );
}

export default MainPage;
