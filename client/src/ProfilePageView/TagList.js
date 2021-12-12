import React from 'react';
import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';

function TagList({ tagName, onRemoveTag }) {
  return (
    <>
      <div className="user-info-item__tag-item">
        <span className="user-info-item__tag-item__title">{tagName}</span>
        <div className="user-info-item__tag-item__xbtn btn">
          <IconContext.Provider value={{ color: 'red' }}>
            <IoClose onClick={() => onRemoveTag(tagName)} />
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}

export default React.memo(TagList);
