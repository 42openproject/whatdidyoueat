import React from 'react';
import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';

function TagList({ tagName, tagId, onRemoveTag }) {
  return (
    <>
      <div className="user-info-item__tag-item" id={tagId}>
        <span className="user-info-item__tag-item__title">{tagName}</span>
        <div className="user-info-item__tag-item__xbtn btn">
          <IconContext.Provider value={{ color: 'red' }}>
            <IoClose onClick={() => onRemoveTag(tagId)} />
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}

export default React.memo(TagList);
