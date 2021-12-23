import { useEffect, useState } from 'react';
import axios from 'axios';
import TodayPostList from './TodayPostList';

function SearchPost() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      // 본 api
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/explore`,
      );
      console.log(data);
      setPosts(data.data.posts);
      // test api
      // const { data: testData } = await axios.get(`http://localhost:8000/allposts`);
      // setPosts(testData);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <>
      <section className="all-post-box">
        <div className="post-box__title">오늘 올라온 식단들</div>
        {posts.length === 0 ? (
          <div>오늘의 포스트가 없습니다</div>
        ) : (
          posts.map((p, i) => {
            return (
              <TodayPostList
                key={i}
                nick={p.nickname}
                title={p.userPostTitle}
                imgUrl={p.imageUrl}
                createdAt={p.createdAt}
                textContent={p.textContent}
                tagArr={p.tagArr}
              />
            );
          })
        )}
      </section>
    </>
  );
}

export default SearchPost;
