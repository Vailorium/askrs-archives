/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import UnitBuildValuesModel from '../../../models/UnitBuild/UnitBuildValuesModel';
import HeroName from '../Hero/HeroName';
import HeroTitle from '../Hero/HeroTitle';
import HeroFull from '../Hero/HeroFull';
import DragonflowerIcon from '../Icons/DragonflowerIcon';
import SkillSprite from '../Skill/SkillSprite';
import StatsCalculator from '../../../services/StatsCalculator';
import { store } from '../../../store';
import { addBuild } from '../../../services/UnitBuilderActiveBuildsSlice';
import DeleteModal from '../Actions/DeleteModal';

interface HeroBuildCardProps {
  build: UnitBuildValuesModel;
}

const HeroBuildCard: React.FC<HeroBuildCardProps> = (props: HeroBuildCardProps) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const backgrounds = [
    'S2135',
    'S0804',
    'S1003',
    'X0171',
    'S2061',
  ];

  const { build, hero, buildName } = props.build;

  const stats = StatsCalculator.calculateStats(props.build);

  const openBuildInUnitBuilder = () => {
    store.dispatch(addBuild(props.build));
    history.push('/unit-builder');
  };

  return (
    <div className="hero-build-card">
      <DeleteModal nameOfItem={buildName} onYes={() => console.log('deleted!')} show={show} handleClose={handleClose} />
      <div className="hero-build-card-header" style={{ backgroundImage: `url(${process.env.REACT_APP_CDN_URL}/assets/Field/${backgrounds[Math.floor(Math.random() * 5)]}.webp)` }}>
        <div className="hero-build-card-bg-filter" />
        <HeroFull
          hero={hero}
          imageSize="sm"
          isResplendent={build.resplendent}
          fullType="attack"
          className="hero-build-card-hero-full"
        />
      </div>
      <div className="hero-build-card-body" style={{ background: `url(${process.env.REACT_APP_CDN_URL}/assets/UI/background.jpg)`, height: '300px', borderRadius: '0 0 0.375em 0.375em' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td colSpan={2} className="text-start" style={{ width: '90%' }}><b>{buildName}</b></td>
              <td className="text-end">{build.skills.weapon && <SkillSprite skill={build.skills.weapon} size="xs" />}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-start" style={{ width: '90%' }}>
                <i><HeroName hero={hero} locale="USEN" /> | <HeroTitle hero={hero} locale="USEN" /></i>
              </td>
              <td className="text-end">{build.skills.assist && <SkillSprite skill={build.skills.assist} size="xs" />}</td>
            </tr>
          </tbody>
        </table>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '33%' }}>Rarity {build.rarity}</td>
              <td className="text-center" style={{ width: '33%' }}>HP: {stats.hp}</td>
              <td className="text-end" style={{ width: '33%' }}>{build.skills.special && <SkillSprite skill={build.skills.special} size="xs" />}</td>
            </tr>
            <tr>
              <td style={{ width: '33%' }}>Level 40</td>
              <td className="text-center" style={{ width: '33%' }}>ATK: {stats.atk}</td>
              <td className="text-end" style={{ width: '33%' }}>{build.skills.a && <SkillSprite skill={build.skills.a} size="xs" />}</td>
            </tr>
            <tr>
              <td style={{ width: '33%' }}>+ {build.merges}</td>
              <td className="text-center" style={{ width: '33%' }}>SPD: {stats.spd}</td>
              <td className="text-end" style={{ width: '33%' }}>{build.skills.b && <SkillSprite skill={build.skills.b} size="xs" />}</td>
            </tr>
            <tr>
              <td style={{ width: '33%' }}><DragonflowerIcon movement={hero.move_type} imageSize={23} style={{ display: 'inline-block' }} /> {build.dragonflowers}</td>
              <td className="text-center" style={{ width: '33%' }}>DEF: {stats.def}</td>
              <td className="text-end" style={{ width: '33%' }}>{build.skills.c && <SkillSprite skill={build.skills.c} size="xs" />}</td>
            </tr>
            <tr>
              <td style={{ width: '33%' }}>&nbsp;</td>
              <td className="text-center" style={{ width: '33%' }}>RES: {stats.res}</td>
              <td className="text-end" style={{ width: '33%' }}>{build.skills.s && <SkillSprite skill={build.skills.s} size="xs" />}</td>
            </tr>
          </tbody>
        </table>
        <table style={{ width: '100%', marginTop: 'auto' }}>
          <tbody>
            <tr>
              <td className="text-center" style={{ width: '33%' }}>
                <Button variant="primary" size="sm"><FontAwesomeIcon icon="eye" /> View</Button>
              </td>
              <td className="text-center" style={{ width: '33%' }}>
                <Button variant="success" size="sm" onClick={openBuildInUnitBuilder}><FontAwesomeIcon icon="edit" /> Edit</Button>
              </td>
              <td className="text-center" style={{ width: '33%' }}>
                <Button variant="danger" size="sm" onClick={handleOpen}><FontAwesomeIcon icon="trash" /> Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HeroBuildCard;
