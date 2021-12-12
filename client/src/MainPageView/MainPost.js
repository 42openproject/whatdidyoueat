import axios from 'axios';
import { useEffect, useState } from 'react';
import PostList from './PostList';

function MainPost({ clickedDay, userNickname, testFlag }) {
  const [post, setPost] = useState([]);
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
      // post 받아오기
      // test api
      if (testFlag === true) {
        try {
          const data = await axios.get(
            `http://localhost:8000/post?userId=dhyeon&createdAt=2021-11-${clickedDay.getDate()}`,
          );
          // console.log(data.data);
          setPost(data.data);
        } catch (e) {
          console.log('post get error', e);
        }
      } else if (userNickname) {
        // 본 요청 api
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/posts/${userNickname}?date=${date}`,
          );
          // console.log(data);
          if (data && data.success) setPost(data.data);
          else console.log('post api get 요청 false');
        } catch (e) {
          console.log(e.message);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [clickedDay, testFlag, userNickname]);

  return (
    <>
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
              <PostList
                key={idx}
                date={p.createdAt}
                textContent={p.textContent}
                tagArr={p.tagArr}
              />
            ))
        )}
      </div>
    </>
  );
}

export default MainPost;
