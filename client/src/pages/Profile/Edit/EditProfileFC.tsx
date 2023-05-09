import React from 'react';
import { Form } from 'react-bootstrap';
import IUserProfile from '../../../interfaces/IUserProfile';

interface EditProfileFCProps {
  editedProfile: IUserProfile;
  setEditedProfile: (v: IUserProfile) => void;
}
const EditProfileFC: React.FC<EditProfileFCProps> = ({
  editedProfile,
  setEditedProfile,
}) => (
  <Form.Group>
    <Form.Label>Friend Code</Form.Label>
    <Form.Control
      type="text"
      value={editedProfile.friendCode || ''}
      onChange={(e) => setEditedProfile({
        ...editedProfile,
        friendCode: e.target.value,
      })}
    />
  </Form.Group>
);
export default EditProfileFC;
