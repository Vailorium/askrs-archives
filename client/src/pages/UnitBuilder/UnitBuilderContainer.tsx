/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import randomstring from 'randomstring';

import { Formik } from 'formik';

import config from '../../config';
import IHeroBuild from '../../interfaces/IHeroBuild';
import api from '../../api/api';
import { HeroDataModel, SkillDataModel } from '../../models';
import UnitBuildValuesModel from '../../models/UnitBuild/UnitBuildValuesModel';
import UnitBuilderEditor from './UnitBuilderEditor';
import unitBuilderFormSchema from '../../lib/UnitBuilderFormSchema';

interface UnitBuilderContainerProps {
  build: UnitBuildValuesModel | null;
  heroList: HeroDataModel[];
  skillList: SkillDataModel[];
  resplendentList: string[];
  sealList: string[];
  localeData: Record<string, string>;
}
const UnitBuilderContainer:
React.FC<UnitBuilderContainerProps> = (props: UnitBuilderContainerProps) => {
  const {
    build, heroList, skillList, resplendentList, sealList, localeData,
  } = props;

  const [buildName, setBuildName] = useState(build ? build.buildName : '');

  let initialValues: UnitBuildValuesModel;

  if (build) {
    initialValues = {
      id: randomstring.generate(),
      ...build,
    };
  } else {
    initialValues = {
      maxSkills: true,
      resplendentCostume: false,
      id: randomstring.generate(),
      buildName: 'Untitled',
      ...config.emptyBuild,
    };
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={unitBuilderFormSchema}
      onSubmit={(values) => {
        // Convert form data to correct format for server
        const submitBuild: IHeroBuild = {
          uid: values.uid ? values.uid : '',
          buildName,
          heroIdNum: values.hero.id_num,
          rarity: values.build.rarity,
          merges: values.build.merges,
          weapon: values.build.skills.weapon ? values.build.skills.weapon.id_num : undefined,
          refine: values.build.skills.refine ? values.build.skills.refine.id_num : undefined,
          assist: values.build.skills.assist ? values.build.skills.assist.id_num : undefined,
          special: values.build.skills.special ? values.build.skills.special.id_num : undefined,
          a: values.build.skills.a ? values.build.skills.a.id_num : undefined,
          b: values.build.skills.b ? values.build.skills.b.id_num : undefined,
          c: values.build.skills.c ? values.build.skills.c.id_num : undefined,
          s: values.build.skills.s ? values.build.skills.s.id_num : undefined,
          resplendent: values.build.resplendent,
          boon: values.build.ivs.boon,
          bane: values.build.ivs.bane,
          floret: values.build.ivs.floret,
          dragonflowers: values.build.dragonflowers,
          blessing: values.build.blessing,
          summonerSupport: values.build.summonerSupport,
          allySupportLevel: values.build.allySupport.level,
          allySupportTarget: values.build.allySupport.targetIdNum,
        };

        if (values.id && values.uid) {
          api.updateBuild(values.id, submitBuild)
            .then((res) => console.log('successfully updated build!', res))
            .catch((err) => console.error(err));
        } else {
          api.createBuild(submitBuild)
            .then((res) => console.log('creating build success!', res))
            .catch((err) => console.log(err));
        }
      }}
    >
      {({
        values,
        setFieldValue,
        handleSubmit,
        handleChange,
        setFieldError,
        errors,
        touched,
      }) => (
        <CardGroup
          as={Container}
          fluid
          className="mx-0 px-0"
          style={{
            maxWidth: '95vw',
            // minWidth: '80vw',
          }}
        >
          <UnitBuilderEditor
            errors={errors}
            touched={touched}
            values={values}
            setFieldError={setFieldError}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            heroList={heroList}
            skillList={skillList}
            resplendentList={resplendentList}
            sealList={sealList}
            localeData={localeData}
            buildName={buildName}
            setBuildName={setBuildName}
          />
        </CardGroup>
      )}
    </Formik>
  );
};
export default UnitBuilderContainer;
