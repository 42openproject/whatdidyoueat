import axios from 'axios';
import { useState, useEffect } from 'react';
import { FiEdit2, FiCornerDownLeft } from 'react-icons/fi';

function PostTitle({ nick, clickedDay = '', testFlag = 'false', googleId }) {
  const [defaultTitle, setDefaultTitle] = useState('');
  const [title, setTitle] = useState(defaultTitle);
  const [editFlag, setEditFlag] = useState(false);
  // const [editBtn, setEditBtn] = useState(false); // 나중에 본인페이지, 오늘날짜에만 버튼 나오도록 설정

  const getDate = () => {
    let tmp;
    if (!clickedDay) tmp = new Date();
    else tmp = clickedDay;
    return `${tmp.getFullYear()}-${
      tmp.getMonth() + 1 < 10 ? `0${tmp.getMonth() + 1}` : tmp.getMonth() + 1
    }-${tmp.getDate() < 10 ? `0${tmp.getDate()}` : tmp.getDate()}`;
  };
  const date = getDate();

  useEffect(async () => {
    try {
      // title 받아오기
      if (testFlag === true) {
        // test api
        const { data } = await axios.get(`http://localhost:8000/title/dhyeon`);
        console.log(data.title);
        setDefaultTitle(data.title);
        setTitle(data.title);
      } else if (nick) {
        // 본 api
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/titles/${nick}?date=${date}`,
        );
        // console.log(data);
        if (data.success) {
          setDefaultTitle(data.data.title);
          setTitle(data.data.title);
        } else console.log('title api 요청 false');
      }
    } catch (e) {
      console.log(e.message);
      setDefaultTitle(`${nick}의 이유식일기`);
      setTitle(defaultTitle);
    }
  }, [nick, clickedDay, editFlag, defaultTitle]);

  const editTitle = async () => {
    if (title.length < 3 || title.length > 16) {
      alert('3자 이상 15자 이하로 입력해주세요');
      return;
    }
    if (editFlag === true) {
      if (testFlag === true) {
        setDefaultTitle(title);
        axios.patch(`http://localhost:8000/title/dhyeon`, { title });
      } else {
        setDefaultTitle(title);
        try {
          const { data: titleData } = await axios.post(
            `${process.env.REACT_APP_API_URL}/titles/${nick}`,
            {
              googleId,
              title,
            },
          );
          console.log(titleData);
          if (!titleData.success) console.log('post title api post요청 false');
        } catch (e) {
          console.log(e.message);
        }
      }
    }
    setEditFlag(!editFlag);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  return (
    <>
      {editFlag === false ? (
        <>
          <span className="title-content">{defaultTitle}</span>
          <FiEdit2 className="title-edit-btn" onClick={editTitle} />
        </>
      ) : (
        <>
          <input
            autoFocus
            className="title-content-input"
            type="text"
            value={title}
            onChange={onChangeTitle}
          ></input>
          <FiCornerDownLeft className="title-edit-btn" onClick={editTitle} />
        </>
      )}
    </>
  );
}

export default PostTitle;
