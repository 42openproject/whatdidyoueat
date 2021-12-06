import { FiPlus } from 'react-icons/fi';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import OnToggleTagModal from './OnToggleTagModal';
import TagList from './TagList';

function UserTags() {
  const [tagArr, setTagArr] = useState([]);
  const [tagModal, setTagModal] = useState(false);
  const tagMsgRef = useRef();

  useEffect(async () => {
    // 본 api 추가

    // test api
    const { data } = await axios.get(`http://localhost:8000/tags/dhyeon`);
    console.log(data);
    if (data.tagArr.length !== 0) {
      setTagArr(data.tagArr);
    }
  }, []);

  const updateTags = newTags => {
    // 본 api 추가 필요

    // test api
    axios.patch(`http://localhost:8000/tags/dhyeon`, { tagArr: newTags });
  };

  const onToggleTagModal = useCallback(() => {
    console.log('add tag click!!');
    setTagModal(!tagModal);
  });

  const onCreateNewTag = useCallback(tagName => {
    console.log('create');
    console.log(tagName);
    if (tagName.length <= 0) {
      onToggleTagModal();
    } else if (tagName.length >= 10) {
      tagMsgRef.current.innerText = '10자 이하로 입력해주세요';
    } else if (tagArr.find(tag => tag === tagName)) {
      tagMsgRef.current.innerText = '중복된 태그입니다';
    } else {
      console.log('ttt');
      setTagArr([...tagArr, tagName]);
      updateTags([...tagArr, tagName]);
      onToggleTagModal();
    }
  });

  const onRemoveTag = useCallback(tagName => {
    console.log('remove');
    setTagArr(tagArr.filter(tag => tagName !== tag));
    updateTags(tagArr.filter(tag => tagName !== tag));
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
            tagArr.map((tag, idx) => {
              return (
                <TagList tagName={tag} key={idx} onRemoveTag={onRemoveTag} />
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
