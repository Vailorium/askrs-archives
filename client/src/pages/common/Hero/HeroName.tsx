/* eslint-disable no-nested-ternary */
import React from 'react';
import { HeroDataModel } from '../../../models';
import { useGetLocaleDataQuery } from '../../../services/FEHLocaleApi';

function HeroName(props: { hero: HeroDataModel, locale: string }) {
  const { hero, locale } = props;

  const { data, error, isLoading } = useGetLocaleDataQuery(locale || 'USEN');

  const heroIDSplit = hero.id_tag.split('_');
  const heroID = heroIDSplit[heroIDSplit.length - 1];
  const heroNameID = `MPID_${heroID}`;
  return (
    error ? (
      <>Error retrieving {locale} locale</>
    ) : isLoading ? (
      <>Loading locale...</>
    ) : data ? (
      data[heroNameID] ? <>{data[heroNameID]}</> : <>Cannot find Hero Name for {hero.id_tag}</>
    ) : null
  );
}
export default HeroName;
