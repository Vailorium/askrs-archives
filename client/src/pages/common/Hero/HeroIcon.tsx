/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { HeroDataModel } from '../../../models';
import config from '../../../config';
import HeroName from './HeroName';
import HeroTitle from './HeroTitle';

function HeroIcon(props: { hero: HeroDataModel, size: 'xs' | 'sm' | 'md' | 'lg', isResplendent: boolean }) {
  const { hero, size, isResplendent } = props;

  let imageHero = '';
  if (hero.face_name !== null) {
    imageHero = isResplendent ? `${hero.face_name}EX01` : hero.face_name;
  } else {
    imageHero = 'ch01_00_Marth_M_Normal';
  }

  // eslint-disable-next-line global-require
  const imageSrc = `${process.env.REACT_APP_CDN_URL}/assets/Face/${imageHero}/Face_FC.webp`;
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id="skill">
          <HeroName hero={hero} locale="USEN" />
          :&nbsp;
          <HeroTitle hero={hero} locale="USEN" />
        </Tooltip>
      )}
    >
      <div
        role="img"
        style={{
          color: 'white',
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: `${config.SPRITE_HEIGHT[size]}px`,
          height: `${config.SPRITE_HEIGHT[size]}px`,
          width: `${config.SPRITE_WIDTH[size]}px`,
        }}
      />
    </OverlayTrigger>
  );
}
export default HeroIcon;
