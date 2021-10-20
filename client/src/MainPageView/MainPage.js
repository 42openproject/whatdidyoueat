import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NaviBar from '../components/NaviBar';

const data = [];

function MainPage() {
  const [post, setPost] = useState([]);

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
      <div>MainPage</div>
      {data.map(p => (
        <>
          <h2>글내용 : {p.postContent}</h2>
          태그 : {p.tagArr.map(t => `${t}, `)}
        </>
      ))}
      <NaviBar />
    </>
  );
}

export default MainPage;
