/* eslint-disable max-len */
import React from 'react';
import UnitBuildValuesModel from '../../../models/UnitBuild/UnitBuildValuesModel';
import CanvasHelper from '../../../services/CanvasHelper';
import StatsCalculator from '../../../services/StatsCalculator';
import BackgroundLayer from './layers/BackgroundLayer';
import ExtraIconsLayer from './layers/ExtraIconsLayer';
import ForegroundLayer from './layers/ForegroundLayer';
import NamePanelLayer from './layers/NamePanelLayer';
import SkillPanelLayer from './layers/SkillPanelLayer';
import StatsPanelLayer from './layers/StatsPanelLayer';
import UnitLayer from './layers/UnitLayer';

interface UnitBuildProps {
  unit: UnitBuildValuesModel;
  localeData: Record<string, string>;
}
class UnitBuild extends React.Component<UnitBuildProps> {
  componentDidMount() {
    if (CanvasHelper.FEHFont.status !== 'loaded') {
      CanvasHelper.loadFEHFont().then(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
    const { unit, localeData } = this.props;
    const { hero, build } = unit;
    const stats = StatsCalculator.calculateStats(unit);
    return CanvasHelper.FEHFont.status === 'loaded' && (
      <div style={{ width: '500px', height: '900px', visibility: 'visible' }}>
        <BackgroundLayer supportLevel={build.summonerSupport} />
        { hero.face_name && (
          <UnitLayer
            imageSrc={unit.resplendentCostume ? `${hero.face_name}EX01` : hero.face_name}
            key={hero.face_name + unit.resplendentCostume}
          />
        )}
        { hero.id_tag && localeData && (
        <NamePanelLayer
          idTag={hero.id_tag}
          rarity={build.rarity}
          key={`${hero.name}: ${hero.title} ${build.rarity}`} // key to refresh on props change
          localeData={localeData}
        />
        ) }
        <StatsPanelLayer
          stats={stats}
          IVS={build.ivs}
          key={JSON.stringify(stats) + JSON.stringify(build.ivs)}
        />
        {
          localeData && (
            <SkillPanelLayer
              skills={build.skills}
              key={JSON.stringify(build.skills)}
              localeData={localeData}
            />
          )
        }
        <ForegroundLayer unit={unit} key={`${unit.build.dragonflowers}-${unit.build.merges}-${unit.build.blessing}`} />
        <ExtraIconsLayer blessing={unit.build.blessing} legendary={unit.hero.legendary} IVS={unit.build.ivs} />
      </div>
    );
  }
}
export default UnitBuild;
