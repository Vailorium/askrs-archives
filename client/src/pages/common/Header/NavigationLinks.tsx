import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../../services/UserSlice';

interface NavigationLinksProps {
  profile: UserProfile | null;
}

const NavigationLinks: React.FC<NavigationLinksProps> = (props: NavigationLinksProps) => {
  const { profile } = props;
  return (
    <Nav className="me-auto">
      <Link className="nav-link" to="/">Home</Link>
      {
        profile && profile.username && <Link className="nav-link" to="/my-builds">My Builds</Link>
      }
      {/* <Link className="nav-link" to="#">AR-D Builder</Link> */}
      <Link className="nav-link" to="/unit-builder">Unit Builder</Link>
    </Nav>
  );
};
export default NavigationLinks;
