import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavigationLinks: React.FC = () => (
  <Nav className="me-auto">
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link>AR-D Builder</Nav.Link>
    <Nav.Link href="/unit-builder">Unit Builder</Nav.Link>
    <Nav.Link href="/unit-db">Unit Database</Nav.Link>
  </Nav>
);

export default NavigationLinks;
