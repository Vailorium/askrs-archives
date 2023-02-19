/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SkillDataModel } from '../../models';
import config from '../../config';

function SkillSprite(props: { skill: SkillDataModel, size: 'xs' | 'sm' | 'md' | 'lg' }) {
  const { skill, size } = props;

  const sheet = Math.floor(
    skill.icon_id / (config.SPRITESHEET_HEIGHT * config.SPRITESHEET_WIDTH),
  ) + 1;

  const iconIdOnSheet = (skill.icon_id % (config.SPRITESHEET_HEIGHT * config.SPRITESHEET_WIDTH));
  const iconX = iconIdOnSheet % config.SPRITESHEET_WIDTH;
  const iconY = Math.floor(iconIdOnSheet / config.SPRITESHEET_WIDTH);

  // eslint-disable-next-line global-require
  const imageSrc = `${process.env.REACT_APP_CDN_URL}/skills/Skill_Passive${sheet}.webp`;
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id="skill">
          {skill.name_id}
          &nbsp;(TEMP)
        </Tooltip>
      )}
    >
      <div
        role="img"
        style={{
          color: 'white',
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: `${1024 * (config.SPRITE_HEIGHT[size] / config.SPRITE_HEIGHT.lg)}px ${1024 * (config.SPRITE_HEIGHT[size] / config.SPRITE_HEIGHT.lg)}px`,
          backgroundPositionX: `${-(iconX * config.SPRITE_WIDTH[size])}px`,
          backgroundPositionY: `${-(iconY * config.SPRITE_HEIGHT[size])}px`,
          height: `${config.SPRITE_HEIGHT[size]}px`,
          width: `${config.SPRITE_WIDTH[size]}px`,
        }}
      />
    </OverlayTrigger>
  );
}
export default SkillSprite;
