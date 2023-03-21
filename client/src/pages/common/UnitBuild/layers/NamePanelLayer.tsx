import React, { useRef, useEffect } from 'react';
import { Dictionary } from '../../../../models';
import CanvasHelper from '../../../../services/CanvasHelper';

interface LayerProps {
  idTag: string;
  rarity: number;
  localeData: Dictionary<string | null>;
}

function NamePanelLayer(props: LayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rarityImg = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/rarity.png`;
  const { idTag, rarity, localeData } = props;
  const draw = async () => {
    const name = localeData[`M${idTag}`];
    const heroIDSplit = idTag.split('_');
    const heroID = heroIDSplit[heroIDSplit.length - 1];
    const heroTitleID = `MPID_HONOR_${heroID}`;
    const title = localeData[heroTitleID];
    if (canvasRef.current && document.fonts.check('23px Fire_Emblem_Heroes_Font')) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 500, 960);

        ctx.lineJoin = 'miter';
        ctx.miterLimit = 1;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 3.5;
        ctx.textAlign = 'center';
        ctx.font = '23px Fire_Emblem_Heroes_Font';
        ctx.strokeText(`${title}`, 130, 414); // store these values in const
        ctx.fillText(`${title}`, 130, 414);
        ctx.strokeText(`${name}`, 150, 468);
        ctx.fillText(`${name}`, 150, 468);
        ctx.drawImage(
          // store in const variable, loaded at start of app
          await CanvasHelper.loadImage(rarityImg),
          0,
          42 * (rarity - 1), // add 1 for 5* rarity to get HoF icon
          158,
          42,
          30,
          348,
          158,
          42,
        );
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 900;
      canvas.style.width = '500px';
      canvas.style.height = '900px';

      draw();
    }
  }, [idTag]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: 5,
      }}
    />
  );
}
export default NamePanelLayer;
