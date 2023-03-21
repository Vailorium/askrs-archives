import React from 'react';
import { HeroDataModel } from '../../../models';
import HeroIcon from '../../common/Hero/HeroIcon';

function UnitIcon(props: { hero: HeroDataModel }) {
  const { hero } = props;
  return (
    <div className="m-1" style={{ maxWidth: '65px' }}>
      <HeroIcon hero={hero} size="md" isResplendent={false} />
      {/* <p style={{ color: 'grey', fontSize: '12px', textAlign: 'center' }}>
        {hero.name}
      </p> */}
    </div>
  );
}
export default UnitIcon;
