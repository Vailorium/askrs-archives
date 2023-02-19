/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { SupportLevel } from '../../../../enums';

interface LayerProps {
  supportLevel: number;
}

class BackgroundLayer extends React.Component<LayerProps> {
  shouldComponentUpdate(nextProps: LayerProps) {
    const { supportLevel } = this.props;
    return supportLevel === SupportLevel.none ? nextProps.supportLevel > SupportLevel.none
      : nextProps.supportLevel === SupportLevel.none;
  }

  render() {
    const { supportLevel } = this.props;
    const source = supportLevel === 0 ? 'bg_no_support.png' : 'bg_support.png';
    // eslint-disable-next-line global-require
    const imageSrc = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/${source}`;
    return (
      <>
        <div
          role="img"
          style={{
            backgroundImage: `url('${imageSrc}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            width: '500px',
            height: '900px',
            zIndex: 3,
          }}
        />
        <div
          role="img"
          style={{
            backgroundImage: `url('${process.env.REACT_APP_CDN_URL}/UI/unit-builder/fg.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            position: 'absolute',
            width: '500px',
            height: '900px',
            zIndex: 5,
          }}
        />
      </>
    );
  }
}
export default BackgroundLayer;
