/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.scss';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home/Home';
import Footer from './common/Footer';
import Header from './common/Header';

import UnitBuilder from './UnitBuilder/UnitBuilder';
import { HeroDataModel, SkillDataModel } from '../models';
// import DataService from '../services/DataService';
import UnitDB from './UnitDB/UnitDB';
import UnitDBIndividual from './UnitDB/UnitDBIndividual';

interface AppProps {
  font: FontFace;
  heroList: HeroDataModel[];
  skillList: SkillDataModel[];
  sealList: string[];
  resplendentList: string[];
}

// eslint-disable-next-line max-len
class App extends React.Component<{}, AppProps> {
  constructor(props: {}) {
    super(props);

    this.state = {
      font: new FontFace('Fire_Emblem_Heroes_Font', `url('${process.env.REACT_APP_CDN_URL}/fonts/Fire_Emblem_Heroes_Font.woff')`),
      heroList: [],
      skillList: [],
      sealList: [],
      resplendentList: [],
    };
  }

  async componentDidMount() {
    // load FE Heroes font, then update to set correct font for canvas'
    const { font } = this.state;

    font.load().then(() => {
      document.fonts.add(font);
      this.forceUpdate();
    });

    // const {
    //   heroes, skills, seals, resplendents,
    // } = await DataService.getData();

    // this.setState({
    //   heroList: heroes,
    //   skillList: skills,
    //   sealList: seals,
    //   resplendentList: resplendents,
    // });
  }

  render() {
    const {
      heroList, skillList, sealList, resplendentList,
    } = this.state;

    return (
      <>
        <Header />
        <div className="main" style={{ background: `url(${process.env.REACT_APP_CDN_URL}/UI/background.jpg)` }}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/unit-builder">
                <UnitBuilder
                  heroList={heroList}
                  skillList={skillList}
                  sealList={sealList}
                  resplendentList={resplendentList}
                  handleHeroBuildDataChange={() => {}}
                />
              </Route>
              <Route exact path="/unit-db">
                <UnitDB heroList={heroList} />
              </Route>
              <Route
                exact
                path="/unit-db/:heroIdNum"
                // eslint-disable-next-line max-len
                render={(routeProps) => <UnitDBIndividual skillList={skillList} resplendentList={resplendentList} heroId={routeProps.match.params.heroIdNum} />}
              />
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </>
    );
  }
}
export default App;
