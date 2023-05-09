/* eslint-disable import/no-dynamic-require */
import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { HeroDataModel } from '../../../models';

interface HeroFullProps extends
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  hero: HeroDataModel,
  imageSize: 'xs' | 'sm' | 'md' | 'lg' | 'auto',
  isResplendent: boolean,
  fullType: 'default' | 'attack' | 'special' | 'damaged';
}
const HeroFull: React.FC<HeroFullProps> = (
  {
    hero, imageSize, isResplendent, fullType, ...htmlProps
  }: HeroFullProps,
) => {
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

  const imageSrc = `${process.env.REACT_APP_CDN_URL}/assets/Face/${imageHero}/${imageType}`;
  return (
    <img
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...htmlProps}
      src={imageSrc}
      alt={`${hero.name} ${hero.title} ${fullType} pose`}
      className={`${htmlProps.className} hero-full hero-full-${imageSize}`}
    />
  );
};
export default HeroFull;
