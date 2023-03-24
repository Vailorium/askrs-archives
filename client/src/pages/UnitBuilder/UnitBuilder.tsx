/* eslint-disable no-nested-ternary */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import { Formik } from 'formik';
import { Spinner } from 'react-bootstrap';
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
        onSubmit={() => {}}
      >
        {({
          values,
          setFieldValue,
        }) => (
          <Row style={{ minWidth: '75vw', flexWrap: 'wrap' }} className="mx-auto p-2 d-flex justify-content-center">
            <Card as={Col} lg="auto" className="p-0" border="dark" style={{ width: '500px', visibility: 'hidden' }}>
              <UnitBuild unit={values} localeData={localeData} />
            </Card>
            <Card as={Col} lg="auto" className="p-0" style={{ flex: 1, minWidth: '500px' }}>
              <Card.Header>
                <Card.Title className="inline">Unit Builder</Card.Title>
                <Button className="inline" variant="primary">Save Image</Button>
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
            </Card>
          </Row>
        )}
      </Formik>
    </CardGroup>
  );
}
export default UnitBuilder;
