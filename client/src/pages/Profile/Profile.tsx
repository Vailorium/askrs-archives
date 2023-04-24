import React, { useState, useEffect } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import IUserProfile from '../../interfaces/IUserProfile';
import IHeroBuild from '../../interfaces/IHeroBuild';
import api from '../../api/api';
import LoadingPanel from '../common/LoadingPanel';
import { HeroDataModel } from '../../models';
import HeroData from '../../services/HeroData';
import { useFetchHeroListQuery, useFetchSkillListQuery } from '../../services/FEHDataApi';
import HeroIcon from '../common/Hero/HeroIcon';
import HeroBuildCard from '../common/HeroBuildCard/HeroBuildCard';

interface ProfileParams {
  id: string;
}

const Profile: React.FC = () => {
  const history = useHistory();

  const { data: heroList } = useFetchHeroListQuery();
  const { data: skillList } = useFetchSkillListQuery();

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
  // id -> get profile -> 404 or success -> change route to username
  return (
    <Container>
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
              </Row>
              <Row>
                <h3>Builds</h3>
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
                      && builds.map((b) => (
                        <HeroBuildCard
                          build={HeroData.convertToFullBuild(b, heroList, skillList)}
                        />
                      ))
                  }
                </Slider>
              </Row>
              <Row>
                <h3>AR-D Builds</h3>
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
    </Container>
  );
};
export default Profile;
