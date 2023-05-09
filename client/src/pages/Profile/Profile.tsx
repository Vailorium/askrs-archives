/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import IUserProfile from '../../interfaces/IUserProfile';
import IHeroBuild from '../../interfaces/IHeroBuild';
import api from '../../api/api';
import { HeroDataModel } from '../../models';
import HeroData from '../../services/HeroData';
import { useFetchHeroListQuery, useFetchSkillListQuery } from '../../services/FEHDataApi';
import { useGetUserProfileQuery } from '../../services/UserProfileApi';
import ViewProfile from './View/ViewProfile';
import EditProfile from './Edit/EditProfile';
import LoadingPanel from '../common/LoadingPanel';
import { useGetLocaleDataQuery } from '../../services/FEHLocaleApi';

interface ProfileParams {
  id: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const { search } = history.location;
  const params = new URLSearchParams(search);

  const isInEditMode = params.get('edit') !== null;

  const { data: localeData } = useGetLocaleDataQuery('USEN');
  const { data: heroList } = useFetchHeroListQuery();
  const { data: skillList } = useFetchSkillListQuery();
  const { data: myProfile } = useGetUserProfileQuery();

  const { id } = useParams<ProfileParams>();
  const [profile, setProfile] = useState<IUserProfile>();
  const [builds, setBuilds] = useState<IHeroBuild[]>();
  const [hero, setHero] = useState<HeroDataModel>();

  useEffect(() => {
    api.searchUserProfile(id)
      .then((searchResult) => {
        setProfile(searchResult.profile);
        setBuilds(searchResult.builds);
      })
      .catch(() => {
        history.replace('/404');
      });
  }, []);

  useEffect(() => {
    if (heroList && profile) {
      setHero(
        HeroData.getHeroByIdNum(profile?.picture, heroList)
          ?? HeroData.getHeroByIdNum(21, heroList),
      );
    }
  }, [heroList, profile]);

  const isViewingOwnProfile = myProfile && profile && myProfile.uid === profile.uid;
  return (
    <Container>
      {
        // check truthy
        // eslint-disable-next-line no-nested-ternary
        (profile && hero && builds && isViewingOwnProfile !== undefined && heroList && skillList && localeData)
          ? (isInEditMode
            ? (
              <EditProfile
                profile={profile}
                builds={builds}
                isViewingOwnProfile={isViewingOwnProfile}
                heroList={heroList}
                skillList={skillList}
                setBuilds={setBuilds}
                localeData={localeData}
                setProfile={setProfile}
              />
            ) : (
              <ViewProfile
                profile={profile}
                hero={hero}
                builds={builds}
                isViewingOwnProfile={isViewingOwnProfile}
                heroList={heroList}
                skillList={skillList}
                setBuilds={setBuilds}
              />
            )
          ) : (
            <Row style={{ minHeight: '500px' }}>
              <LoadingPanel loading />
            </Row>
          )
      }
    </Container>
  );
};
export default Profile;
