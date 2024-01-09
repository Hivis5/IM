import React from "react";
import styled from "styled-components";

const NavBar = styled.nav`
  border-bottom: 1px solid #a9a9a9;
  overflow: hidden;
`;

const NavLink = styled.a`
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const ActiveLink = styled(NavLink)`
  border-bottom: 3px solid #635ef0;
`;

const NavigationBar = () => {
  return (
    <NavBar>
      <ActiveLink href="#">Location</ActiveLink>
      <NavLink href="#">Companies</NavLink>
      <NavLink href="#">Stats</NavLink>
    </NavBar>
  );
};

export default NavigationBar;
