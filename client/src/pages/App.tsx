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
import Header from './common/Header';

import UnitBuilder from './UnitBuilder/UnitBuilder';

function App() {
  useEffect(() => {
    const font = new FontFace('Fire_Emblem_Heroes_Font', `url('${process.env.REACT_APP_CDN_URL}/assets/fonts/Fire_Emblem_Heroes_Font.woff')`);

    font.load().then(() => {
      document.fonts.add(font);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="main" style={{ background: `url(${process.env.REACT_APP_CDN_URL}/assets/UI/background.jpg)` }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/unit-builder">
              <UnitBuilder />
            </Route>
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

export default App;
