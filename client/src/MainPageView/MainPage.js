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
        <div className="following">
          <div className="following-user">dhyeon</div>
          <div className="following-user">mki</div>
          <div className="following-user">wopark</div>
        </div>
        <div className="posts">
          <div className="post">
            <div className="post-content">post content</div>
            <div className="tag-wrap">
              <div className="tag"></div>
              <div className="tag"></div>
              <div className="tag"></div>
            </div>
          </div>
          <div className="post">
            <div className="post-content">post content</div>
            <div className="tag-wrap">
              <div className="tag"></div>
              <div className="tag"></div>
              <div className="tag"></div>
            </div>
          </div>
          <div className="post">
            <div className="post-content">post content</div>
            <div className="tag-wrap">
              <div className="tag"></div>
              <div className="tag"></div>
              <div className="tag"></div>
            </div>
          </div>
        </div>
      </div>
      <NaviBar />
    </>
  );
}

export default MainPage;
