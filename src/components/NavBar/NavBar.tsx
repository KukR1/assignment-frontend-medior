import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 2px solid #237dc2;

  .nav-item {
    color: #292f34;
    font-weight: bold;
    text-decoration: none;
  }

  .nav-item:hover {
    color: #237dc2;
  }
`;

export default function NavBar() {
  return (
    <StyledNavBar>
      <NavLink className="nav-item" to="/">
        Home
      </NavLink>
      <NavLink className="nav-item" to="/admin/fruits">
        Fruits
      </NavLink>
      <NavLink className="nav-item" to="/admin/vegetables">
        Vegetables
      </NavLink>
    </StyledNavBar>
  );
}
