import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #222222;
  height: 50px;
  display: flex;
  justify-content: space-between;
  z-index: 12;
`;

export const NavLink = styled(Link)`

  color: #979797;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 0.6rem;
  height: 100%;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &&.active {
    color: white;
    background-color: #000;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    /* display: none; */
  }
`;
