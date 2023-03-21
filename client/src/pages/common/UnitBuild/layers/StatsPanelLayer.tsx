import React, { useRef, useEffect } from 'react';
import config from '../../../../config';

import { Stats } from '../../../../models';
import CanvasHelper from '../../../../services/CanvasHelper';

interface LayerProps {
  stats: Stats;
  IVS: { boon: number, bane: number, floret: number };
}
function StatsPanelLayer(props: LayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = async () => {
    if (canvasRef.current && document.fonts.check('23px Fire_Emblem_Heroes_Font')) {
      const ctx = canvasRef.current.getContext('2d');
      const statNames = ['HP', 'Atk', 'Spd', 'Def', 'Res'];
      if (ctx) {
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 1;
        ctx.strokeStyle = config.CANVAS.COLORS.BLACK;
        ctx.lineWidth = 3.7;

        ctx.font = '16px Fire_Emblem_Heroes_Font';

        // draw stat names and values
        for (let i = 0; i < statNames.length; i += 1) {
          const statName = statNames[i];
          const { stats, IVS } = props;

          // Stat name
          ctx.textAlign = 'center';
          if ((IVS.boon === i + 1 || IVS.floret === i + 1) && IVS.bane !== i + 1) {
            ctx.fillStyle = config.CANVAS.COLORS.BLUE;
          } else if (IVS.bane === i + 1 && IVS.boon !== i + 1 && IVS.floret !== i + 1) {
            ctx.fillStyle = config.CANVAS.COLORS.RED;
          } else {
            ctx.fillStyle = config.CANVAS.COLORS.WHITE;
          }
          CanvasHelper.drawFEHText(
            ctx,
            statName,
            94,
            575 + (34 * i),
          );

          // Stat value
          ctx.textAlign = 'right';
          ctx.fillStyle = config.CANVAS.COLORS.YELLOW;

          CanvasHelper.drawFEHText(
            ctx,
            stats[statName.toLowerCase() as keyof Stats].toString(),
            185,
            575 + (34 * i),
          );
        }

        // draw SP/HM values (placeholders)
        ctx.textAlign = 'right';
        ctx.fillStyle = config.CANVAS.COLORS.YELLOW;

        // SP
        CanvasHelper.drawFEHText(ctx, '–', 185, 745);
        // HM
        CanvasHelper.drawFEHText(ctx, '–', 185, 779);
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
        zIndex: 5,
      }}
    />
  );
}
export default StatsPanelLayer;
