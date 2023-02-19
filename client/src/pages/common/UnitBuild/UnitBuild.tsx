import React from 'react';
import UnitBuildValuesModel from '../../../models/UnitBuild/UnitBuildValuesModel';
import CanvasHelper from '../../../services/CanvasHelper';
import StatsCalculator from '../../../services/StatsCalculator';
import BackgroundLayer from './layers/BackgroundLayer';
import ForegroundLayer from './layers/ForegroundLayer';
import NamePanelLayer from './layers/NamePanelLayer';
import SkillPanelLayer from './layers/SkillPanelLayer';
import StatsPanelLayer from './layers/StatsPanelLayer';
import UnitLayer from './layers/UnitLayer';

class UnitBuild extends React.Component<{ unit: UnitBuildValuesModel }> {
  componentDidMount() {
    if (CanvasHelper.FEHFont.status !== 'loaded') {
      CanvasHelper.loadFEHFont().then(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
    const { unit } = this.props;
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
        { hero.name && (
        <NamePanelLayer
          name={hero.name}
          title={hero.title}
          rarity={build.rarity}
          key={`${hero.name}: ${hero.title} ${build.rarity}`} // key to refresh on props change
        />
        ) }
        <StatsPanelLayer
          stats={stats}
          IVS={build.ivs}
          key={JSON.stringify(stats) + JSON.stringify(build.ivs)}
        />
        <SkillPanelLayer
          skills={build.skills}
          key={JSON.stringify(build.skills)}
        />
        <ForegroundLayer unit={unit} key={`${unit.build.dragonflowers}-${unit.build.merges}-${unit.build.blessing}`} />
      </div>
    );
  }
}
export default UnitBuild;
