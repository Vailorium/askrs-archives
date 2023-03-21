/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Card, Spinner, ButtonGroup, ToggleButton, Accordion,
} from 'react-bootstrap';
import { useGetGameDataQuery } from '../../../services/FEHDataApi';
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

interface HeroOfTheDayProps {
  dailyHeroID: number;
}

function HeroOfTheDay(props: HeroOfTheDayProps) {
  const { data, error, isLoading } = useGetGameDataQuery(null);
  const { dailyHeroID } = props;

  const [portraitType, setPortraitType] = useState('default');

  return (
    <Card>
      <Card.Header>
        <h3>
          Hero of the Day -
          &nbsp;
          {
            data
              && (<><HeroName hero={data.heroList[dailyHeroID]} locale="USEN" />: <HeroTitle hero={data.heroList[dailyHeroID]} locale="USEN" /></>)
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
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : data && dailyHeroID > -1 ? (
            <>
              <div className="w-100 d-flex justify-content-center flex-wrap">
                <HeroFull hero={data.heroList[dailyHeroID]} size="xs" isResplendent={false} fullType={portraitType as any} />
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
              <HeroDescription hero={data.heroList[dailyHeroID]} locale="USEN" />
              <hr />
              <h4>Skills</h4>
              <Accordion defaultActiveKey="4">
                {
                  data.heroList[dailyHeroID].skills.map(
                    (skillList, i) => (
                      <Accordion.Item eventKey={i.toString()}>
                        <Accordion.Header>{i + 1}★</Accordion.Header>
                        <Accordion.Body>
                          {
                            skillList.map(
                              (skill) => (
                                skill === null ? null
                                  : (<div><SkillName key={skill} skill={skill} locale="USEN" /><br /></div>)
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
