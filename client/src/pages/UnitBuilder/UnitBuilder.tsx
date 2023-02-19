import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import { Formik } from 'formik';
import BuildOptions from './Components/BuildOptions';
import BuildSkills from './Components/BuildSkills';
import { HeroBuildInfoModel, HeroDataModel, SkillDataModel } from '../../models';

import config from '../../config';
import UnitBuild from '../common/UnitBuild/UnitBuild';

interface UnitBuilderProps {
  heroList: HeroDataModel[],
  skillList: SkillDataModel[],
  sealList: string[],
  resplendentList: string[],
  handleHeroBuildDataChange: (heroBuildData: HeroBuildInfoModel) => void,
}
// eslint-disable-next-line max-len
class UnitBuilder extends React.Component<UnitBuilderProps, { heroBuildData: HeroBuildInfoModel }> {
  constructor(props: UnitBuilderProps) {
    super(props);

    this.state = { heroBuildData: JSON.parse(JSON.stringify(config.emptyBuild)) };
  }

  handleHeroBuildDataChange = () => {
    const { heroBuildData } = this.state;
    const { handleHeroBuildDataChange } = this.props;
    if (handleHeroBuildDataChange) {
      handleHeroBuildDataChange(heroBuildData);
    }
  };

  render() {
    const {
      heroList, skillList, sealList, resplendentList,
    } = this.props;

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
                <UnitBuild unit={values} />
              </Card>
              <Card as={Col} lg="auto" className="p-0" style={{ flex: 1, minWidth: '500px' }}>
                <Card.Header>
                  <Card.Title className="inline">Unit Builder</Card.Title>
                  <Button className="inline" variant="primary">Save Image</Button>
                </Card.Header>
                <Card.Body>
                  <BuildOptions
                    heroList={heroList}
                    values={values}
                    resplendentList={resplendentList}
                    setFieldValue={setFieldValue}
                  />
                  <hr />
                  <BuildSkills skillList={skillList} values={values} sealList={sealList} />
                </Card.Body>
              </Card>
            </Row>
          )}
        </Formik>
      </CardGroup>
    );
  }
}
export default UnitBuilder;
