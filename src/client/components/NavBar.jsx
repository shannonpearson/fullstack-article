import React from 'react';
import { Navbar } from 'react-bootstrap';

import ArticleModal from './ArticleModal';

const { Header, Brand } = Navbar;

const NavBar = () => (
  <Navbar>
    <Header>
      <Brand>
        holla
      </Brand>
    </Header>
    <ArticleModal />
  </Navbar>
);

export default NavBar;
