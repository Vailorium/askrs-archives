/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-dynamic-require */
import React, { useRef, useEffect } from 'react';

import CanvasHelper from '../../../../services/CanvasHelper';
import { HeroBuildInfoModel } from '../../../../models';
import config from '../../../../config';

function ForegroundLayer(props: { unit: HeroBuildInfoModel }) {
  const { unit } = props;
  const { hero, build } = unit;

  const spritesheet = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/spritesheet.png`;
  const levelpanel = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/level_panel.png`;
  const dragonflowers = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/dragonflowers.png`;
  const blessings = `${process.env.REACT_APP_CDN_URL}/UI/unit-builder/blessings.png`;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = async () => {
    if (canvasRef.current && document.fonts.check('23px Fire_Emblem_Heroes_Font')) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 1;
        ctx.strokeStyle = '#0a1e32';
        ctx.fillStyle = config.CANVAS.COLORS.WHITE;
        ctx.lineWidth = 4;
        ctx.textAlign = 'left';

        ctx.font = '17px Fire_Emblem_Heroes_Font';

        const img = await CanvasHelper.loadImage(spritesheet);

        // skill letter icons
        ctx.drawImage(img, 0, 0, 40, 40, 270, 672, 17, 17);
        ctx.drawImage(img, 40, 0, 40, 40, 270, 672 + 34.25, 17, 17);
        ctx.drawImage(img, 0, 40, 40, 40, 270, 672 + 68.5, 17, 17);
        ctx.drawImage(img, 40, 40, 40, 40, 270, 672 + 68.5 + 34.25, 17, 17);

        const levelPanel = await CanvasHelper.loadImage(levelpanel);

        if (build.dragonflowers > 0) {
          const dragonflowersSheet = await CanvasHelper.loadImage(dragonflowers);
          ctx.drawImage(levelPanel, 0, 55, 850, 55, 0, 508, 570, 35);

          ctx.drawImage(dragonflowersSheet, 90 * hero.move_type, 0, 90, 90, 207, 505, 40, 40);
          CanvasHelper.drawFEHText(ctx, `+${build.dragonflowers.toString()}`, 247, 531);
        } else {
          ctx.drawImage(levelPanel, 0, 0, 850, 55, 0, 508, 570, 35);
        }

        if (build.merges > 0) {
          ctx.font = '16px Fire_Emblem_Heroes_Font';
          CanvasHelper.drawFEHText(ctx, '+', 107, 529);
          CanvasHelper.drawFEHText(ctx, build.merges.toString(), 119, 531);
        }

        if (build.blessing > 0) {
          const blessingSheet = await CanvasHelper.loadImage(blessings);

          ctx.drawImage(blessingSheet, 220 * (build.blessing - 1), 0, 220, 238, 390, 398, 100, 108);
        }
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: 10,
      }}
    />
  );
}
export default ForegroundLayer;
