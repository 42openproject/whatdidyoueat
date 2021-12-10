import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';
import MainPost from './MainPost';
import UserPostTitle from './UserPostTitle';
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
          <Calendar
            clickedDay={clickedDay}
            setClickedDay={setClickedDay}
            userNickname={nickname}
          />
        </div>
        <section className="main-posts-container">
          <div className="posts-header">
            <div className="posts-header__title">
              <UserPostTitle
                nick={nickname}
                clickedDay={clickedDay}
                date={date}
              />
            </div>
            <div className="post-header__author">🥕{nickname}</div>
          </div>
          <hr size="1" className="posts-header-hr" />
          <MainPost clickedDay={clickedDay} userNickname={nickname} />
        </section>
      </div>
      <NaviBar />
    </>
  );
}

export default UserPage;
