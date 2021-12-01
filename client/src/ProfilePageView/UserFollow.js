import axios from 'axios';
import { useEffect, useState } from 'react';

function UserFollow() {
  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);

  useEffect(async () => {
    // 본 api 추가

    // test api
    const { data } = await axios.get(`http://localhost:8000/follows/dhyeon`);
    setFollowing(data.following);
    setFollower(data.follower);
  }, []);

  return (
    <>
      <section className="user-follow">
        <div className="user-follow__wrap">
          <span className="user-follow__title">팔로잉</span>
          <span className="user-follow__number">{following}</span>
        </div>
        <div className="user-follow__follower">
          <span className="user-follow__title">팔로워</span>
          <span className="user-follow__number">{follower}</span>
        </div>
      </section>
    </>
  );
}

export default UserFollow;
