import { FiPlus } from 'react-icons/fi';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import OnToggleTagModal from './OnToggleTagModal';
import TagList from './TagList';

function UserTags({ userNickname, googleId, testFlag = false }) {
  const [tagArr, setTagArr] = useState([]);
  const [tagModal, setTagModal] = useState(false);
  const [tagFlag, setTagFlag] = useState(new Date());
  const tagMsgRef = useRef();

  const updateTags = async newTags => {
    try {
      // test api
      if (testFlag) {
        // await axios.patch(`http://localhost:8000/tags/dhyeon`, {
        //   tagArr: newTags,
        // });
      } else if (userNickname) {
        // 본 api
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/${userNickname}/tag`,
          {
            googleId,
            tag: newTags,
          },
        );
        if (data.success) setTagFlag(new Date());
        else console.log('tag api post 요청 false');
        // console.log(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(async () => {
    try {
      if (testFlag) {
        // test api
        const { data } = await axios.get(`http://localhost:8000/tags/dhyeon`);
        // console.log(data);
        if (data.tagArr.length !== 0) {
          setTagArr(data.tagArr);
        }
      } else if (userNickname) {
        // 본 api 추가
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${userNickname}/tag`,
        );
        // console.log(data);
        if (data.success) {
          setTagArr(data.data.tagArr);
        } else console.log('tag api get 요청 false');
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [userNickname, testFlag, tagFlag]);

  const onToggleTagModal = useCallback(() => {
    setTagModal(!tagModal);
  });

  const onCreateNewTag = useCallback(tagName => {
    if (tagName.length <= 0) {
      onToggleTagModal();
    } else if (tagName.length >= 10) {
      tagMsgRef.current.innerText = '10자 이하로 입력해주세요';
    } else if (tagArr.find(tag => tag === tagName)) {
      tagMsgRef.current.innerText = '중복된 태그입니다';
    } else {
      updateTags(tagName);
      onToggleTagModal();
    }
  });

  const onRemoveTag = useCallback(async tagId => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/${userNickname}/tag/${tagId}`,
      );
      // console.log(data);
      if (data.success) setTagFlag(new Date());
      else console.log('tag api delete 요청 false');
    } catch (e) {
      console.log(e.message);
    }
  });

  return (
    <>
      <section className="user-info-item">
        <div className="user-info-item__upper-menu">
          <div className="user-info-item__upper-menu__left">
            <span className="user-info-item__title">태그</span>
            <span className="user-info-item__subtitle">
              최대 5개까지 설정 가능합니다
            </span>
          </div>
          <div className="user-info-item__edit-btn btn">
            <FiPlus onClick={onToggleTagModal} />
          </div>
        </div>
        <hr size="1" className="profile-hr" />
        <div className="user-info-item__contents">
          {tagArr.length !== 0 &&
            tagArr.map(tag => {
              return (
                <TagList
                  tagName={tag.tagName}
                  key={tag.tagId}
                  tagId={tag.tagId}
                  onRemoveTag={onRemoveTag}
                />
              );
            })}
        </div>
      </section>
      {tagModal && (
        <OnToggleTagModal
          addTagModal={onToggleTagModal}
          onCreateNewTag={onCreateNewTag}
          tagMsgRef={tagMsgRef}
        />
      )}
    </>
  );
}

export default UserTags;
