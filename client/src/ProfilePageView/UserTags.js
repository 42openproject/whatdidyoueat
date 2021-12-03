import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTagModal from './AddTagModal';
import TagList from './TagList';

function UserTags() {
  const [tagArr, setTagArr] = useState([]);
  const [tagModal, setTagModal] = useState(false);

  useEffect(async () => {
    // 본 api 추가

    // test api
    const { data } = await axios.get(`http://localhost:8000/tags/dhyeon`);
    console.log(data);
    if (data.tagArr.length !== 0) {
      setTagArr(data.tagArr);
    }
  }, []);

  const addTag = () => {
    console.log('add tag click!!');
    setTagModal(!tagModal);
  };

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
          <div className="user-info-item__edit-btn">
            <FiPlus onClick={addTag} />
          </div>
        </div>
        <hr size="1" className="profile-hr" />
        <div className="user-info-item__contents">
          {tagArr.length !== 0 &&
            tagArr.map((tag, idx) => {
              return <TagList tagName={tag} key={idx} />;
            })}
          {/* <div className="user-info-item__tag-item">
            <span className="user-info-item__tag-item__title">다이어트</span>
            <div className="user-info-item__tag-item__xbtn">
              <IconContext.Provider value={{ color: 'red' }}>
                <IoClose />
              </IconContext.Provider>
            </div>
          </div> */}
        </div>
      </section>
      {tagModal && <AddTagModal addTag={addTag} />}
    </>
  );
}

export default UserTags;
