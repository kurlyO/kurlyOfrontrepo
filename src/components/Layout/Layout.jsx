import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const LayoutStyles = styled.div`
  min-height: 86vh;
`;

function Layout({ children }) {
  return (
    <div>
      <Header />
      <LayoutStyles>{children}</LayoutStyles>
      <Footer />
    </div>
  );
}

export default Layout;
