/* eslint-disable no-bitwise */
import React, { useEffect, useState, memo } from 'react';

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
import SkillSprite from '../../common/Skill/SkillSprite';

interface BuildSkillsProps {
  skillList: SkillDataModel[];
  values: UnitBuildValuesModel;
  sealList: string[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  localeData: Record<string, string>;
}

const genericWeapon = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/generic_weapon.png`;
const genericRefine = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/refine.png`;
const genericAssist = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/generic_assist.png`;
const genericSpecial = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/generic_special.png`;
const a = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/a.png`;
const b = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/b.png`;
const c = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/c.png`;
const s = `${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/s.png`;

const BuildSkills = memo((props: BuildSkillsProps) => {
  const {
    skillList, values, sealList, localeData, setFieldValue,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxSkills, setMaxSkills] = useState(true);

  useEffect(() => {
    if (
      values.build.skills.weapon && !HeroData.canUseSkill(values.hero, values.build.skills.weapon)
    ) {
      setFieldValue('build.skills.weapon', undefined);
    }
    if (
      values.build.skills.assist && !HeroData.canUseSkill(values.hero, values.build.skills.assist)
    ) {
      setFieldValue('build.skills.assist', undefined);
    }
    if (
      values.build.skills.special && !HeroData.canUseSkill(values.hero, values.build.skills.special)
    ) {
      setFieldValue('build.skills.special', undefined);
    }
    if (
      values.build.skills.a && !HeroData.canUseSkill(values.hero, values.build.skills.a)
    ) {
      setFieldValue('build.skills.a', undefined);
    }
    if (
      values.build.skills.b && !HeroData.canUseSkill(values.hero, values.build.skills.b)
    ) {
      setFieldValue('build.skills.b', undefined);
    }
    if (
      values.build.skills.c && !HeroData.canUseSkill(values.hero, values.build.skills.c)
    ) {
      setFieldValue('build.skills.c', undefined);
    }
    if (
      values.build.skills.s && !HeroData.canUseSkill(values.hero, values.build.skills.s)
    ) {
      setFieldValue('build.skills.s', undefined);
    }
  }, [values.hero]);

  const options = [0, 1, 2, 3, 4, 5, 6].map((i) => skillList
    .filter((skill) => (skill.category === i
      || (i === SkillCategory.S && sealList.includes(skill.id_tag)))
    && !skill.refined // if skill isn't a refined weapon
    && !skill.enemy_only // and the skill isn't enemy only
    && (!maxSkills || (!values.maxSkills || (!skill.next_skill
      && !(skill.score === 4 && skill.prerequisites[0] !== null) && skill.score !== 2)))
    // and the skill is a max skill
    && skill.id_tag !== 'SID_無し' // and the skill isn't "none"
    && skill.wep_equip & 2 ** values.hero.weapon_type // and the hero has the correct weapon
    && skill.mov_equip & 2 ** values.hero.move_type // and the hero has the correct movement
    // the skill isn't exclusive or the hero has the exclusive skill
    && (!skill.exclusive || HeroData.hasSkill(values.hero, skill.id_tag)))
    .sort((x, y) => {
      const xName = localeData[`M${x.id_tag}`];
      const yName = localeData[`M${y.id_tag}`];
      if (xName && yName) {
        return xName > yName ? 1 : -1;
      }
      return -1;
    })
    .map((skill) => {
      const skillName = localeData[`M${skill.id_tag}`];
      if (skillName) {
        return (
          {
            value: skill,
            label: skillName,
            optionLabel: (
              <div className="d-flex align-items-center">
                <div className="me-2"><SkillSprite skill={skill} size="sm" /></div>{skillName}
              </div>
            ),
          }
        );
      }
      console.error(`Error finding skill name for ${skill.id_tag}`);
      return ({ label: 'ERROR', value: skill });
    }));

  const refineOptions = values.build.skills.weapon
    ? skillList.filter(
      (skill) => skill.refine_base === values.build.skills.weapon!.id_tag,
    )
      .map((skill) => {
        const skillName = localeData[skill.name_id];
        if (skillName) {
          return (
            {
              value: skill,
              label: skillName,
              optionLabel: (
                <div className="d-flex align-items-center">
                  <div className="me-2"><SkillSprite skill={skill} size="sm" /></div>{skillName}
                </div>
              ),
            }
          );
        }
        console.error(`Error finding skill name for ${skill.name_id}`);
        return ({ label: 'ERROR', value: skill });
      })
    : [];

  return (
    <Container style={{ padding: '0px' }}>
      <Row>
        { /* Left col */ }
        <Col xl="6" className="d-flex flex-column">
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto" style={{ width: '52px' }} />
            <Col>
              <Form.Check
                type="checkbox"
                id="maxSkills"
                label="Max Skills Only"
                defaultChecked={maxSkills}
                onChange={(e) => setMaxSkills(e.target.checked)}
              />
            </Col>
          </Row>
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={genericWeapon} alt="weapon" /></Form.Label>
            <Col>
              <Field
                name="build.skills.weapon"
                component={SelectField}
                options={options[SkillCategory.Weapon]}
                isDisabled={!values.hero.id_tag}
                virtual
                visualIndicators
              />
            </Col>
          </Row>
          {
            refineOptions.length > 0 ? (
              <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
                <Form.Label column md="auto"><img style={{ height: '28px' }} src={genericRefine} alt="refine" /></Form.Label>
                <Col>
                  <Field
                    name="build.skills.refine"
                    component={SelectField}
                    options={refineOptions}
                    isDisabled={!values.hero.id_tag}
                    virtual
                    visualIndicators
                  />
                </Col>
              </Row>
            ) : null
          }
          <Row sm="12" className="mb-3 d-flex align-items-center flex-grow-1">
            <Form.Label column md="auto"><img style={{ height: '28px' }} src={genericAssist} alt="assist" /></Form.Label>
            <Col>
              <Field
                name="build.skills.assist"
                component={SelectField}
                options={options[SkillCategory.Assist]}
                isDisabled={!values.hero.id_tag}
                virtual
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
                isDisabled={!values.hero.id_tag}
                virtual
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
                isDisabled={!values.hero.id_tag}
                virtual
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
                isDisabled={!values.hero.id_tag}
                virtual
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
                isDisabled={!values.hero.id_tag}
                virtual
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
                isDisabled={!values.hero.id_tag}
                virtual
                visualIndicators
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
});
export default BuildSkills;
