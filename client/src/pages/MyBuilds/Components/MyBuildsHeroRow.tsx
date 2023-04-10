/* eslint-disable no-nested-ternary */
import React from 'react';
import { format } from 'date-fns';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import IHeroBuild from '../../../interfaces/IHeroBuild';
import HeroIcon from '../../common/Hero/HeroIcon';
import HeroData from '../../../services/HeroData';
import { HeroDataModel, SkillDataModel } from '../../../models';
import SkillSprite from '../../common/Skill/SkillSprite';
import { store } from '../../../store';
import { addBuild } from '../../../services/UnitBuilderActiveBuildsSlice';

interface MyBuildsHeroRowProps {
  index: number;
  hero: IHeroBuild;
  skillList: SkillDataModel[];
  heroList: HeroDataModel[];
}
const MyBuildsHeroRow: React.FC<MyBuildsHeroRowProps> = (props: MyBuildsHeroRowProps) => {
  const {
    index, hero, skillList, heroList,
  } = props;
  const heroData = HeroData.getHeroByIdNum(hero.heroIdNum, heroList);
  const history = useHistory();

  const skillData = {
    weapon: HeroData.getSkillByIdNum(hero.weapon, skillList),
    refine: HeroData.getSkillByIdNum(hero.refine, skillList),
    assist: HeroData.getSkillByIdNum(hero.assist, skillList),
    special: HeroData.getSkillByIdNum(hero.special, skillList),
    a: HeroData.getSkillByIdNum(hero.a, skillList),
    b: HeroData.getSkillByIdNum(hero.b, skillList),
    c: HeroData.getSkillByIdNum(hero.c, skillList),
    s: HeroData.getSkillByIdNum(hero.s, skillList),
  };

  const openBuildInUnitBuilder = () => {
    store.dispatch(addBuild(HeroData.convertToFullBuild(hero, heroList, skillList)));
    history.push('/unit-builder');
  };

  return (
    heroData ? (
      <tr key={`build-${index}`}>
        <td>
          {index + 1}
        </td>
        <td>
          <HeroIcon hero={heroData} size="sm" isResplendent={!!hero.resplendent} />
        </td>
        <td>
          {hero.buildName ? hero.buildName : ''}
        </td>
        <td>
          {hero.merges}
        </td>
        <td>
          {hero.dragonflowers}
        </td>
        <td>
          {
            skillData.refine
              ? <SkillSprite skill={skillData.refine} size="sm" />
              : skillData.weapon
                ? <SkillSprite skill={skillData.weapon} size="sm" />
                : null
          }
          {
            skillData.assist
              ? <SkillSprite skill={skillData.assist} size="sm" />
              : null
          }
          {
            skillData.special
              ? <SkillSprite skill={skillData.special} size="sm" />
              : null
          }
          {
            skillData.a
              ? <SkillSprite skill={skillData.a} size="sm" />
              : null
          }
          {
            skillData.b
              ? <SkillSprite skill={skillData.b} size="sm" />
              : null
          }
          {
            skillData.c
              ? <SkillSprite skill={skillData.c} size="sm" />
              : null
          }
          {
            skillData.s
              ? <SkillSprite skill={skillData.s} size="sm" />
              : null
          }
        </td>
        <td>{format(new Date(hero.createdAt ? hero.createdAt : 0), 'd/M/yy p')}</td>
        <td>{format(new Date(hero.updatedAt ? hero.updatedAt : 0), 'd/M/yy p')}</td>
        <td>
          <OverlayTrigger
            overlay={<Tooltip>Edit</Tooltip>}
          >
            <Button
              className="me-3"
              size="sm"
              variant="success"
              onClick={openBuildInUnitBuilder}
            >
              <FontAwesomeIcon icon="edit" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip>Change Visibility</Tooltip>}
          >
            <Button
              className="me-3"
              size="sm"
              variant="primary"
            >
              <FontAwesomeIcon icon="eye" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip>Delete</Tooltip>}
          >
            <Button
              className="me-3"
              size="sm"
              variant="danger"
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    ) : null
  );
};
export default MyBuildsHeroRow;
