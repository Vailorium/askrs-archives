/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {
  SkillDataModel, HeroDataModel, HeroBuildInfoModel, Stats,
} from '../../models';
// import DataService from '../../services/DataService';
import HeroFull from '../common/Hero/HeroFull';
import StatsCalculator from '../../services/StatsCalculator';
import SkillTable from './Components/SkillTable';

interface UnitDBIndividualProps {
  // eslint-disable-next-line react/no-unused-prop-types
  heroId: string;
  skillList: SkillDataModel[];
  resplendentList: string[];
}

interface UnitDBIndividualState {
  hero?: HeroDataModel,
  redirect: boolean,
  isResplendent: boolean,
  level40Stats: Stats
}

class UnitDBIndividual extends React.Component<UnitDBIndividualProps, UnitDBIndividualState> {
  constructor(props: UnitDBIndividualProps) {
    super(props);

    this.state = {
      hero: undefined,
      redirect: false,
      isResplendent: false,
      level40Stats: {
        hp: 0,
        atk: 0,
        spd: 0,
        def: 0,
        res: 0,
      },
    };

    this.updateResplendent = this.updateResplendent.bind(this);
  }

  componentDidMount() {
    // const { heroId } = this.props;
    // DataService.getHeroByIdNum(heroId)
    //   .then((h) => {
    //     const build: HeroBuildInfoModel = {
    //       hero: h,
    //       build: {
    //         rarity: 5,
    //         merges: 0,
    //         skills: {},
    //         resplendent: false,
    //         ivs: { boon: 0, bane: 0 },
    //         dragonflowers: 0,
    //         blessing: 0,
    //         summonerSupport: 0,
    //         allySupport: { targetId: '', level: 0 },
    //       },
    //     };
    //     this.setState({ hero: h, level40Stats: StatsCalculator.calculateStats(build) });
    //   })
    //   .catch(() => this.setState({ redirect: true }));
  }

  updateResplendent(e: any) {
    this.setState({ isResplendent: e.target.checked });
  }

  render() {
    const {
      hero, redirect, isResplendent, level40Stats,
    } = this.state;
    const { skillList, resplendentList } = this.props;
    if (redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <Container>
        <Row>
          <Col className="d-flex align-items-center" md="6">
            {
              hero && (
                <Carousel interval={null}>
                  <Carousel.Item>
                    <HeroFull hero={hero} imageSize="auto" isResplendent={isResplendent} fullType="default" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <HeroFull hero={hero} imageSize="auto" isResplendent={isResplendent} fullType="attack" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <HeroFull hero={hero} imageSize="auto" isResplendent={isResplendent} fullType="special" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <HeroFull hero={hero} imageSize="auto" isResplendent={isResplendent} fullType="damaged" />
                  </Carousel.Item>
                </Carousel>
              )
            }
          </Col>
          <Col className="d-flex align-items-center" md="6" style={{ height: '90vh' }}>
            <Card style={{ overflowY: 'scroll', maxHeight: '80vh', width: '100%' }}>
              {
                hero && (
                  <>
                    <Card.Header>
                      <Card.Title>{hero.name}: {hero.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      {
                        resplendentList.includes(hero.id_tag) && (
                          <>
                            <div>
                              <h6>Art Settings</h6>
                              <Form.Check
                                type="checkbox"
                                id="isResplendent"
                                label="Resplendent"
                                onChange={(e) => this.updateResplendent(e)}
                              />
                            </div>
                            <hr />
                          </>
                        )
                      }
                      <div>
                        <h6>Stats</h6>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              <th>Level 1</th>
                              <th>Level 40</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>HP</th>
                              <td>{hero.base_stats.hp}</td>
                              <td>{level40Stats.hp}</td>
                            </tr>
                            <tr>
                              <th>Atk</th>
                              <td>{hero.base_stats.atk}</td>
                              <td>{level40Stats.atk}</td>
                            </tr>
                            <tr>
                              <th>Spd</th>
                              <td>{hero.base_stats.spd}</td>
                              <td>{level40Stats.spd}</td>
                            </tr>
                            <tr>
                              <th>Def</th>
                              <td>{hero.base_stats.def}</td>
                              <td>{level40Stats.def}</td>
                            </tr>
                            <tr>
                              <th>Res</th>
                              <td>{hero.base_stats.res}</td>
                              <td>{level40Stats.res}</td>
                            </tr>
                            <tr>
                              <th>BST</th>
                              <td>
                                {
                                  hero.base_stats.hp
                                  + hero.base_stats.atk
                                  + hero.base_stats.spd
                                  + hero.base_stats.def
                                  + hero.base_stats.res
                                }
                              </td>
                              <td>
                                {
                                  level40Stats.hp
                                  + level40Stats.atk
                                  + level40Stats.spd
                                  + level40Stats.def
                                  + level40Stats.res
                                }
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div>
                        <h6>Metadata</h6>
                        <table>
                          <tr>
                            <th>ID Tag</th>
                            <td>{hero.id_tag}</td>
                          </tr>
                          <tr>
                            <th>ID Num</th>
                            <td>{hero.id_num}</td>
                          </tr>
                          <tr>
                            <th>Max Dragonflowers</th>
                            <td>{hero.dragonflowers.max_count}</td>
                          </tr>
                          <tr>
                            <th>Origins</th>
                            <td>{hero.origins}</td>
                          </tr>
                        </table>
                      </div>
                      <div>
                        <SkillTable skillList={skillList} hero={hero} />
                      </div>
                    </Card.Body>
                  </>
                )
              }
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default UnitDBIndividual;
