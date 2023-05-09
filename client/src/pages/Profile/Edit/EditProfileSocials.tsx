import React from 'react';
import { Form } from 'react-bootstrap';
import IUserProfile from '../../../interfaces/IUserProfile';

interface EditProfileSocialsProps {
  editedProfile: IUserProfile;
  setEditedProfile: (v: IUserProfile) => void;
}
const EditProfileSocials: React.FC<EditProfileSocialsProps> = ({
  editedProfile,
  setEditedProfile,
}) => (
  <>
    <Form.Group>
      <Form.Label>Reddit</Form.Label>
      <Form.Control
        type="text"
        value={(editedProfile.socials && editedProfile.socials.reddit) || ''}
        onChange={(e) => setEditedProfile({
          ...editedProfile,
          socials: {
            ...editedProfile.socials,
            reddit: e.target.value,
          },
        })}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Twitter</Form.Label>
      <Form.Control
        type="text"
        value={(editedProfile.socials && editedProfile.socials.twitter) || ''}
        onChange={(e) => setEditedProfile({
          ...editedProfile,
          socials: {
            ...editedProfile.socials,
            twitter: e.target.value,
          },
        })}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>YouTube</Form.Label>
      <Form.Control
        type="text"
        value={(editedProfile.socials && editedProfile.socials.youtube) || ''}
        onChange={(e) => setEditedProfile({
          ...editedProfile,
          socials: {
            ...editedProfile.socials,
            youtube: e.target.value,
          },
        })}
      />
    </Form.Group>
  </>
);
export default EditProfileSocials;
