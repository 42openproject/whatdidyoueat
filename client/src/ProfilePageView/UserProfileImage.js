import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';

function UserProfileImage() {
  const [userNickname, setUserNickname] = useState('');
  const [userImage, setUserImage] = useState(
    'https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png',
  );

  const setFile = e => {
    console.log('setFile click');
    try {
      if (e.target.files[0]) {
        const img = new FormData();
        img.append('file', e.target.files[0]);
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/users/${userNickname}/profileImg`,
            img,
          )
          .then(res => {
            console.log(res);

            setUserImage(res.data.data.imgUrl);
          });
      }
    } catch (er) {
      console.log('setFile File error : ', er.messge);
    }
  };

  useEffect(async () => {
    // user nickname 요청
    const googleId = localStorage.getItem('googleId');

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/nickname?googleId=${googleId}`,
      );
      if (data && data.success) setUserNickname(data.data.nickname);
      else console.log('nickname api get 요청 false');

      // user image 요청
      // 본 api
      const { data: imgData } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${data.data.nickname}/profileImg`,
      );
      // console.log(imgData);
      if (imgData.success) setUserImage(imgData.data.imgUrl);
      else console.log('profile img get false');

      // test api
      // const { data } = await axios.get(`http://localhost:8000/profileImg/dhyeon`);
      // console.log(data);
      // setUserImage(data.imgUrl);
    } catch (err) {
      console.log('user profile img get fail : ', err.message);
    }
  }, [userImage]);

  return (
    <>
      <div className="user-profile__img">
        <img src={userImage} className="user-profile__img__img" />
      </div>
      <div className="user-profile__img--overlay">
        <label
          htmlFor="profile-img-upload"
          className="user-profile__img__upload btn"
        >
          <MdAddPhotoAlternate />
        </label>
        <input
          id="profile-img-upload"
          name="img"
          type="file"
          accept="image/*"
          onChange={setFile}
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}

export default UserProfileImage;
