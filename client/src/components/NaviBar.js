import { FiSearch, FiPlus, FiUser } from 'react-icons/fi';
import '../stylesheets/NaviBar.css';

function NaviBar() {
  const goSearch = () => {
    window.location.href = '/search';
  };
  const goProfile = () => {
    window.location.href = '/profile';
  };
  const addPost = () => {
    window.location.href = '/post';
  };

  return (
    <>
      <nav>
        <button className="search-btn nav-btn" onClick={goSearch}>
          <FiSearch />
        </button>
        <button className="post-btn nav-btn" onClick={addPost}>
          <FiPlus />
        </button>
        <button className="profile-btn nav-btn" onClick={goProfile}>
          <FiUser />
        </button>
      </nav>
    </>
  );
}

export default NaviBar;
