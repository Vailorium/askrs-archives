/* eslint-disable no-nested-ternary */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import { Formik } from 'formik';
import { Form, Spinner } from 'react-bootstrap';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BuildOptions from './Components/BuildOptions';
import BuildSkills from './Components/BuildSkills';

import config from '../../config';
import UnitBuild from '../common/UnitBuild/UnitBuild';
import {
  useFetchHeroListQuery,
  useFetchResplendentListQuery,
  useFetchSealListQuery,
  useFetchSkillListQuery,
} from '../../services/FEHDataApi';
import { useGetLocaleDataQuery } from '../../services/FEHLocaleApi';
import IHeroBuild from '../../interfaces/IHeroBuild';
import api from '../../api/api';

function UnitBuilder() {
  const {
    data: heroList,
    error: heroListError,
    isLoading: isHeroListLoading,
  } = useFetchHeroListQuery();

  const {
    data: skillList,
    error: skillListError,
    isLoading: isSkillListLoading,
  } = useFetchSkillListQuery();

  const {
    data: resplendentList,
    error: resplendentListError,
    isLoading: isResplendentListLoading,
  } = useFetchResplendentListQuery();

  const {
    data: sealList,
    error: sealListError,
    isLoading: isSealListLoading,
  } = useFetchSealListQuery();

  const gameDataError = heroListError || skillListError
    || resplendentListError || sealListError;
  const isGameDataLoading = isHeroListLoading || isSkillListLoading
    || isResplendentListLoading || isSealListLoading;

  const isGameDataLoaded = heroList && skillList && resplendentList && sealList;

  const {
    data: localeData,
    error: localeDataError,
    isLoading: isLocaleDataLoading,
  } = useGetLocaleDataQuery('USEN');

  return (
    <CardGroup
      as={Container}
      fluid
      style={{
        maxWidth: '95vw',
        minWidth: '80vw',
      }}
    >
      <Formik
        initialValues={{ ...config.emptyBuild, maxSkills: true, resplendentCostume: false }}
        onSubmit={(values) => {
          // Convert form data to correct format for server
          const build: IHeroBuild = {
            uid: '',
            hero_id_tag: values.hero.id_tag,
            rarity: values.build.rarity,
            merges: values.build.merges,
            weapon: values.build.skills.weapon ? values.build.skills.weapon.id_tag : undefined,
            refine: values.build.skills.refine ? values.build.skills.refine.id_tag : undefined,
            assist: values.build.skills.assist ? values.build.skills.assist.id_tag : undefined,
            special: values.build.skills.special ? values.build.skills.special.id_tag : undefined,
            a: values.build.skills.a ? values.build.skills.a.id_tag : undefined,
            b: values.build.skills.b ? values.build.skills.b.id_tag : undefined,
            c: values.build.skills.c ? values.build.skills.c.id_tag : undefined,
            s: values.build.skills.s ? values.build.skills.s.id_tag : undefined,
            resplendent: values.build.resplendent,
            boon: values.build.ivs.boon,
            bane: values.build.ivs.bane,
            floret: values.build.ivs.floret,
            dragonflowers: values.build.dragonflowers,
            blessing: values.build.blessing,
            summoner_support: values.build.summonerSupport,
            ally_support_level: values.build.allySupport.level,
            ally_support_target: values.build.allySupport.targetId,
          };
          api.createBuild(build)
            .then((res) => console.log('creating build success!', res))
            .catch((err) => console.log(err));
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
        }) => (
          <Row style={{ minWidth: '75vw', flexWrap: 'wrap' }} className="mx-auto p-2 d-flex justify-content-center">
            <Card as={Col} lg="auto" className="p-0" border="dark" style={{ width: '500px', visibility: 'hidden' }}>
              <UnitBuild unit={values} localeData={localeData} />
            </Card>
            <Card as={Col} lg="auto" className="p-0" style={{ flex: 1, minWidth: '500px' }}>
              <Form onSubmit={handleSubmit}>
                <Card.Header>
                  <Card.Title className="inline">Unit Builder</Card.Title>
                  <Button className="inline" variant="primary">Save Image</Button>
                  <Button type="submit" variant="primary">Save Build</Button>
                </Card.Header>
                <Card.Body>
                  {
                    gameDataError || localeDataError ? (
                      // eslint-disable-next-line react/jsx-one-expression-per-line
                      <div>
                        <p>Hero Data: {(heroListError as FetchBaseQueryError).status}</p>
                        <p>Resplendent Data: {
                          (resplendentListError as FetchBaseQueryError).status
                        }
                        </p>
                        <p>Skill Data: {(skillListError as FetchBaseQueryError).status}</p>
                        <p>Seal Data: {(sealListError as FetchBaseQueryError).status}</p>
                        <p>Locale Data: {(localeDataError as FetchBaseQueryError).status}</p>
                      </div>
                    ) : isGameDataLoading || isLocaleDataLoading ? (
                      <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : isGameDataLoaded && localeData ? (
                      <>
                        <BuildOptions
                          heroList={heroList}
                          values={values}
                          resplendentList={resplendentList}
                          setFieldValue={setFieldValue}
                          localeData={localeData}
                        />
                        <hr />
                        <BuildSkills
                          skillList={skillList}
                          values={values}
                          sealList={sealList}
                          setFieldValue={setFieldValue}
                          localeData={localeData}
                        />
                      </>
                    ) : null
                  }

                </Card.Body>
              </Form>
            </Card>
          </Row>
        )}
      </Formik>
    </CardGroup>
  );
}
export default UnitBuilder;
