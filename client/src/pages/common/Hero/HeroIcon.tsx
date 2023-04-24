/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { HeroDataModel } from '../../../models';
import config from '../../../config';
import HeroName from './HeroName';
import HeroTitle from './HeroTitle';

interface HeroIconProps extends React.HTMLProps<HTMLImageElement> {
  hero: HeroDataModel;
  imageSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isResplendent: boolean;
}

const HeroIcon: React.FC<HeroIconProps> = (
  {
    hero, imageSize, isResplendent, ...htmlProps
  }: HeroIconProps,
) => {
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
          backgroundSize: `${config.SPRITE_HEIGHT[imageSize]}px`,
          height: `${config.SPRITE_HEIGHT[imageSize]}px`,
          width: `${config.SPRITE_WIDTH[imageSize]}px`,
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...htmlProps}
      />
    </OverlayTrigger>
  );
};
export default HeroIcon;
