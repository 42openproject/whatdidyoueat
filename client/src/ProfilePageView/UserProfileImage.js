import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';

function UserProfileImage() {
  const [userImage, setUserImage] = useState(
    'https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png',
  );

  const setFile = e => {
    console.log('setFile click');
    if (e.target.files[0]) {
      const img = new FormData();
      img.append('file', e.target.files[0]);
      axios
        .post(`http://localhost:3001/users/mki/profileImg`, img)
        .then(res => {
          console.log(res);

          setUserImage(res.data);
        });
    }
  };

  // useEffect(async () => {
  //   // user image 요청 추가

  //   // test api
  //   // const { data } = await axios.get(`http://localhost:8000/profileImg/dhyeon`);
  //   // console.log(data);
  //   // setUserImage(data.imgUrl);
  // }, [userImage]);

  return (
    <>
      <div className="user-profile__img">
        <img src={userImage} className="user-profile__img__img" />
      </div>
      <div className="user-profile__img--overlay">
        <label
          for="profile-img-upload"
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
