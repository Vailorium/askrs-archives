/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import randomstring from 'randomstring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useFetchHeroListQuery,
  useFetchResplendentListQuery,
  useFetchSealListQuery,
  useFetchSkillListQuery,
} from '../../services/FEHDataApi';
import { useGetLocaleDataQuery } from '../../services/FEHLocaleApi';
import UnitBuildValuesModel from '../../models/UnitBuild/UnitBuildValuesModel';
import { store } from '../../store';
import { addBuild } from '../../services/UnitBuilderActiveBuildsSlice';
import config from '../../config';
import UnitBuilderContainer from './UnitBuilderContainer';

const UnitBuilder: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const unitBuilds: UnitBuildValuesModel[] = useSelector<
  { unitBuilderActiveBuilds: { builds: UnitBuildValuesModel[] } }
  >(
    (state) => state.unitBuilderActiveBuilds.builds,
  ) as UnitBuildValuesModel[];

  useEffect(() => {
    const build = {
      maxSkills: true,
      resplendentCostume: false,
      id: randomstring.generate(),
      buildName: '',
      ...config.emptyBuild,
    };
    if (unitBuilds.length === 0) {
      store.dispatch(addBuild(build));
    }
  }, []);

  const {
    data: heroList,
  } = useFetchHeroListQuery();

  const {
    data: skillList,
  } = useFetchSkillListQuery();

  const {
    data: resplendentList,
  } = useFetchResplendentListQuery();

  const {
    data: sealList,
  } = useFetchSealListQuery();

  const {
    data: localeData,
  } = useGetLocaleDataQuery('USEN');

  const createNewBuild = () => {
    const id = randomstring.generate();
    const build = {
      maxSkills: true,
      resplendentCostume: false,
      id,
      buildName: '',
      ...config.emptyBuild,
    };

    store.dispatch(addBuild(build));

    setActiveKey(id);
  };

  return (
    <Container style={{ minWidth: '90vw' }}>
      <Card>
        <Card.Body>
          <Tabs
            fill
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k || undefined)}
            transition={false}
          >
            {
              heroList && skillList && localeData && sealList && resplendentList
                && unitBuilds.map((b) => (
                  <Tab eventKey={b.id} title={b.buildName ? b.buildName : 'Untitled'}>
                    <UnitBuilderContainer
                      build={b}
                      heroList={heroList}
                      skillList={skillList}
                      localeData={localeData}
                      sealList={sealList}
                      resplendentList={resplendentList}
                    />
                  </Tab>
                ))
            }
            <Tab
              title={
                (
                  <div role="button" onClick={createNewBuild} onKeyDown={createNewBuild} tabIndex={0}>
                    <FontAwesomeIcon icon="plus-circle" />
                  </div>
                )
              }
            >
              <div>a</div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default UnitBuilder;
