import React, { useEffect } from "react";
import styled from "styled-components";

import Navbar from "../Containers/Navigation/Navbar";
import Footer from "../Containers/Navigation/Footer";

import { checkAuth } from "../../store/actions/authActions";
import { connect } from "react-redux";

const Layout = ({ children, checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, []);

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

const Page = styled.main``;

export default connect(null, { checkAuth })(Layout);
