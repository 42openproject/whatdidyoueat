import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ImageUploader from './ImageUploader';
import PostTitle from '../MainPageView/PostTitle';
import ErrorModal from './ErrorModal';
import '../stylesheets/PostPage.css';

function PostPage({ history }) {
  // 현재 상태, Setter
  const [image, setImage] = useState('');
  const [textContent, setTextContent] = useState('');
  const [postTag, setPostTag] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [tagArr, setTagArr] = useState([]);
  const [userNickname, setUserNickname] = useState('');
  const [errModalFlag, setErrModalFlag] = useState(false);

  const googleId = localStorage.getItem('googleId');

  useEffect(async () => {
    // 닉네임 받아오기
    // console.log(date);
    try {
      const { data: nickData } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/nickname?googleId=${googleId}`,
      );
      if (nickData.success) setUserNickname(nickData.data.nickname);
      else console.log('nick api 요청 false');
    } catch (e) {
      console.log(e.message);
    }
  }, []);

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
    if (value.length > 100) {
      alert('글자수 초과!!');
    } else {
      setTextContent(value);
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

  const onToggleErrorModal = () => {
    setErrModalFlag(!errModalFlag);
  };

  const handleSubmit = async e => {
    if (userNickname) {
      try {
        if (!image) {
          // console.log('click');
          onToggleErrorModal();
          return;
        }
        setDisabled(true);
        e.preventDefault();
        await new Promise(r => setTimeout(r, 1000));
        const formData = new FormData();
        formData.append('file', image);
        // setTextContent();
        formData.append('textContent', textContent);
        formData.append('tagArr', tagArr);
        formData.append('googleId', googleId);
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/posts/${userNickname}`,
          formData,
        );
        if (res.data.success) {
          console.log(res);
          setDisabled(false);
          history.push('/main');
        } else console.log('post submit false');
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="post-page-container">
          <section className="post-page-header">
            <PostTitle nick={userNickname} googleId={googleId} />
          </section>
          <section className="post-page__form-wrap">
            <ImageUploader image={image} setImage={setImage} />
            <span className="post-page__text-title">내용</span>
            <textarea
              name="textContent"
              value={textContent}
              cols="40"
              rows="5"
              onChange={handleContentChange}
              className="post-page__text-input"
            ></textarea>
            <div className="tagWrap">
              <span className="post-page__tag-title">태그</span>
              <div className="tagWrapOuter"></div>
              <input
                className="tagInput"
                type="text"
                name="postTag"
                value={postTag}
                onChange={onChangeTag}
                onKeyUp={onKeyUp}
                className="post-page__tag-input"
              />
            </div>
          </section>
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="post-page--submit-btn"
          onClick={handleSubmit}
        >
          UPLOAD
        </button>
      </form>
      {errModalFlag && <ErrorModal onToggleErrorModal={onToggleErrorModal} />}
    </>
  );
}

export default PostPage;
