import axios from 'axios';
import { useState, useEffect } from 'react';

function MainPost() {
  const [postData, setPostData] = useState({
    createAt: '',
    textContent: '',
    tagArr: [],
  });

  useEffect(async () => {
    const googleId = localStorage.getItem('googleId');
    try {
      const response = await axios
        .get(`${process.env.REACT_APP_API_URL}/post/${googleId}`)
        .then(res => {
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return <div>test</div>;
}

export default MainPost;
