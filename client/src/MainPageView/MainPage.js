import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import '../stylesheets/MainPage.css';

const data = [];

function MainPage() {
  const [post, setPost] = useState([]);

  const getPost = () => {
    console.log(post);
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
      <div className="container">
        <div className="calendar"></div>
        <div className="following-wrap">
          <div className="following-user">👿dhyeon</div>
          <div className="following-user">🥕mki</div>
          <div className="following-user">👻wopark</div>
        </div>
        <div className="posts">
          <div className="post-header">
            <div className="post-title">mki의 이유식일기</div>
            <div className="post-author">🥕mki</div>
          </div>
          <hr size="1" className="header-hr" />
          <div className="post-wrap">
            <div className="post-content">
              <div className="post-img">image 영역</div>
              <p className="post-date">2021년 10월 21일 오후 2시 32분</p>
              <p className="post-text">hi</p>
              <ul className="tag-wrap">
                <li className="tag">떡볶이</li>
                <li className="tag">순대</li>
                <li className="tag">분식</li>
              </ul>
            </div>
            <hr size="1" className="post-hr" />
            <div className="post-content">
              <div className="post-img">image 영역</div>
              <p className="post-date">2021년 10월 21일 오후 2시 32분</p>
              <p className="post-text">hi</p>
              <ul className="tag-wrap">
                <li className="tag">떡볶이</li>
                <li className="tag">순대</li>
                <li className="tag">분식</li>
              </ul>
            </div>
            <hr size="1" className="post-hr" />
          </div>
        </div>
      </div>
      <NaviBar />
    </>
  );
}

export default MainPage;
