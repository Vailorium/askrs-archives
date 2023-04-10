import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Form } from 'react-bootstrap';
import { FormikErrors, FormikTouched } from 'formik';
import BuildOptions from './Components/BuildOptions';
import BuildSkills from './Components/BuildSkills';

import UnitBuild from '../common/UnitBuild/UnitBuild';
import { HeroDataModel, SkillDataModel } from '../../models';
import UnitBuildValuesModel from '../../models/UnitBuild/UnitBuildValuesModel';
import { store } from '../../store';
import { updateBuild } from '../../services/UnitBuilderActiveBuildsSlice';

interface UnitBuilderEditorProps {
  errors: FormikErrors<UnitBuildValuesModel>;
  touched: FormikTouched<UnitBuildValuesModel>;
  values: UnitBuildValuesModel;
  // eslint-disable-next-line react/no-unused-prop-types
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  heroList: HeroDataModel[];
  skillList: SkillDataModel[];
  resplendentList: string[];
  sealList: string[];
  localeData: Record<string, string>;
  buildName: string;
  setBuildName: React.Dispatch<React.SetStateAction<string>>;
}

class UnitBuilderEditor extends Component<UnitBuilderEditorProps> {
  componentWillUnmount() {
    const { values, buildName } = this.props;
    // On dismount, send updated build to store
    store.dispatch(updateBuild({ ...values, buildName }));
  }

  handleBuildNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { setBuildName } = this.props;
    setBuildName(ev.target.value);
  };

  render() {
    const {
      values,
      handleSubmit,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleChange,
      touched,
      errors,
      heroList,
      resplendentList,
      sealList,
      skillList,
      setFieldValue,
      localeData,
      buildName,
    } = this.props;

    const buildNameError = (buildName.length === 0 || buildName.length > 30) ? 'Build Name must be between 1 and 30 characters' : '';
    return (
      <Row style={{ minWidth: '75vw', flexWrap: 'wrap' }} className="mx-auto d-flex justify-content-center">
        <Card as={Col} lg="auto" className="p-0" border="dark" style={{ width: '500px', visibility: 'hidden' }}>
          <UnitBuild unit={values} localeData={localeData} />
        </Card>
        <Card as={Col} lg="auto" className="p-0" style={{ flex: 1, minWidth: '500px' }}>
          <Form noValidate onSubmit={handleSubmit}>
            <Card.Header>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Untitled Build"
                  defaultValue={values.buildName}
                  onChange={this.handleBuildNameChange}
                  isValid={touched.buildName && !buildNameError}
                  isInvalid={!!buildNameError}
                />
                {
                  !!buildNameError && <Form.Control.Feedback type="invalid">{buildNameError}</Form.Control.Feedback>
                }
              </Form.Group>
              <Button className="inline" variant="primary">Save Image</Button>
              <Button type="submit" variant="primary" disabled={Object.keys(errors).length > 0 && !buildNameError}>Save Changes</Button>
            </Card.Header>
            <Card.Body>
              <BuildOptions
                heroList={heroList}
                values={values}
                touched={touched}
                errors={errors}
                resplendentList={resplendentList}
                setFieldValue={setFieldValue}
                localeData={localeData}
              />
              <hr />
              <BuildSkills
                skillList={skillList}
                values={values}
                touched={touched}
                errors={errors}
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
