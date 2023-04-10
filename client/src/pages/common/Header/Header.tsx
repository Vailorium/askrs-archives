import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavigationLinks from './NavigationLinks';
import AuthContainer from './AuthContainer';
import config from '../../../config';
import { useGetUserProfileQuery } from '../../../services/UserProfileApi';

const Header: React.FC = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/" className="ps-3">
          {config.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {
            isLoading || !data
              ? <NavigationLinks profile={null} /> : <NavigationLinks profile={data} />
          }
          {
            !isLoading && data ? <AuthContainer profile={data} /> : null
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
export default Header;
