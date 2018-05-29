import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import ArticleModal from './ArticleModal';
import TagSearch from './TagSearch';

const { Header, Brand } = Navbar;

const NavBar = () => (
  <Navbar fixedTop inverse fluid>
    <Header>
      <Brand>
        holla
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
