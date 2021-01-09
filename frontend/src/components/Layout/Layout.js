import React from "react";
import styled from "styled-components";

// TODO:
import Navbar from '../Containers/Navigation/Navbar';
import Footer from '../Containers/Navigation/Footer';

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Page>{children}</Page>
      <Footer />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
    position: relative;
    min-height: 100vh;
`;

const Page = styled.main`
    // margin: 2% 10%;
`;

const SDiv = styled.div`
    height: 100px;
    background-color: grey;
    color: white;
    margin: auto
`;

export default Layout;
