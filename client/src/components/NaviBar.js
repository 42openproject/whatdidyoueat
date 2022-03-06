import { FiSearch, FiPlus, FiUser } from 'react-icons/fi';
import styled from '@emotion/styled';

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
      <Navigation>
        <LineButton className="search-btn nav-btn" onClick={goSearch}>
          <FiSearch />
        </LineButton>
        <FillButton className="post-btn nav-btn" onClick={addPost}>
          <FiPlus />
        </FillButton>
        <LineButton className="profile-btn nav-btn" onClick={goProfile}>
          <FiUser />
        </LineButton>
      </Navigation>
    </>
  );
}

const Navigation = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 80vw;
  max-width: 450px;
  left: 0;
  right: 0;
  bottom: 25px;
  border-radius: 32px;
  background-color: #f4f4f4;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding: 0 40px;
  margin: 0 auto;
  z-index: 1;
`;

const LineButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  line-height: 1.5rem;
  width: 50px;
  height: 50px;
  color: #888988;
`;

const FillButton = styled.button`
  padding: 0;
  border: none;
  font-size: 2rem;
  line-height: 1.5rem;
  width: 46px;
  height: 46px;
  color: #f4f4f4;
  border-radius: 23px;
  background-color: #bfbfe5;
`;

export default NaviBar;
