import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';
import MainPost from './MainPost';

const data = [];

function MainPage() {
  const [post, setPost] = useState([]);
  const [userNickname, setUserNickname] = useState('');

  const googleId = localStorage.getItem('googleId');
  useEffect(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL}/user/${googleId}`)
      .then(res => {
        console.log(res.data.nickname);
        setUserNickname(res.data.nickname);
      });
  }, []);

  // useEffect(getUserData(), []);

  const getPost = () => {
    // console.log(post);
    if (localStorage.getItem('postContent')) {
      const newPost = {
        postContent: localStorage.getItem('postContent'),
        tagArr: localStorage.getItem('tagArr').split(','),
      };
      console.log(data);
      setPost([...post, newPost]);
      data.push(newPost);
      localStorage.removeItem('postContent');
      localStorage.removeItem('tagArr');
    }
  };

  useEffect(() => getPost(), []);

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="main-calendar"></div>
        <section className="following-wrap">
          <div className="following-user">👿dhyeon</div>
          <div className="following-user">🥕mki</div>
          <div className="following-user">👻wopark</div>
        </section>
        <section className="main-posts-container">
          <div className="posts-header">
            <div className="posts-header__title">
              {userNickname}의 이유식일기
            </div>
            <div className="post-header__author">🥕{userNickname}</div>
          </div>
          <hr size="1" className="posts-header-hr" />
          <div className="posts-body">
            <MainPost />
            <div className="post-content">
              <div className="post-content__img">image 영역</div>
              <p className="post-content__date">
                2021년 10월 21일 오후 2시 32분
              </p>
              <p className="post-content__text">hi</p>
              <ul className="post-content__tags">
                <li className="tag-item">떡볶이</li>
                <li className="tag-item">순대</li>
                <li className="tag-item">분식</li>
              </ul>
            </div>
            <hr size="1" className="post-hr" />
            <div className="post-content">
              <div className="post-content__img">image 영역</div>
              <p className="post-content__date">
                2021년 10월 21일 오후 2시 32분
              </p>
              <p className="post-content__text">hi</p>
              <ul className="post-content__tags">
                <li className="tag-item">떡볶이</li>
                <li className="tag-item">순대</li>
                <li className="tag-item">분식</li>
              </ul>
            </div>
            <hr size="1" className="post-hr" />
          </div>
        </section>
      </div>
      <NaviBar />
    </>
  );
}

export default MainPage;
