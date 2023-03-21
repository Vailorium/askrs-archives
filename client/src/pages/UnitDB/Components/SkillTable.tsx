import React from 'react';
import Table from 'react-bootstrap/Table';
import { HeroDataModel, SkillDataModel } from '../../../models';
import HeroData from '../../../services/HeroData';
import SkillSprite from '../../common/Skill/SkillSprite';

interface SkillTableProps {
  skillList: SkillDataModel[];
  hero: HeroDataModel;
}

function SkillTable(props: SkillTableProps) {
  const { skillList, hero } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>Skill Type</th>
          <th>Name</th>
          <th>SP Cost</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {
          skillList.length > 0
            && skillList.sort(
              (a, b) => {
                if (a.category < b.category) {
                  return -1;
                } if (a.category === b.category && a.sp_cost < b.sp_cost) {
                  return -1;
                }
                return 1;
              },
            ).map(
              (s) => {
                if (HeroData.hasSkill(hero, s.id_tag)) {
                  return (
                    <tr>
                      <td><SkillSprite skill={s} size="sm" /></td>
                      <td>{s.name}</td>
                      <td>{s.sp_cost}</td>
                      <td>TEMP</td>
                    </tr>
                  );
                }
                return undefined;
              },
            )
        }
      </tbody>
    </Table>
  );
}
export default SkillTable;
