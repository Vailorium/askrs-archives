import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import config from '../../config';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">{config.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link>AR-D Builder</Nav.Link>
          <Nav.Link href="/unit-builder">Unit Builder</Nav.Link>
          <Nav.Link href="/unit-db">Unit Database</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;
