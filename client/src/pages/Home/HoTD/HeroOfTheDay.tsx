/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Chance } from 'chance';
import {
  Card, Spinner, ButtonGroup, ToggleButton, Accordion, Placeholder,
} from 'react-bootstrap';
import { useFetchHeroListQuery } from '../../../services/FEHDataApi';
import HeroDescription from '../../common/Hero/HeroDescription';
import HeroFull from '../../common/Hero/HeroFull';
import HeroName from '../../common/Hero/HeroName';
import HeroTitle from '../../common/Hero/HeroTitle';
import SkillName from '../../common/Skill/SkillName';

const portraitTypes = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Attack',
    value: 'attack',
  },
  {
    label: 'Special',
    value: 'special',
  },
  {
    label: 'Damaged',
    value: 'damaged',
  },
];

function HeroOfTheDay() {
  const { data, error, isLoading } = useFetchHeroListQuery();
  const [dailyHeroID, setDailyHeroID] = useState(-1);

  useEffect(() => {
    if (data && data.length > 0) {
      const daysSinceEpoch = Math.floor(Date.now() / 8.64e7);
      const seededRNG = new Chance(daysSinceEpoch);
      const heroID = Math.abs(seededRNG.integer()) % data.length;

      setDailyHeroID(heroID);
    }
  }, [data]);

  const [portraitType, setPortraitType] = useState('default');

  return (
    <Card>
      <Card.Header>
        <h3>
          Hero of the Day -
          &nbsp;
          {
            data && dailyHeroID > -1
              && (<><HeroName hero={data[dailyHeroID]} locale="USEN" />: <HeroTitle hero={data[dailyHeroID]} locale="USEN" /></>)
          }
          !
        </h3>
      </Card.Header>
      <Card.Body>
        {
          error ? (
            <>Hero Data failed to Load!</>
          ) : isLoading || dailyHeroID === -1 ? (
            <Spinner animation="border" role="status" variant="primary">
              {/* <span className="visually-hidden">Loading...</span> */}
              <Placeholder xs={8} />
            </Spinner>
          ) : data && dailyHeroID > -1 ? (
            <>
              <div className="w-100 d-flex justify-content-center flex-wrap">
                <HeroFull hero={data[dailyHeroID]} size="xs" isResplendent={false} fullType={portraitType as any} />
                <ButtonGroup className="my-2">
                  {
                    portraitTypes.map((por) => (
                      <ToggleButton
                        key={`portrait-${por.value}`}
                        id={`portrait-${por.value}`}
                        type="radio"
                        variant="primary"
                        name="radio"
                        value={por.value}
                        checked={portraitType === por.value}
                        onChange={(e) => setPortraitType(e.currentTarget.value)}
                      >
                        {por.label}
                      </ToggleButton>
                    ))
                  }
                </ButtonGroup>
              </div>
              <hr />
              <h4>Description</h4>
              <HeroDescription hero={data[dailyHeroID]} locale="USEN" />
              <hr />
              <h4>Skills</h4>
              <Accordion defaultActiveKey="4">
                {
                  data[dailyHeroID].skills.map(
                    (skillList, i) => (
                      <Accordion.Item eventKey={i.toString()} key={`skill-level-${i + 1}`}>
                        <Accordion.Header>{i + 1}★</Accordion.Header>
                        <Accordion.Body>
                          {
                            skillList.map(
                              (skill) => (
                                skill === null ? null
                                  : (<div key={skill}><SkillName skill={skill} locale="USEN" /><br /></div>)
                              ),
                            )
                          }
                        </Accordion.Body>
                      </Accordion.Item>
                    ),
                  )
                }
              </Accordion>
            </>
          ) : null
        }
      </Card.Body>
    </Card>
  );
}
export default HeroOfTheDay;
