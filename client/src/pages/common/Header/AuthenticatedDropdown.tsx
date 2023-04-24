import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import { UserProfile } from '../../../services/UserSlice';

interface AuthenticatedDropdownProps {
  profile: UserProfile;
}

const AuthenticatedDropdown: React.FC<AuthenticatedDropdownProps> = ({
  profile,
}) => {
  const history = useHistory();

  const handleSignOut = () => {
    AuthService.signOut().then(() => {
      history.push('/');
      window.location.reload();
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="greeting-dropdown" variant="secondary">
        Hello {profile.username}!
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={`/${profile.username}`}>Profile</Dropdown.Item>
        <Dropdown.Item href="#">Settings</Dropdown.Item>
        <Dropdown.Item href="#" onClick={handleSignOut}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AuthenticatedDropdown;
