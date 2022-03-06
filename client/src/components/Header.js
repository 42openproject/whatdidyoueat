import { FiHome, FiMenu } from 'react-icons/fi';
import styled from '@emotion/styled';

function Header() {
  const goHome = () => {
    window.location.href = '/main';
  };
  const toggleMenu = () => {
    console.log('toggle menu');
  };
  return (
    <>
      <HeaderContainer>
        <HomeButton onClick={goHome}>
          <FiHome />
        </HomeButton>
        <MenuButton onClick={toggleMenu}>
          <FiMenu />
        </MenuButton>
      </HeaderContainer>
    </>
  );
}
const HeaderContainer = styled.header`
  max-width: 600px;
  height: 60px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const HomeButton = styled.button`
  margin: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 900;
  color: #bfbfe5;
  margin: 10px 12px;
`;
const MenuButton = styled.button`
  margin: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 900;
  color: #bfbfe5;
  margin: 10px 12px;
`;

export default Header;
