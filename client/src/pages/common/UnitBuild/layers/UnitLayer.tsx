/* eslint-disable import/no-dynamic-require */
import React from 'react';

interface LayerProps {
  imageSrc: string;
}

class UnitLayer extends React.Component<LayerProps> {
  shouldComponentUpdate(nextProps: LayerProps) {
    const { imageSrc } = this.props;
    return nextProps.imageSrc !== imageSrc;
  }

  render() {
    const { imageSrc } = this.props;
    // eslint-disable-next-line global-require
    const image = `${process.env.REACT_APP_CDN_URL}/Face/${imageSrc}/Face.webp`;
    return (
      <div
        role="img"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: '180%',
          backgroundPosition: 'center 0px',
          height: '900px',
          width: '500px',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          zIndex: 4,
          // marginLeft: '-75px',
        }}
      />
    );
  }
}
export default UnitLayer;
