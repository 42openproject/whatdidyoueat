import { useState, useEffect } from 'react';
import { FiEdit2, FiCornerDownLeft } from 'react-icons/fi';

function PostTitle({ nick }) {
  const [defaultTitle, setDefaultTitle] = useState('');
  const [title, setTitle] = useState(defaultTitle);
  const [editFlag, setEditFlag] = useState(false);

  useEffect(() => {
    setDefaultTitle(`${nick}의 이유식일기`);
  }, [nick]);

  const editTitle = () => {
    if (editFlag === true) {
      if (title.length < 3 || title.length > 16) {
        alert('3자 이상 15자 이하로 입력해주세요');
        return;
      }
      setDefaultTitle(title);
      // 여기서 DB로 보내야 함
    }
    setEditFlag(!editFlag);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  return (
    <>
      {console.log(nick)}
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
