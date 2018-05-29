import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import ArticleModal from './ArticleModal';
import TagSearch from './TagSearch';

const { Header, Brand } = Navbar;

const NavBar = () => (
  <Navbar fluid fixedTop>
    <Header>
      <Brand>
        <div style={{ marginTop: 7 }}> Hello </div>
      </Brand>
    </Header>
    <Nav>
      <NavItem>
        <ArticleModal eventKey={1} />
      </NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem>
        <TagSearch eventKey={2} />
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
