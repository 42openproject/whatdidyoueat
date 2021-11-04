import { useState } from 'react';
import { FiEdit2, FiCornerDownLeft } from 'react-icons/fi';

function PostTitle({ nick }) {
  const [defaultTitle, setDefaultTitle] = useState(`${nick}의 이유식일기`);
  const [title, setTitle] = useState(defaultTitle);
  const [editFlag, setEditFlag] = useState(false);

  const editTitle = () => {
    if (editFlag === true) {
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
      {editFlag === false ? (
        <>
          <span className="title-content">{defaultTitle}</span>
          <FiEdit2 className="title-edit-btn" onClick={editTitle} />
        </>
      ) : (
        <>
          <input
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
