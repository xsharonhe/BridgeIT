import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { Brand } from "../../Texts/Brand";

const Navbar = () => {
  const signedIn = [
    { name: "Dashboard", link: "/" },
    { name: "Account", link: "/" },
    { name: "Sign Out", link: "/" },
  ];
  const signedOut = [
    { name: "Home", link: "/" },
    { name: "Sign Up", link: "/" },
    { name: "Sign In", link: "/" },
  ];

  let links;

  links = signedIn; //TODO: change links on auth status

  const navbarLinks = links.map((link) => {
    return (
      <NavLink to={link.link}>
        <SLi>{link.name}</SLi>
      </NavLink>
    );
  });

  return (
    <NavWrapper>
      <Link to="/">
        <Brand>BridgeIT</Brand>
      </Link>
      <SUl style={{ float: "right" }}>{navbarLinks}</SUl>
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

export default Navbar;
