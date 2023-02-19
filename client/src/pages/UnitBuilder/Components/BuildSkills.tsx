/* eslint-disable no-bitwise */
import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { Field } from 'formik';

import { SkillDataModel } from '../../../models';
import { SkillCategory } from '../../../enums';
import UnitBuildValuesModel from '../../../models/UnitBuild/UnitBuildValuesModel';
import HeroData from '../../../services/HeroData';
import SelectField from '../../common/SelectField';

function BuildSkills(props:
{ skillList: SkillDataModel[], values: UnitBuildValuesModel, sealList: string[] }) {
  const { skillList, values, sealList } = props;

  const genericWeapon = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/generic_weapon.png`;
  const genericAssist = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/generic_assist.png`;
  const genericSpecial = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/generic_special.png`;
  const a = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/a.png`;
  const b = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/b.png`;
  const c = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/c.png`;
  const s = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/s.png`;

  const options = [0, 1, 2, 3, 4, 5, 6].map((i) => skillList
    .filter((skill) => (skill.category === i
      || (i === SkillCategory.S && sealList.includes(skill.id_tag)))
    && !skill.refined // if skill isn't a refined weapon
    && !skill.enemy_only // and the skill isn't enemy only
    && (!values.maxSkills || (!skill.next_skill
      && !(skill.score === 4 && skill.prerequisites[0] !== null) && skill.score !== 2))
    // and the skill is a max skill
    && skill.id_tag !== 'SID_無し' // and the skill isn't "none"
    && skill.wep_equip & 2 ** values.hero.weapon_type // and the hero has the correct weapon
    && skill.mov_equip & 2 ** values.hero.move_type // and the hero has the correct movement
    // the skill isn't exclusive or the hero has the exclusive skill
    && (!skill.exclusive || HeroData.hasSkill(values.hero, skill.id_tag)))
    .sort((x, y) => ((x.name < y.name
      || HeroData.hasSkill(values.hero, x.id_tag))
        && !HeroData.hasSkill(values.hero, y.id_tag) ? -1 : 1))
    .map((skill) => ({ label: skill.name, value: skill })));
    // skillList
    //   .filter((skill) => skill.category === SkillCategory.Weapon
    //     && !skill.refined
    //     && (!values.maxSkills || !skill.next_skill)
    //     && skill.id_tag !== 'SID_無し'
    //     && skill.wep_equip & 2 ** values.hero.weapon_type
    //     && skill.mov_equip & 2 ** values.hero.move_type
    //     && (!skill.exclusive || HeroData.hasSkill(values.hero, skill.id_tag)))
    //   .sort((x, y) => (x.name < y.name || HeroData.hasSkill(values.hero, x.id_tag) ? -1 : 1))
    //   .map((skill) => ({ label: skill.name, value: skill })),
  return (
    <Container style={{ padding: '0px' }}>
      <Row>
        { /* Left col */ }
        <Col xl="6" className="d-flex flex-column">
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={genericWeapon} alt="weapon" /></Form.Label>
            <Col>
              <Field
                name="build.skills.weapon"
                component={SelectField}
                options={options[SkillCategory.Weapon]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={genericAssist} alt="assist" /></Form.Label>
            <Col>
              <Field
                name="build.skills.assist"
                component={SelectField}
                options={options[SkillCategory.Assist]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={genericSpecial} alt="special" /></Form.Label>
            <Col>
              <Field
                name="build.skills.special"
                component={SelectField}
                options={options[SkillCategory.Special]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={a} alt="a skill" /></Form.Label>
            <Col>
              <Field
                name="build.skills.a"
                component={SelectField}
                options={options[SkillCategory.A]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={b} alt="b skill" /></Form.Label>
            <Col>
              <Field
                name="build.skills.b"
                component={SelectField}
                options={options[SkillCategory.B]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={c} alt="c skill" /></Form.Label>
            <Col>
              <Field
                name="build.skills.c"
                component={SelectField}
                options={options[SkillCategory.C]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={s} alt="s skill" /></Form.Label>
            <Col>
              <Field
                name="build.skills.s"
                component={SelectField}
                options={options[SkillCategory.S]}
                isDisabled={!values.hero.name}
                visualIndicators
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default BuildSkills;
