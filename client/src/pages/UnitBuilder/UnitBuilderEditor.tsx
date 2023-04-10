import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Form } from 'react-bootstrap';
import BuildOptions from './Components/BuildOptions';
import BuildSkills from './Components/BuildSkills';

import UnitBuild from '../common/UnitBuild/UnitBuild';
import { HeroDataModel, SkillDataModel } from '../../models';
import UnitBuildValuesModel from '../../models/UnitBuild/UnitBuildValuesModel';
import { store } from '../../store';
import { updateBuild } from '../../services/UnitBuilderActiveBuildsSlice';

interface UnitBuilderEditorProps {
  values: UnitBuildValuesModel;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  heroList: HeroDataModel[];
  skillList: SkillDataModel[];
  resplendentList: string[];
  sealList: string[];
  localeData: Record<string, string>;
}

interface UnitBuilderEditorState {
  test: string;
}

class UnitBuilderEditor extends Component<UnitBuilderEditorProps, UnitBuilderEditorState> {
  constructor(props: UnitBuilderEditorProps) {
    super(props);
    this.state = {
      test: '',
    };
  }

  componentWillUnmount() {
    const { values } = this.props;
    const { test } = this.state;
    // On dismount, send updated build to store
    store.dispatch(updateBuild({ ...values, buildName: test }));
  }

  handleTestChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ test: ev.target.value });
  };

  render() {
    const {
      values,
      handleSubmit,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleChange,
      heroList,
      resplendentList,
      sealList,
      skillList,
      setFieldValue,
      localeData,
    } = this.props;

    return (
      <Row style={{ minWidth: '75vw', flexWrap: 'wrap' }} className="mx-auto d-flex justify-content-center">
        <Card as={Col} lg="auto" className="p-0" border="dark" style={{ width: '500px', visibility: 'hidden' }}>
          <UnitBuild unit={values} localeData={localeData} />
        </Card>
        <Card as={Col} lg="auto" className="p-0" style={{ flex: 1, minWidth: '500px' }}>
          <Form onSubmit={handleSubmit}>
            <Card.Header>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Untitled Build"
                  defaultValue={values.buildName}
                  onChange={this.handleTestChange}
                />
              </Form.Group>
              <Button className="inline" variant="primary">Save Image</Button>
              <Button type="submit" variant="primary">Save Changes</Button>
            </Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Form>
        </Card>
      </Row>
    );
  }
}
export default UnitBuilderEditor;
