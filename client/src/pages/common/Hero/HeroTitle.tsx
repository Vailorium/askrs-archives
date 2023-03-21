/* eslint-disable no-nested-ternary */
import React from 'react';
import { HeroDataModel } from '../../../models';
import { useGetLocaleDataQuery } from '../../../services/FEHLocaleApi';

function HeroTitle(props: { hero: HeroDataModel, locale: string }) {
  const { hero, locale } = props;

  const { data, error, isLoading } = useGetLocaleDataQuery(locale || 'USEN');

  const heroIDSplit = hero.id_tag.split('_');
  const heroID = heroIDSplit[heroIDSplit.length - 1];
  const heroTitleID = `MPID_HONOR_${heroID}`;
  return (
    error ? (
      <>Error retrieving {locale} locale</>
    ) : isLoading ? (
      <>Loading locale...</>
    ) : data ? (
      data[heroTitleID] ? <>{data[heroTitleID]}</> : <>Cannot find Hero Title for {hero.id_tag}</>
    ) : null
  );
}
export default HeroTitle;
