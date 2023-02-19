import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import config from '../../config';

function Footer() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Collapse>
        <Navbar.Text>
          v
          {config.version}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Footer;
