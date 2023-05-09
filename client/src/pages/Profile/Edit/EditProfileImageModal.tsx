import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Field, Formik, getIn } from 'formik';
import { HeroDataModel } from '../../../models';
import SelectField from '../../common/SelectField';
import HeroIcon from '../../common/Hero/HeroIcon';
import IUserProfile from '../../../interfaces/IUserProfile';

interface EditProfileImageModalProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
  currentProfileImage: HeroDataModel;
  heroList: HeroDataModel[];
  localeData: Record<string, string>;
  editedProfile: IUserProfile;
  setEditedProfile: (v: IUserProfile) => void;
}
const EditProfileImageModal: React.FC<EditProfileImageModalProps> = ({
  visible,
  setVisible,
  currentProfileImage,
  heroList,
  localeData,
  editedProfile,
  setEditedProfile,
}) => {
  const heroOptions = heroList
    .filter((hero) => hero.id_tag !== 'PID_無し')
    .map((hero) => {
      const name = localeData[`M${hero.id_tag}`];
      const heroIDSplit = hero.id_tag.split('_');
      const heroID = heroIDSplit[heroIDSplit.length - 1];
      const heroTitleID = `MPID_HONOR_${heroID}`;
      const title = localeData[heroTitleID];
      if (name && title) {
        return (
          {
            value: hero,
            label: `${name}: ${title}`,
            optionLabel: (
              <div className="d-flex align-items-center">
                <div className="me-2"><HeroIcon hero={hero} imageSize="sm" isResplendent={false} /></div>{name}: {title}
              </div>
            ),
          });
      }
      return {
        value: hero,
        label: 'ERROR',
      };
    })
    .sort((a, b) => {
      const aName = localeData[`M${a.value.id_tag}`];
      const bName = localeData[`M${b.value.id_tag}`];
      if (aName && bName) {
        return aName > bName ? 1 : -1;
      }
      return -1;
    });
  return (
    <Modal
      show={visible}
      onHide={() => setVisible(false)}
    >
      <Formik
        validateOnChange={false}
        initialValues={{ hero: currentProfileImage }}
        onSubmit={async (values) => {
          // update current edited profile image
          setEditedProfile({
            ...editedProfile,
            picture: values.hero.id_num,
          });
          setVisible(false);
        }}
      >
        {({
          handleSubmit,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field
                name="hero"
                component={SelectField}
                options={heroOptions}
                isValid={getIn(touched, 'hero.id_num') && !getIn(errors, 'hero.id_num')}
                isInvalid={!!getIn(errors, 'hero.id_num')}
                errorMessage={getIn(errors, 'hero.id_num')}
                virtual
                visualIndicators
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default EditProfileImageModal;
