import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ImageUploader from './ImageUploader';

function PostPage({ history }) {
  // 현재 상태, Setter
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
  const handleTagChange = ({ target: { value } }) => {
    if (value.length > 10) {
      alert('글자수 초과!!');
    } else {
      setPostTag(value);
    }
  };

  const onKeyUp = useCallback(
    e => {
      if (process.browser) {
        const $TagWrapOuter = document.querySelector('.tagWrapOuter');
        const $TagWrapInner = document.createElement('div');
        $TagWrapInner.className = 'tagWrapInner';

        // console.log($TagWrapOuter);
        // console.log(tagArr);
        // $TagWrapInner.addEventListener('click', () => {
        //   $TagWrapOuter?.removeChild($TagWrapInner);
        //   console.log($TagWrapInner.innerHTML);
        //   setTagArr(
        //     tagArr.filter(tag => {
        //       console.log('tag : ', tag);
        //       return tag;
        //     }),
        //   );
        // });

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
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/${googleId}`,
      {
        textContent,
        tagArr,
      },
    );
    console.log(response.data);
    setDisabled(false);
    // localStorage.setItem('textContent', textContent);
    // localStorage.setItem('tagArr', tagArr);
    history.push('/main');
  };
  return (
    <>
      <Header />
      <ImageUploader />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="textContent"
          value={textContent}
          onChange={handleContentChange}
        ></input>
        <div className="tagWrap">
          <div className="tagWrapOuter"></div>
          <input
            type="text"
            name="postTag"
            value={postTag}
            onChange={handleTagChange}
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
