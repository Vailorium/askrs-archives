import React from 'react';
import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import IUserProfile from '../../../interfaces/IUserProfile';
import { HeroDataModel } from '../../../models';
import SelectField from '../../common/SelectField';
import HeroIcon from '../../common/Hero/HeroIcon';
import HeroData from '../../../services/HeroData';

interface EditProfileFavoriteHeroesProps {
  heroList: HeroDataModel[];
  localeData: Record<string, string>;
  editedProfile: IUserProfile;
  setEditedProfile: (v: IUserProfile) => void;
}
const EditProfileFavoriteHeroes: React.FC<EditProfileFavoriteHeroesProps> = ({
  heroList,
  localeData,
  editedProfile,
  setEditedProfile,
}) => {
  const favoriteHeroData = editedProfile.favoriteHeroes.map(
    (id_num) => HeroData.getHeroByIdNum(id_num, heroList),
  );

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
    <Formik
      validateOnChange={false}
      initialValues={{ favHeroes: favoriteHeroData }}
      onSubmit={async () => {
        // // update current edited profile image
        // setEditedProfile({
        //   ...editedProfile,
        //   picture: values.hero.id_num,
        // });
        // setVisible(false);
      }}
    >
      {({
        handleSubmit,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {
            [0, 1, 2, 3, 4].map((i) => (
              <Field
                name={`favHeroes[${i}]`}
                component={SelectField}
                options={heroOptions}
                onChangeEvent={(option: {
                  label: string,
                  value: HeroDataModel
                }) => {
                  const newFavHeroes = editedProfile.favoriteHeroes.slice();
                  newFavHeroes[i] = option.value.id_num;
                  setEditedProfile({
                    ...editedProfile,
                    favoriteHeroes: newFavHeroes,
                  });
                }}
                virtual
                visualIndicators
              />
            ))
          }
        </Form>
      )}
    </Formik>
  );
};
export default EditProfileFavoriteHeroes;
