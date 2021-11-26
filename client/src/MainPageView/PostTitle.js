import axios from 'axios';
import { useState, useEffect } from 'react';
import { FiEdit2, FiCornerDownLeft } from 'react-icons/fi';

function PostTitle({ nick, clickedDay }) {
  const [defaultTitle, setDefaultTitle] = useState('');
  const [title, setTitle] = useState(defaultTitle);
  const [editFlag, setEditFlag] = useState(false);
  const today = new Date();

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/title?id=${nick}&date=${today.getDate()}`,
      );
      setDefaultTitle(data[0].title);
      console.log(data[0]);
    } catch (e) {
      console.log(e.message);
      setDefaultTitle(`${nick}의 이유식일기`);
    }
    // 맨 처음엔 data를 못받아오고, 다시 리로드되어서 받아오는데 본 요청때는 체크해봐야할듯 함
  }, [nick, clickedDay]);

  const editTitle = () => {
    if (editFlag === true) {
      if (title.length < 3 || title.length > 16) {
        alert('3자 이상 15자 이하로 입력해주세요');
        return;
      }
      setDefaultTitle(title);
      axios.patch(`http://localhost:8000/title/dhyeon`, { title });
      // 여기서 DB로 보내야 함
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
