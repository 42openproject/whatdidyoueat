import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';

function TagList({ tagName }) {
  return (
    <>
      <div className="user-info-item__tag-item">
        <span className="user-info-item__tag-item__title">{tagName}</span>
        <div className="user-info-item__tag-item__xbtn">
          <IconContext.Provider value={{ color: 'red' }}>
            <IoClose />
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}

export default TagList;
