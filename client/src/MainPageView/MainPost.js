import axios from 'axios';
import { useEffect, useState } from 'react';
import PostList from './PostList';

function MainPost({ clickedDay, googleId, testFlag, setUserNickname }) {
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
    // 닉네임 받아오기
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
        // console.log(data.data);
        setPost(data.data);
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
        console.log(e.message);
      }
    }
  }, [clickedDay, testFlag]);

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
