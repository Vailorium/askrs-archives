/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import './App.scss';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home/Home';
import Footer from './common/Footer';
import Header from './common/Header/Header';

import UnitBuilder from './UnitBuilder/UnitBuilder';
import api from '../api/api';
import AuthService from '../services/AuthService';
import MyBuilds from './MyBuilds/MyBuilds';
import Profile from './Profile/Profile';
import NotFound from './404/NotFound';

const App: React.FC = () => {
  useEffect(() => {
    const font = new FontFace('Fire_Emblem_Heroes_Font', `url('${process.env.REACT_APP_CDN_URL}/assets/fonts/Fire_Emblem_Heroes_Font.woff')`);

    font.load().then(() => {
      document.fonts.add(font);
    });
  }, []);

  useEffect(() => {
    // ping to set up CSRF and ensure server is online
    api.ping();
  }, []);

  return (
    <BrowserRouter>
      <>
        <Header />
        <div className="main" style={{ background: `url(${process.env.REACT_APP_CDN_URL}/assets/UI/background.jpg)` }}>
          <Switch>
            <Route exact path="/my-builds">
              <MyBuilds />
            </Route>
            <Route exact path="/unit-builder">
              <UnitBuilder />
            </Route>
            <Route exact path="/404">
              <NotFound />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:id">
              <Profile />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </>
    </BrowserRouter>
  );
};
export default App;
