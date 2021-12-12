import { useState, useCallback } from 'react';
import axios from 'axios';
import { FiCornerDownLeft, FiEdit2 } from 'react-icons/fi';
import Header from '../components/Header';
import ImageUploader from './ImageUploader';

const PostUploadTitle = () => {
  const [defaultTitle, setDefaultTitle] = useState('');
  const [title, setTitle] = useState(defaultTitle);
  const [editFlag, setEditFlag] = useState(false);

  const editTitle = () => {
    if (editFlag === true) {
      if (title.length < 3 || title.length > 16) {
        alert('3자 이상 15자 이하로 입력해주세요');
        return;
      }
      setDefaultTitle(title);
      // axios.patch()
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
          <span className="title">{title}</span>
          <FiEdit2 className="title-edit-btn" onClick={editTitle} />
        </>
      ) : (
        <>
          <input
            autoFocus
            className="title-input"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
          <FiCornerDownLeft className="title-edit-btn" onClick={editTitle} />
        </>
      )}
    </>
  );
};

function PostPage({ history }) {
  // 현재 상태, Setter
  const [image, setImage] = useState('');
  const [textContent, setPostContent] = useState('');
  const [postTag, setPostTag] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [tagArr, setTagArr] = useState([]);

  const googleId = localStorage.getItem('googleId');

  document.addEventListener(
    'keydown',
    event => {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    },
    true,
  );

  const handleContentChange = ({ target: { value } }) => {
    if (value.length > 50) {
      alert('글자수 초과!!');
    } else {
      setPostContent(value);
    }
  };
  const onChangeTag = ({ target: { value } }) => {
    if (value.length > 10) {
      alert('글자수 초과!!');
    } else {
      setPostTag(value);
    }
  };

  const onKeyUp = useCallback(
    e => {
      if (process.browser) {
        // 요소 불러오기, 만들기
        const $TagWrapOuter = document.querySelector('.tagWrapOuter');
        const $TagWrapInner = document.createElement('div');
        $TagWrapInner.className = 'tagWrapInner';

        // 태그 클릭 이벤트
        $TagWrapInner.addEventListener('click', () => {
          $TagWrapOuter?.removeChild($TagWrapInner);
          setTagArr(tagArr.filter(tag => tag));
        });

        // enter 입력 시
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
          console.log('Enter key!!!', e.target.value);
          $TagWrapInner.innerHTML = `#${e.target.value}`;
          $TagWrapOuter?.appendChild($TagWrapInner);
          setTagArr([...tagArr, postTag]);
          setPostTag('');
        }
      }
    },
    [postTag, tagArr],
  );

  const handleSubmit = async e => {
    setDisabled(true);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    const formData = new FormData();
    formData.append('file', image);
    formData.append('textContent', textContent);
    formData.append('tagArr', tagArr);
    formData.append('googleId', googleId);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/posts/mki`,
      formData,
    );
    console.log(res);
    setDisabled(false);
    history.push('/main');
  };
  return (
    <>
      <Header />
      <PostUploadTitle />
      <form onSubmit={handleSubmit}>
        <ImageUploader image={image} setImage={setImage} />
        <input
          type="text"
          name="textContent"
          value={textContent}
          onChange={handleContentChange}
        ></input>
        <div className="tagWrap">
          <div className="tagWrapOuter"></div>
          <input
            className="tagInput"
            type="text"
            name="postTag"
            value={postTag}
            onChange={onChangeTag}
            onKeyUp={onKeyUp}
          />
        </div>
        <button type="submit" disabled={disabled}>
          UPLOAD
        </button>
      </form>
    </>
  );
}

export default PostPage;
