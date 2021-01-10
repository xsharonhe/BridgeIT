import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Brand from "../../Texts/Brand";
import { connect } from "react-redux";
import { signOut } from "../../../store/actions/authActions";
import Cookies from "js-cookie";

const Navbar = ({ isAuthenticated, signOut }) => {
  const handleSignOut = (e) => {
    const token = Cookies.get("csrftoken");
    signOut(token);
  };

  const signedIn = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Account", link: "/" },
    { name: "Dashboard", link: "/dashboard/donor" },
  ];
  const signedOut = [
    { name: "Home", link: "/" },
    { name: "Sign Up", link: "/signup" },
    { name: "Sign In", link: "/signin" },
  ];

  let links;

  if (isAuthenticated) {
    links = signedIn;
  } else {
    links = signedOut;
  }

  const navbarLinks = links.map((link) => {
    return (
      <NavLink key={link.name} to={link.link}>
        <SLi>{link.name}</SLi>
      </NavLink>
    );
  });

  return (
    <NavWrapper>
      <Link to="/">
        <Brand>
          Bridge<StyledSpan>IT</StyledSpan>
        </Brand>
      </Link>
      <SUl style={{ float: "right" }}>
        {navbarLinks}
        {isAuthenticated ? (
          <NavLink to='#' onClick={handleSignOut}>
            <SLi>Sign Out</SLi>
          </NavLink>
        ) : null}
      </SUl>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  margin: 2% 10%;
  display: flex;
  justify-content: space-between;
`;

const SUl = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 9;
  float: right;
`;

const SLi = styled.li`
  ${({ theme }) => `
        display: flex;
        text-transform: uppercase;
        align-items: center;
        font-size: 1rem;
        letter-spacing: 1px;
        color: ${theme.colors.primary};
        padding: 1rem;
        margin: 0;
        &:hover {
            color: ${theme.colors.hover};
            cursor: pointer;
        }
        &.active {
            font-weight: 700;
        }
    `}
`;

const StyledSpan = styled.span`
  ${({ theme }) => `
  color: ${theme.colors.accent};
    `}
`;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signOut })(Navbar);
