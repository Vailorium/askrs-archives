/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-dynamic-require */
import React, { useRef, useEffect } from 'react';
import config from '../../../../config';

import { Dictionary, SkillDataModel } from '../../../../models';
import CanvasHelper from '../../../../services/CanvasHelper';

interface LayerProps {
  skills: {
    weapon?: SkillDataModel,
    refine?: SkillDataModel,
    assist?: SkillDataModel,
    special?: SkillDataModel,
    a?: SkillDataModel,
    b?: SkillDataModel,
    c?: SkillDataModel,
    s?: SkillDataModel,
  }
  localeData: Dictionary<string | null>;
}
function SkillPanelLayer(props: LayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const
  const draw = async () => {
    if (canvasRef.current && document.fonts.check('23px Fire_Emblem_Heroes_Font')) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const { skills, localeData } = props;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 1;
        ctx.strokeStyle = config.CANVAS.COLORS.BLACK;
        ctx.fillStyle = config.CANVAS.COLORS.WHITE;
        ctx.lineWidth = 3.7;
        ctx.textAlign = 'left';

        ctx.font = '14px Fire_Emblem_Heroes_Font';

        const skillKeys = ['weapon', 'assist', 'special', 'a', 'b', 'c', 's'];
        for (let i = 0; i < skillKeys.length; i += 1) {
          let key = skillKeys[i];
          if (i === 0 && skills.refine) {
            key = 'refine';
          }
          const skill: SkillDataModel | undefined = skills[key as keyof LayerProps['skills']];

          if (skill !== undefined) {
            const skillName = localeData[skill.name_id];
            if (key === 'refine') {
              ctx.fillStyle = config.CANVAS.COLORS.GREEN;
            } else {
              ctx.fillStyle = config.CANVAS.COLORS.WHITE;
            }
            CanvasHelper.drawFEHText(ctx, skillName as string, 290, 573 + (34.25 * i));

            const sheet = Math.floor(
              skill.icon_id / (config.SPRITESHEET_HEIGHT * config.SPRITESHEET_WIDTH),
            ) + 1;

            const iconIdOnSheet = (skill.icon_id
              % (config.SPRITESHEET_HEIGHT * config.SPRITESHEET_WIDTH));
            const iconX = iconIdOnSheet % config.SPRITESHEET_WIDTH;
            const iconY = Math.floor(iconIdOnSheet / config.SPRITESHEET_WIDTH);

            // eslint-disable-next-line global-require
            const image = `${process.env.REACT_APP_CDN_URL}/assets/skills/Skill_Passive${sheet}.webp`;
            const img: HTMLImageElement = await CanvasHelper.loadImage(image);
            ctx.drawImage(
              img,
              iconX * 76,
              iconY * 76,
              76,
              76,
              252,
              550 + (34.25 * i),
              35,
              35,
            );
          }
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
        zIndex: 5,
      }}
    />
  );
}
export default SkillPanelLayer;
