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
import { useGetGameDataQuery } from '../../services/FEHDataApi';
import { useGetLocaleDataQuery } from '../../services/FEHLocaleApi';

function UnitBuilder() {
  const {
    data: gameData,
    error: gameDataError,
    isLoading: isGameDataLoading,
  } = useGetGameDataQuery(null);

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
                      <p>Game Data: {(gameDataError as FetchBaseQueryError).status}</p>
                      <p>Locale Data: {(localeDataError as FetchBaseQueryError).status}</p>
                    </div>
                  ) : isGameDataLoading || isLocaleDataLoading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : gameData && localeData ? (
                    <>
                      <BuildOptions
                        heroList={gameData.heroList}
                        values={values}
                        resplendentList={gameData.resplendentList}
                        setFieldValue={setFieldValue}
                        localeData={localeData}
                      />
                      <hr />
                      <BuildSkills
                        skillList={gameData.skillList}
                        values={values}
                        sealList={gameData.sealList}
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
