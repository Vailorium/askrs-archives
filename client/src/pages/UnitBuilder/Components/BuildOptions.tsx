import React, { memo } from 'react';
// import * as ReactDOMServer from 'react-dom/server';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {
  Field, FormikErrors, FormikTouched, getIn,
} from 'formik';
import { ButtonGroup } from 'react-bootstrap';
import { HeroDataModel } from '../../../models';
import SelectField from '../../common/SelectField';
import UnitBuildValuesModel from '../../../models/UnitBuild/UnitBuildValuesModel';
import { Element, IVS } from '../../../enums';
import HeroData from '../../../services/HeroData';
import HeroIcon from '../../common/Hero/HeroIcon';

const ascendedFloret = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/floret.webp`;
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

const blessingOptions = [
  { label: '--', value: Element.none },
  { label: 'Fire', value: Element.fire },
  { label: 'Water', value: Element.water },
  { label: 'Wind', value: Element.wind },
  { label: 'Earth', value: Element.earth },
  { label: 'Light', value: Element.light },
  { label: 'Dark', value: Element.dark },
  { label: 'Astra', value: Element.astra },
  { label: 'Anima', value: Element.anima },
];

interface BuildOptionsProps {
  heroList: HeroDataModel[],
  values: UnitBuildValuesModel,
  errors: FormikErrors<UnitBuildValuesModel>,
  touched: FormikTouched<UnitBuildValuesModel>,
  resplendentList: string[],
  localeData: Record<string, string>,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
}

const BuildOptions = memo((props: BuildOptionsProps) => {
  const {
    heroList,
    values,
    errors,
    touched,
    resplendentList,
    setFieldValue,
    localeData,
  } = props;

  const flowerOptions = [];
  for (let i = 0; i <= values.hero.dragonflowers.max_count; i += 1) {
    flowerOptions.push({ label: `+${i}`, value: i });
  }

  const heroOptions = heroList
    .filter((hero) => hero.id_tag !== 'PID_無し')
    .map((hero) => {
      const name = localeData[`M${hero.id_tag}`];
      const heroIDSplit = hero.id_tag.split('_');
      const heroID = heroIDSplit[heroIDSplit.length - 1];
      const heroTitleID = `MPID_HONOR_${heroID}`;
      const title = localeData[heroTitleID];
      if (name && title) {
        return (
          {
            value: hero,
            label: `${name}: ${title}`,
            optionLabel: (
              <div className="d-flex align-items-center">
                <div className="me-2"><HeroIcon hero={hero} imageSize="sm" isResplendent={false} /></div>{name}: {title}
              </div>
            ),
          });
      }
      return {
        value: hero,
        label: 'ERROR',
      };
    })
    .sort((a, b) => {
      const aName = localeData[`M${a.value.id_tag}`];
      const bName = localeData[`M${b.value.id_tag}`];
      if (aName && bName) {
        return aName > bName ? 1 : -1;
      }
      return -1;
    });

  console.log(errors);

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
                    setFieldValue('build.blessing', Element.none);
                  }
                }}
                isValid={getIn(touched, 'hero.id_num') && !getIn(errors, 'hero.id_num')}
                isInvalid={!!getIn(errors, 'hero.id_num')}
                errorMessage={getIn(errors, 'hero.id_num')}
                virtual
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
                isDisabled={!values.hero.id_tag}
                isValid={getIn(touched, 'build.rarity') && !getIn(errors, 'build.rarity')}
                isInvalid={!!getIn(errors, 'build.rarity')}
                errorMessage={getIn(errors, 'build.rarity')}
                visualIndicators
              />
            </Col>
            <Col>
              <Field
                name="build.merges"
                component={SelectField}
                options={mergeOptions}
                isDisabled={!values.hero.id_tag}
                isValid={getIn(touched, 'build.merges') && !getIn(errors, 'build.merges')}
                isInvalid={!!getIn(errors, 'build.merges')}
                errorMessage={getIn(errors, 'build.merges')}
                onChangeEvent={(e: { label: string, value: number }) => {
                  const { value } = e;
                  if (value > 0 && values.build.ivs.bane !== IVS.neutral) {
                    setFieldValue('build.ivs.bane', IVS.neutral);
                  }
                }}
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
                isDisabled={!values.hero.id_tag}
                isValid={getIn(touched, 'build.ivs.boon') && !getIn(errors, 'build.ivs.boon')}
                isInvalid={!!getIn(errors, 'build.ivs.boon')}
                errorMessage={getIn(errors, 'build.ivs.boon')}
                visualIndicators
              />
            </Col>
            <Col>
              <Field
                name="build.ivs.bane"
                component={SelectField}
                options={IVOptions}
                isValid={getIn(touched, 'build.ivs.bane') && !getIn(errors, 'build.ivs.bane')}
                isInvalid={!!getIn(errors, 'build.ivs.bane')}
                errorMessage={getIn(errors, 'build.ivs.bane')}
                isDisabled={!values.hero.id_tag || values.build.merges > 0}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label style={{ width: '130px' }} column md="auto"><img style={{ height: '28px' }} src={ascendedFloret} alt="ascended asset" /></Form.Label>
            <Col>
              <Field
                name="build.ivs.floret"
                component={SelectField}
                options={IVOptions}
                isValid={getIn(touched, 'build.ivs.floret') && !getIn(errors, 'build.ivs.floret')}
                isInvalid={!!getIn(errors, 'build.ivs.floret')}
                errorMessage={getIn(errors, 'build.ivs.floret')}
                isDisabled={!values.hero.id_tag}
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
                isValid={getIn(touched, 'build.dragonflowers') && !getIn(errors, 'build.dragonflowers')}
                isInvalid={!!getIn(errors, 'build.dragonflowers')}
                errorMessage={getIn(errors, 'build.dragonflowers')}
                isDisabled={!values.hero.id_tag}
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
                  className="p-2 square-radio"
                  value="0"
                  variant="outline-primary"
                  disabled={!values.hero.id_tag}
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
                  className="p-2 square-radio"
                  value="1"
                  variant="outline-primary"
                  disabled={!values.hero.id_tag}
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
                  className="p-2 square-radio"
                  value="2"
                  variant="outline-primary"
                  disabled={!values.hero.id_tag}
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
                  className="p-2 square-radio"
                  value="3"
                  variant="outline-primary"
                  disabled={!values.hero.id_tag}
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
                  className="p-2 square-radio"
                  value={4}
                  variant="outline-primary"
                  disabled={!values.hero.id_tag}
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
                isDisabled={!values.hero.id_tag || HeroData.isLegendaryOrMythic(values.hero)}
                isValid={getIn(touched, 'build.blessing') && !getIn(errors, 'build.blessing')}
                isInvalid={!!getIn(errors, 'build.blessing')}
                errorMessage={getIn(errors, 'build.blessing')}
                visualIndicators
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
});
export default BuildOptions;
