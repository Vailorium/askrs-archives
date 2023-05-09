import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { MovementType } from '../../../enums';

interface DragonflowersProps extends
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  movement: MovementType;
  imageSize: number;
}

// eslint-disable-next-line arrow-body-style
const DragonflowerIcon: React.FC<DragonflowersProps> = ({ movement, imageSize, ...htmlProps }) => {
  const ratio = imageSize / 90;
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...htmlProps}
      role="img"
      className={`${htmlProps.className} dragonflower-icon`}
      style={{
        ...htmlProps.style,
        backgroundImage: `url(${process.env.REACT_APP_CDN_URL}/assets/UI/unit-builder/dragonflowers.png)`,
        height: `${imageSize}px`,
        width: `${imageSize}px`,
        backgroundSize: `${360 * ratio}px ${imageSize}px`,
        backgroundPosition: `-${imageSize * movement}px 0`,
      }}
    />
  );
};
export default DragonflowerIcon;
