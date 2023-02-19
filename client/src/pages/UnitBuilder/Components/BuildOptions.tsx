import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Field } from 'formik';
import { ButtonGroup } from 'react-bootstrap';
import { HeroDataModel } from '../../../models';
import SelectField from '../../common/SelectField';
import UnitBuildValuesModel from '../../../models/UnitBuild/UnitBuildValuesModel';
import { Blessing } from '../../../enums';
import HeroData from '../../../services/HeroData';

function BuildOptions(props:
{ heroList: HeroDataModel[], values: UnitBuildValuesModel, resplendentList: string[],
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void }) {
  const {
    heroList, values, resplendentList, setFieldValue,
  } = props;
  const ascendedFloret = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/floret.webp`;
  const rarityOptions = [
    { value: 3, label: '3★' },
    { value: 4, label: '4★' },
    { value: 5, label: '5★' },
  ];
  const mergeOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((merge) => ({
    label: `+${merge.toString()}`,
    value: merge,
  }));
  const IVOptions = ['--', 'HP', 'Atk', 'Spd', 'Def', 'Res'].map((IV, i) => ({
    label: IV,
    value: i,
  }));
  const flowerOptions = [];
  for (let i = 0; i <= values.hero.dragonflowers.max_count; i += 1) {
    flowerOptions.push({ label: `+${i}`, value: i });
  }
  const blessingOptions = [
    { label: '--', value: Blessing.none },
    { label: 'Fire', value: Blessing.fire },
    { label: 'Water', value: Blessing.water },
    { label: 'Wind', value: Blessing.wind },
    { label: 'Earth', value: Blessing.earth },
    { label: 'Light', value: Blessing.light },
    { label: 'Dark', value: Blessing.dark },
    { label: 'Astra', value: Blessing.astra },
    { label: 'Anima', value: Blessing.anima },
  ];
  const heroOptions = heroList.filter((hero) => hero.id_tag !== 'PID_無し').map((hero) => ({ value: hero, label: `${hero.name}: ${hero.title}` })).sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Container style={{ padding: '0px' }}>
      <Row>
        { /* Left col */ }
        <Col xxl="6" className="d-flex flex-column">
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '130px' }} column md="auto">Hero</Form.Label>
            <Col>
              <Field
                name="hero"
                component={SelectField}
                options={heroOptions}
                onChangeEvent={(e: { label: string, value: HeroDataModel }) => {
                  const { value } = e;
                  if (!resplendentList.includes(value.id_tag)) {
                    setFieldValue('resplendentCostume', false);
                    setFieldValue('build.resplendent', false);
                  }
                  if (value.legendary) {
                    setFieldValue('build.blessing', Blessing.none);
                  }
                }}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '130px' }} column md="auto">Rarity/Merges</Form.Label>
            <Col>
              <Field
                name="build.rarity"
                component={SelectField}
                options={rarityOptions}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
            <Col>
              <Field
                name="build.merges"
                component={SelectField}
                options={mergeOptions}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '130px' }} column md="auto">Asset / Flaw</Form.Label>
            <Col>
              <Field
                name="build.ivs.boon"
                component={SelectField}
                options={IVOptions}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
            <Col>
              <Field
                name="build.ivs.bane"
                component={SelectField}
                options={IVOptions}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '130px' }} column md="auto"><img style={{ height: '28px' }} src={ascendedFloret} alt="ascended asset" /></Form.Label>
            <Col>
              <Field
                name="build.ivs.boon"
                component={SelectField}
                options={IVOptions}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
            <Col />
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '130px' }} column md="auto">Flowers</Form.Label>
            <Col style={{ flexGrow: 0.5 }}>
              <Field
                name="build.dragonflowers"
                component={SelectField}
                options={flowerOptions}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
        </Col>
        { /* Right col */ }
        <Col xxl="6" className="d-flex flex-column">
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1" style={{ flexWrap: 'nowrap' }}>
            <Form.Label style={{ width: '115px' }}>
              Resplendent
              <br />
              Outfit/Bonus
            </Form.Label>
            <div className="flex-grow-1">
              <ButtonGroup className="me-2">
                <ToggleButton
                  key="resplendent-costume-true"
                  id="resplendent-costume-true"
                  name="resplendentCostume"
                  type="radio"
                  value="true"
                  variant="outline-primary"
                  disabled={!resplendentList.includes(values.hero.id_tag)}
                  checked={values.resplendentCostume === true}
                  onChange={() => { setFieldValue('resplendentCostume', true); setFieldValue('build.resplendent', true); }}
                >
                  On
                </ToggleButton>
                <ToggleButton
                  key="resplendent-costume-false"
                  id="resplendent-costume-false"
                  name="resplendentCostume"
                  type="radio"
                  value="false"
                  variant="outline-danger"
                  disabled={!resplendentList.includes(values.hero.id_tag)}
                  checked={values.resplendentCostume === false}
                  onChange={() => { setFieldValue('resplendentCostume', false); }}
                >
                  Off
                </ToggleButton>
              </ButtonGroup>
              <ButtonGroup>
                <ToggleButton
                  key="resplendent-true"
                  id="resplendent-true"
                  name="build.resplendent"
                  type="radio"
                  value="true"
                  variant="outline-primary"
                  disabled={!resplendentList.includes(values.hero.id_tag)}
                  checked={values.build.resplendent === true}
                  onChange={() => { setFieldValue('build.resplendent', true); }}
                >
                  On
                </ToggleButton>
                <ToggleButton
                  key="resplendent-false"
                  id="resplendent-false"
                  name="build.resplendent"
                  type="radio"
                  value="false"
                  variant="outline-danger"
                  disabled={!resplendentList.includes(values.hero.id_tag)}
                  checked={values.build.resplendent === false}
                  onChange={() => { setFieldValue('build.resplendent', false); }}
                >
                  Off
                </ToggleButton>
              </ButtonGroup>
            </div>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center" style={{ flexWrap: 'nowrap' }}>
            <Form.Label style={{ width: '115px' }}>
              Summoner
              <br />
              Support
            </Form.Label>
            <div className="flex-grow-1">
              <ButtonGroup>
                <ToggleButton
                  key="summoner-support-no"
                  name="build.summonerSupport"
                  id="summoner-support-no"
                  type="radio"
                  className="p-2"
                  value="0"
                  variant="outline-primary"
                  disabled={!values.hero.name}
                  checked={values.build.summonerSupport === 0}
                  onChange={() => setFieldValue('build.summonerSupport', 0)}
                >
                  No
                </ToggleButton>
                <ToggleButton
                  key="summoner-support-c"
                  name="build.summonerSupport"
                  id="summoner-support-c"
                  type="radio"
                  className="p-2"
                  value="1"
                  variant="outline-primary"
                  disabled={!values.hero.name}
                  checked={values.build.summonerSupport === 1}
                  onChange={() => setFieldValue('build.summonerSupport', 1)}
                >
                  C
                </ToggleButton>
                <ToggleButton
                  key="summoner-support-b"
                  name="build.summonerSupport"
                  id="summoner-support-b"
                  type="radio"
                  className="p-2"
                  value="2"
                  variant="outline-primary"
                  disabled={!values.hero.name}
                  checked={values.build.summonerSupport === 2}
                  onChange={() => setFieldValue('build.summonerSupport', 2)}
                >
                  B
                </ToggleButton>
                <ToggleButton
                  key="summoner-support-a"
                  name="build.summonerSupport"
                  id="summoner-support-a"
                  type="radio"
                  className="p-2"
                  value="3"
                  variant="outline-primary"
                  disabled={!values.hero.name}
                  checked={values.build.summonerSupport === 3}
                  onChange={() => setFieldValue('build.summonerSupport', 3)}
                >
                  A
                </ToggleButton>
                <ToggleButton
                  key="summoner-support-s"
                  name="build.summonerSupport"
                  id="summoner-support-s"
                  type="radio"
                  className="p-2"
                  value={4}
                  variant="outline-primary"
                  disabled={!values.hero.name}
                  checked={values.build.summonerSupport === 4}
                  onChange={() => setFieldValue('build.summonerSupport', 4)}
                >
                  S
                </ToggleButton>
              </ButtonGroup>
            </div>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '91px' }}>Blessing</Form.Label>
            <Col>
              <Field
                name="build.blessing"
                component={SelectField}
                options={blessingOptions}
                isDisabled={!values.hero.name || HeroData.isLegendaryOrMythic(values.hero)}
                visualIndicators
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default BuildOptions;
