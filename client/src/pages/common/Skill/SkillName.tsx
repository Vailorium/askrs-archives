/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { SkillDataModel } from '../../../models';
import { useGetLocaleDataQuery } from '../../../services/FEHLocaleApi';

function SkillName(props: { skill: SkillDataModel | string, locale: string }) {
  const { skill, locale } = props;

  const { data, error, isLoading } = useGetLocaleDataQuery(locale || 'USEN');

  if (typeof skill === 'object') {
    const skillIDSplit = skill.name_id.split('_');
    const skillID = skillIDSplit[skillIDSplit.length - 1];
    const skillNameID = `MSID_${skillID}`;
    return (
      error ? (
        <>Error retrieving {locale} locale</>
      ) : isLoading ? (
        <>Loading locale...</>
      ) : data ? (
        data[skillNameID] ? <>{data[skillNameID]}</> : <>Cannot find Skill Name for {skill.id_tag}</>
      ) : null
    );
  }
  const skillIDSplit = skill.split('_');
  const skillID = skillIDSplit[skillIDSplit.length - 1];
  const skillNameID = `MSID_${skillID}`;
  return (
    error ? (
      <>Error retrieving {locale} locale</>
    ) : isLoading ? (
      <>Loading locale...</>
    ) : data ? (
      data[skillNameID] ? <>{data[skillNameID]}</> : <>Cannot find Skill Name for {skill}</>
    ) : null
  );
}
export default SkillName;
