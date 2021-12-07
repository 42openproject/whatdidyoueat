import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';
import PostList from './PostList';
import PostTitle from './PostTitle';
import Calendar from './MainCalendar';

function UserPage() {
  const [post, setPost] = useState([]);
  const { nickname } = useParams();
  const [clickedDay, setClickedDay] = useState(new Date());
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
    try {
      // post 가져오기
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${nickname}?date=${date}`,
      );
      setPost(data.data);
    } catch (e) {
      console.log(e.message);
    }
  }, [nickname, clickedDay]);

  // const goUserPage = user => {
  //   window.location.href = `/user/${user}`;
  // };

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="main-calendar-wrap">
          <Calendar clickedDay={clickedDay} setClickedDay={setClickedDay} />
        </div>
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
              <PostTitle nick={nickname} clickedDay={clickedDay} />
            </div>
            <div className="post-header__author">🥕{nickname}</div>
          </div>
          <hr size="1" className="posts-header-hr" />
          <div className="posts-body">
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
                    <PostList
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

export default UserPage;
