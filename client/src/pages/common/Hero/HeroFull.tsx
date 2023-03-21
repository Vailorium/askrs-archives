/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { HeroDataModel } from '../../../models';
import config from '../../../config';

function HeroFull(props: { hero: HeroDataModel, size: 'xs' | 'sm' | 'md' | 'lg' | 'auto', isResplendent: boolean, fullType: 'default' | 'attack' | 'special' | 'damaged' }) {
  const {
    hero, size, isResplendent, fullType,
  } = props;

  let imageHero = '';
  if (hero.face_name !== null) {
    imageHero = isResplendent ? `${hero.face_name}EX01` : hero.face_name;
  } else {
    imageHero = 'ch01_00_Marth_M_Normal';
  }

  let imageType = '';
  switch (fullType) {
    case 'default':
      imageType = 'Face.webp';
      break;
    case 'attack':
      imageType = 'BtlFace.webp';
      break;
    case 'special':
      imageType = 'BtlFace_C.webp';
      break;
    case 'damaged':
      imageType = 'BtlFace_D.webp';
      break;
    default:
      imageType = 'Face.webp';
      break;
  }

  const imageSrc = `${process.env.REACT_APP_CDN_URL}/Face/${imageHero}/${imageType}`;
  if (size !== 'auto') {
    return (
      <div
        role="img"
        style={{
          color: 'white',
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: `${config.FULL_WIDTH[size]}px ${config.FULL_HEIGHT[size]}px`,
          height: `${config.FULL_HEIGHT[size]}px`,
          width: `${config.FULL_WIDTH[size]}px`,
        }}
      />
    );
  }
  return (
    <img
      src={imageSrc}
      alt={`${hero.name} ${hero.title} ${fullType} pose`}
      style={{
        width: '100%',
      }}
    />
  );
}
export default HeroFull;
