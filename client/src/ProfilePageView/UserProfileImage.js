import axios from 'axios';
import { useEffect, useState } from 'react';

function UserProfileImage() {
  const [userImage, setUserImage] = useState('');
  const defaultUserImage =
    'https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png';

  useEffect(async () => {
    // user image 요청 추가

    // test api
    const { data } = await axios.get(`http://localhost:8000/profileImg/dhyeon`);
    // console.log(data);
    setUserImage(data.imgUrl);
  }, [userImage]);

  return (
    <>
      <div className="user-profile__img btn">
        <img
          src={userImage === '' ? defaultUserImage : userImage}
          className="user-profile__img__img"
        />
      </div>
    </>
  );
}

export default UserProfileImage;
