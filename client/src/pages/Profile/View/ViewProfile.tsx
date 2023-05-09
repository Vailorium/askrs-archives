import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Card, Container, Row, Button,
} from 'react-bootstrap';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
import HeroData from '../../../services/HeroData';
import HeroIcon from '../../common/Hero/HeroIcon';
import HeroBuildCard from '../../common/HeroBuildCard/HeroBuildCard';
import LoadingPanel from '../../common/LoadingPanel';
import IUserProfile from '../../../interfaces/IUserProfile';
import { HeroDataModel, SkillDataModel } from '../../../models';
import IHeroBuild from '../../../interfaces/IHeroBuild';

interface ViewProfileProps {
  profile: IUserProfile;
  hero: HeroDataModel;
  builds: IHeroBuild[];
  heroList: HeroDataModel[];
  skillList: SkillDataModel[];
  isViewingOwnProfile: boolean;
  setBuilds: (state: IHeroBuild[]) => void;
}
const ViewProfile: React.FC<ViewProfileProps> = (
  {
    profile,
    hero,
    builds,
    isViewingOwnProfile,
    heroList,
    skillList,
    setBuilds,
  },
) => {
  const history = useHistory();
  const editProfile = () => {
    history.push(`${history.location.pathname}?edit`);
  };
  return (
    <Card className="border-0 profile-card" as={Container}>
      <Row>
        <div className="profile-banner" />
      </Row>
      {
            profile && builds ? (
              <>
                <Row style={{ borderTop: '2px solid black', justifyContent: 'center' }}>
                  { hero && <HeroIcon hero={hero} imageSize="xl" isResplendent={false} className="rounded-circle profile-image" />}
                </Row>
                <Row style={{ justifyContent: 'center' }}>
                  <h2 className="text-center">{profile.username}</h2>
                  {
                    isViewingOwnProfile
                    && (
                      <Button
                        size="sm"
                        variant="primary"
                        style={{ width: '200px' }}
                        onClick={editProfile}
                      >
                        <FontAwesomeIcon icon="edit" /> Edit Profile
                      </Button>
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
              </>
            ) : (
              <Row style={{ minHeight: '500px' }}>
                <LoadingPanel loading />
              </Row>
            )
          }
    </Card>
  );
};
export default ViewProfile;
