import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Row, Button,
} from 'react-bootstrap';
import Slider from 'react-slick';
import { Redirect, useHistory } from 'react-router-dom';
import HeroData from '../../../services/HeroData';
import HeroIcon from '../../common/Hero/HeroIcon';
import HeroBuildCard from '../../common/HeroBuildCard/HeroBuildCard';
// import LoadingPanel from '../../common/LoadingPanel';
import IUserProfile from '../../../interfaces/IUserProfile';
import { HeroDataModel, SkillDataModel } from '../../../models';
import IHeroBuild from '../../../interfaces/IHeroBuild';
import EditProfileImageModal from './EditProfileImageModal';
import api from '../../../api/api';

interface EditProfileProps {
  profile: IUserProfile;
  builds: IHeroBuild[];
  heroList: HeroDataModel[];
  skillList: SkillDataModel[];
  localeData: Record<string, string>;
  isViewingOwnProfile: boolean;
  setBuilds: (state: IHeroBuild[]) => void;
  setProfile: (state: IUserProfile) => void;
}
const EditProfile: React.FC<EditProfileProps> = (
  {
    profile,
    builds,
    isViewingOwnProfile,
    heroList,
    skillList,
    localeData,
    setBuilds,
    setProfile,
  },
) => {
  const [editedProfile, setEditedProfile] = useState<IUserProfile>(profile);
  const [isProfileImageModalVisible, setIsProfileImageModalVisible] = useState(false);

  const history = useHistory();
  const saveProfile = async () => {
    const p = await api.updateUserProfile(editedProfile);
    setProfile(p);
    history.push(history.location.pathname);
  };

  const cancelSaveProfile = () => {
    history.push(history.location.pathname);
  };

  const [hero, setHero] = useState<HeroDataModel>();

  useEffect(() => {
    if (heroList && editedProfile) {
      setHero(
        HeroData.getHeroByIdNum(editedProfile?.picture, heroList)
          ?? HeroData.getHeroByIdNum(21, heroList),
      );
    }
  }, [heroList, editedProfile]);

  // Redirect if not viewing own profile
  if (!isViewingOwnProfile) {
    return (
      <Redirect to={history.location.pathname} />
    );
  }

  return (
    <Card className="border-0 profile-card" as={Container}>
      <Row>
        <div className="profile-banner" />
      </Row>
      <Row style={{ borderTop: '2px solid black', justifyContent: 'center' }}>
        {
          hero && (
            <>
              <HeroIcon hero={hero} imageSize="xl" isResplendent={false} className="rounded-circle profile-image" />
              <div
                role="button"
                className="edit-profile-image"
                onClick={() => setIsProfileImageModalVisible(true)}
                onKeyDown={() => setIsProfileImageModalVisible(true)}
                tabIndex={0}
              >
                <FontAwesomeIcon icon="edit" className="edit-profile-image-icon" />
              </div>
              <EditProfileImageModal
                visible={isProfileImageModalVisible}
                setVisible={setIsProfileImageModalVisible}
                currentProfileImage={hero}
                heroList={heroList}
                localeData={localeData}
                editedProfile={editedProfile}
                setEditedProfile={setEditedProfile}
              />
            </>
          )
        }
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <h2 className="text-center">{editedProfile.username}</h2>
        {
          isViewingOwnProfile
          && (
            <>
              <Button
                size="sm"
                variant="success"
                style={{ width: '100px' }}
                onClick={saveProfile}
              >
                <FontAwesomeIcon icon="save" /> Save Profile
              </Button>
              <Button
                size="sm"
                variant="secondary"
                style={{ width: '100px' }}
                onClick={cancelSaveProfile}
              >
                <FontAwesomeIcon icon="times" /> Cancel
              </Button>
            </>
          )
        }
      </Row>
      <Row>
        <h3>Featured Builds <Button variant="link">See all</Button></h3>
        <Slider
          dots
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={1}
          initialSlide={0}
          swipeToSlide
        >
          {
            heroList && skillList
              && builds.map((b, i) => (
                <HeroBuildCard
                  build={HeroData.convertToFullBuild(b, heroList, skillList)}
                  onDelete={() => {
                    const postDeletedBuilds = [...builds];
                    postDeletedBuilds.splice(i, 1);
                    setBuilds(postDeletedBuilds);
                  }}
                  actionButtons={isViewingOwnProfile ? 'owner' : 'viewer'}
                />
              ))
          }
        </Slider>
      </Row>
      <Row>
        <h3>Featured AR-D Builds</h3>
        <p>{builds.length}</p>
      </Row>
      <Row>
        <h3>AR-O Teams</h3>
        <p>{builds.length}</p>
      </Row>
      <Row>
        <h3>Favorite Heroes</h3>
        <p>{builds.length}</p>
      </Row>
      <Row>
        <h3>Favorite Builds</h3>
        <p>{builds.length}</p>
      </Row>
      <Row>
        <h3>Favorite ARD</h3>
        <p>{builds.length}</p>
      </Row>
      <Row>
        <h3>Favorite ARO</h3>
        <p>{builds.length}</p>
      </Row>
    </Card>
  );
};
export default EditProfile;
