import React from "react";
import { Outlet, Link, useMatch } from "react-router-dom";
import styled from "@emotion/styled";

const Layout: React.FC = () => {
  return (
    <Page>
      <Nav>
        <NavLink isHome to="/">
          Playground
        </NavLink>
        <NavLink to="/pitch-matcher">Pitch matcher</NavLink>
      </Nav>

      <Outlet />
    </Page>
  );
};

export default Layout;

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  isHome?: boolean;
}> = ({ to, children, isHome = false }) => {
  const isActive = useMatch(to) != null;

  return (
    <StyledLink isActive={isActive} isHome={isHome} to={to}>
      {children}
    </StyledLink>
  );
};

const Nav = styled.nav`
  background: #434547;
`;

const StyledLink = styled(Link)<{
  isActive: boolean;
  isHome: boolean;
}>`
  display: inline-block;
  color: #ccc;
  font-weight: ${({ isHome }) => (isHome ? "bold" : "inherit")};
  padding: 12px 20px;
  text-decoration: none;

  ${({ isActive }) =>
    isActive
      ? `
        background:#333537;
      `
      : `
        :hover {
          background:#222;
        }
  `}
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
