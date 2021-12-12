import axios from 'axios';
import { useState, useEffect } from 'react';

function UserPostTitle({ nick, clickedDay, date, testFlag }) {
  const [defaultTitle, setDefaultTitle] = useState('');

  useEffect(async () => {
    try {
      // title 받아오기
      if (testFlag === true) {
        // test api
        const { data } = await axios.get(
          `http://localhost:8000/title?id=${nick}&date=${clickedDay.getDate()}`,
        );
        setDefaultTitle(data[0].title);
        console.log(data[0]);
      } else if (nick) {
        // 본 api
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/titles/${nick}?date=${date}`,
        );
        // console.log(data);
        if (data.success) {
          setDefaultTitle(data.data.title);
        } else console.log('title api 요청 false');
      }
    } catch (e) {
      console.log(e.message);
      setDefaultTitle(`${nick}의 이유식일기`);
    }
  }, [nick, clickedDay, defaultTitle]);

  return (
    <>
      <span className="title-content">{defaultTitle}</span>
    </>
  );
}

export default UserPostTitle;
