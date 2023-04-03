import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavigationLinks from './NavigationLinks';
import AuthContainer from './AuthContainer';
import config from '../../../config';

const Header: React.FC = () => (
  <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/" className="ps-3">
        {config.title}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <NavigationLinks />
        <AuthContainer />
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default Header;
